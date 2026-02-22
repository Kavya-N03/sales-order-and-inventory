from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.db import transaction
from rest_framework.decorators import action
from rest_framework import viewsets,mixins
from .models import Product,Inventory,Dealer,Order
from .serializers import (
    ProductSerializer,
    InventorySerializer,
    DealerSerializer,
    OrderSerializer,
    )

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class InventoryViewSet(mixins.ListModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    lookup_field = "product"
    lookup_url_kwarg = "product_id"
    
class DealerViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    queryset = Dealer.objects.all()
    serializer_class = DealerSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related("items")
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'dealer']

    def validate_status_transition(self, old, new):
        allowed = {
            'DRAFT': ['CONFIRMED'],
            'CONFIRMED': ['DELIVERED'],
            'DELIVERED': []
        }
        if new != old and new not in allowed[old]:
            raise ValidationError(f"Invalid status change: {old} → {new}")

    def update(self, request, *args, **kwargs):
        order = self.get_object()

        if order.status != 'DRAFT':
            raise ValidationError("Only DRAFT orders can be updated.")

        if "status" in request.data:
            self.validate_status_transition(order.status, request.data["status"])

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return Response(
            {"detail": "Deleting orders is not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    # CONFIRM ORDER
    @action(detail=True, methods=["post"])
    @transaction.atomic
    def confirm(self, request, pk=None):
        order = self.get_object()

        # Validate transition
        self.validate_status_transition(order.status, "CONFIRMED")

        # Validate stock
        insufficient = []
        for item in order.items.all():
            inv = item.product.inventory
            if item.quantity > inv.quantity:
                insufficient.append({
                    "product": item.product.name,
                    "available": inv.quantity,
                    "requested": item.quantity
                })

        if insufficient:
            return Response(
                {"error": "Insufficient stock", "details": insufficient},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Deduct stock
        for item in order.items.all():
            inv = item.product.inventory
            inv.quantity -= item.quantity
            inv.save()

        # Update to CONFIRMED
        order.status = "CONFIRMED"
        order.save(update_fields=['status'])

        return Response({"message": "Order confirmed successfully."})

    # DELIVER ORDER
    @action(detail=True, methods=["post"])
    def deliver(self, request, pk=None):
        order = self.get_object()

        # Validate transition
        self.validate_status_transition(order.status, "DELIVERED")

        order.status = "DELIVERED"
        order.save(update_fields=["status"])

        return Response({"message": "Order delivered successfully."})
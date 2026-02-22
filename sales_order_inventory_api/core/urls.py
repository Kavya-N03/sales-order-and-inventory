from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (ProductViewSet,
                    InventoryViewSet,
                    DealerViewSet,
                    OrderViewSet)

router = DefaultRouter()

router.register('products',ProductViewSet,basename="products")
router.register('inventory',InventoryViewSet,basename="inventory")
router.register('dealers',DealerViewSet,basename="dealers")
router.register('orders',OrderViewSet,basename="orders")

urlpatterns=[
    path('',include(router.urls)),
]
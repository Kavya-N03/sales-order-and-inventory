from rest_framework import serializers
from .models import Product,Inventory,Dealer,Order,OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","name","sku","description","price","created_at"]

class InventorySerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product.id",read_only=True)
    product_name = serializers.CharField(source="product.name",read_only=True)
    class Meta:
        model = Inventory
        fields = ["id","product_id","product_name","quantity", "updated_by", "adjustment_note"]
    
    
class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product","product_name",
                  "quantity", "unit_price", "line_total"]
        read_only_fields = ["product_id", "product_name", "unit_price", "line_total"]
        
    
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    dealer_name=serializers.CharField(source="dealer.name",read_only=True)

    class Meta:
        model = Order
        fields = ["id", "order_number", "dealer","dealer_name", "status", "total_amount", "items"]
        read_only_fields = ["order_number", "total_amount", "status"]
        

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)

        for item in items_data:
            OrderItem.objects.create(order=order, **item)

        order.update_total_amount()
        return order

    def update(self, instance, validated_data):
        if instance.status != "DRAFT":
            raise serializers.ValidationError("Only Draft orders can be updated.")

        items_data = validated_data.pop("items")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        instance.items.all().delete()

        for item in items_data:
            OrderItem.objects.create(order=instance, **item)

        instance.update_total_amount()
        return instance

class DealerSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True,read_only=True)
    class Meta:
        model = Dealer
        fields = ["id","dealer_code","name","email","phone_number","address","orders"]
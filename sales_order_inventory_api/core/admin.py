from django.contrib import admin
from .models import Product,Inventory,Dealer

# Register your models here.
admin.site.register(Product)
admin.site.register(Inventory)
admin.site.register(Dealer)
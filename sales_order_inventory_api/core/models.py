from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=50,unique=True)
    description = models.TextField(blank=True,null=True) 
    price = models.DecimalField(max_digits=10,decimal_places=2,validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.name} ({self.sku})"


class Inventory(models.Model):
    product = models.OneToOneField(Product,on_delete=models.CASCADE,related_name="inventory")
    quantity = models.PositiveIntegerField(default=0)
    updated_by = models.CharField(max_length=100,null=True,blank=True)
    adjustment_note = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Inventory"
        
    def __str__(self):
        return f"{self.product.name} - Stock: {self.quantity}"

class Dealer(models.Model):
    dealer_code = models.CharField(max_length=20,unique=True,help_text="Unique identifier for the dealer (e.g., DLR-001)")
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering=['name']
        indexes = [
            models.Index(fields=['dealer_code']),
            models.Index(fields=['email'])
        ]
    
    def __str__(self):
        return f"{self.name} ({self.dealer_code})"


class Order(models.Model):
    STATUS_CHOICES = [
        ('DRAFT','Draft'),
        ('CONFIRMED','Confirmed'),
        ('DELIVERED','Delivered'),
    ]
    order_number = models.CharField(max_length=30,unique=True,editable=False)
    dealer = models.ForeignKey(Dealer,on_delete=models.PROTECT,related_name="orders")
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='DRAFT')
    total_amount = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self,*args,**kwargs):
        if not self.order_number:
            today = timezone.now().strftime("%Y%m%d")
            last_order = Order.objects.filter(
                order_number__startswith=f"ORD-{today}"
            ).count()+1
            self.order_number = f"ORD-{today}-{last_order:04d}"
        super().save(*args,**kwargs)  
    
    def delete(self,*args,**kwargs):
        if self.status!='DRAFT':
            raise ValueError("Only draft orders can be deleted.")
        super().delete(*args,**kwargs)
    
    def update_total_amount(self):
        total = sum(item.line_total for item in self.items.all())
        self.total_amount = total
        super().save(update_fields=['total_amount'])
        
    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items")
    product = models.ForeignKey(Product,on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(max_digits=12,decimal_places=2)
    line_total = models.DecimalField(max_digits=12,decimal_places=2,default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   
    
    class Meta:
        ordering = ['id']
    
    def save(self,*args,**kwargs):
        if not self.unit_price:
            self.unit_price = self.product.price
        self.line_total = self.quantity * self.unit_price
        super().save(*args,**kwargs)
        
        self.order.update_total_amount()
        
    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.order.update_total_amount()
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
    


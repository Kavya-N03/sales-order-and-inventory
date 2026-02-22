## **Sales Order & Inventory Management System (Backend API)**

A backend system built using Django REST Framework for managing products, dealers, inventory, and sales orders.
It includes full order workflow handling, stock validation, automatic price calculations, and structured REST APIs.

**Features**
**Product & Dealer Management**
-Create and manage products with unique SKU
-Store product descriptions, pricing, and metadata
-Manage dealers and view their order history

**Inventory Management**
-One-to-one inventory model linked to each product
-Tracks available stock
-Manual admin stock adjustments
-Stock auto-deducted during order confirmation

**Order Workflow**
-Create Draft orders with multiple line items
-Confirm orders → validates stock + deducts inventory
-Deliver orders → final state
-Enforce transitions: Draft → Confirmed → Delivered
-Prevent editing of Confirmed/Delivered orders

**Automatic Calculations**
-unit_price captured from product at order creation
-line_total = quantity × unit_price
-total_amount = sum of all line totals
-Unique order number format: ORD-YYYYMMDD-XXXX

**Validation Rules**
-Reject confirmation if any product has insufficient stock
-Detailed validation response
-Restrict deletion/modification based on status


## Tech Stack Used

**Backend Framework:** Django 5.2, Django REST Framework  
**Language:** Python 3.11
**Database:**  PostgreSQL  
**Tools:** Git, GitHub, Postman for API testing  

## Setup Instructions (Step-by-Step)

```bash
# Clone the repository
git clone https://github.com/Kavya-N03/sales-order-and-inventory.git
cd your-repo

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate         # Windows
#source venv/bin/activate     # macOS/Linux

# Install required packages
pip install django
pip install djangorestframework
pip install django-filter

# OR install everything at once (recommended)
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the development server
python manage.py runserver


## API Endpoints

Below is the full list of available endpoints in this project.

---

# Products

**GET** `/api/products/` — List all products  
**POST** `/api/products/` — Create a product  
**GET** `/api/products/{id}/` — Retrieve product details  
**PUT** `/api/products/{id}/` — Update a product  
**DELETE** `/api/products/{id}/` — Delete a product  

---

# Dealers

**GET** `/api/dealers/` — List all dealers  
**POST** `/api/dealers/` — Create a dealer  
**GET** `/api/dealers/{id}/` — Retrieve dealer with order history  
**PUT** `/api/dealers/{id}/` — Update a dealer  

---

# Inventory

**GET** `/api/inventory/` — List inventory levels  
**PUT** `/api/inventory/{product_id}/` — Update inventory for a product  

---

# Orders

**GET** `/api/orders/` — List all orders  
Supports filters:  
- `/api/orders/?status=DRAFT`  
- `/api/orders/?status=CONFIRMED`  
- `/api/orders/?status=DELIVERED`  
- `/api/orders/?dealer={dealer_id}`  

**POST** `/api/orders/` — Create a draft order  
**GET** `/api/orders/{id}/` — Retrieve an order with items  
**PUT** `/api/orders/{id}/` — Update a draft order  
**POST** `/api/orders/{id}/confirm/` — Confirm an order (validates stock + deducts stock)  
**POST** `/api/orders/{id}/deliver/` — Mark an order as delivered  


## Assumptions
- Inventory management is intended to be an admin-only operation. Although explicit permission classes were not added in this implementation, the design assumes that only admin users should access or modify inventory data. Dealers or regular users should not be able to view or update stock levels, as manual inventory corrections are meant to be handled exclusively by administrators according to the project requirements.



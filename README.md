# 🛍️ Online Store – Final Project (ITI Summer Angular Training)

This project is the **Final Project** for the **Summer Angular Training by ITI**, showcasing the full implementation of a responsive and modular **Online Store Web Application** using Angular and TypeScript.

---

## 📦 Project Overview

An e-commerce web application where users can:
- Browse products by category
- Search for products or categories
- View product details
- Add products to a cart
- Control quantity and calculate total price
- Perform CRUD operations (add/edit/delete/search) on products with validations

The app is built with **component-based architecture**, uses **Bootstrap** for styling, and connects to a mock RESTful API via `json-server`.

---

## 📁 Application Structure

### 🔧 Components

| Component         | Responsibility                                                                 |
|------------------|---------------------------------------------------------------------------------|
| `Navbar`         | Navigation bar with links and search functionality                              |
| `Home`           | Hero section with carousel (intro/landing)                                      |
| `ProductList`    | Displays products with **search by category**        |
| `ProductDetails` | Shows detailed info about a selected product                                    |
| `Cart`           | View selected products, modify quantity, delete items, calculate total price    |
| `AdminPanel`     | Table view for all products with CRUD operations + redirect to add form         |
| `AddProduct`     | Form to add/edit product with validation (used by AdminPanel)                   |
| `Footer`         | Simple page footer with basic info and links                                    |

---

## 🧰 Tech Stack

- **Angular** (v17+)
- **TypeScript**
- **Bootstrap 5**
- **RxJS**
- **JSON Server** (mock backend)

---

## 💻 Getting Started

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/online-store-angular.git
cd online-store-angular

# Install dependencies
npm install


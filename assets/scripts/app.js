class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class shoppingCart {
  items = [];

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    cartEl.className = 'cart';
    return cartEl; // we return it so that wherever we create that shoppingCart, we can append it to the DOM
  }
}
// Now where is that place where I want to use the ShoppingCart though?
// Well that should probably be a new class which kind of combines ProductList and ShoppingCart
// because the cart item, the cart HTML content is certainly not part of the ProductList,
// so rendering it here (in render() in ProductList class) would be incorrect,
// but that is the thing which we rendered to the screen initially.
// So we probably add a new class which you could name Shop or whatever you want to call it

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'A pillow',
      'https://img.freepik.com/psd-gratuit/oreiller-blanc-doux_176382-890.jpg?size=626&ext=jpg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList; // we return it to be able to append it in the DOM, as we did in the other classes
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    const cart = new shoppingCart();
    const cartEl = cart.render();

    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
} // This class combines ProductList and ShoppingCart
// because the cart (ShoppingCart) item, the cart (ShoppingCart) HTML content is certainly not part of the product list (ProductList)
// so rendering it here (in ProductList) would be incorrect

const shop = new Shop();
shop.render();

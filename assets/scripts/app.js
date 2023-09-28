/*

Thus far every class works kind of standalone.
Yes, we returned the created element (prodEl) and use that in other classes.
But for example, that event listener on the addCartButton, it triggers this method addToCart() and there, nothing happens.
Well now we have to make sure that when this method is executed, we actually do something which leads to our ShoppingCart class,
to update our cart class we'll need to re-render.

*/

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

  addProduct(product) {
    this.items.push(product);
    this.render();
    // Thereafter, we could call render() again to re-render this (cartEl in render()) but that for example wouldn't work
    // because it returns a new cart element (return cartEl;), not something we want here,
    // we want to update the existing content instead.
    this.totalOutput = `<h2>Total: \$${1}</h2>`; // sets this to the old total plus the new total based on the items we have above
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2'); // adds a new property to the object which is created based on this class
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product);
    shoppingCart.addProduct(); // right now, it's not working, but there is a way we can actually make a syntax like this here work
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
    return prodList;
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
}

const shop = new Shop();
shop.render();

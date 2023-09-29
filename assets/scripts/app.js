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
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`; // it has to be "innerHTML"
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
    // "this.product" refers to the product stored in this ProductItem
    // So here I am utilizing static methods and the fact that we're not working on objects based on classes, but on the class itself
    // to share some data, share the cart (ShoppingCart) instance for example.
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

    this.cart = new shoppingCart(); // now this is a property of Shop
    const cartEl = this.cart.render(); // with "this.cart" (above) of course that means that here where I refer to cart,
    // I also have to use "this.cart"

    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  // it's optional, but a good practice to add a static field so that we make it clear that we have this static cart property.

  static init() {
    const shop = new Shop();
    shop.render();
    // this.
    // just be aware that if you would use "this" in here,
    // you would always refer to the class itself not to an object instance based on the class
    this.cart = shop.cart; // So here we can also add a cart property by referring to that cart property on Shop, like that.
    // we have to swap that and first render and then we got access to the cart.
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
} // So we kind of use this App class and the static method (addProductToCart) as a proxy

App.init();
// you can just call "App" referring to the class itself like this, "".init" like this
// this will execute this init() method directly on the class itself.
// Now again, we therefore have no App object we work with,
// instead we directly operate on that class

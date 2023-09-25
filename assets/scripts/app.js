class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  // => now we basically overwrite everything we set up here in the constructor and therefore you can actually remove that.
  // This definition here is not required to be able to assign values in the constructor function.
  // It will become important later again where we also work with fields which we don't initialize in the constructor.

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // all these things in the constructor function are PROPERTIES
}

console.log(new Product());

const productList = {
  products: [
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
  ],
  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (prod of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}" >
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
};

productList.render();

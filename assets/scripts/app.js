class Product {
  title = 'DEFAULT';
  imagUrl; // undefined initially
  description;
  price;
} // defines what's inside of that class
// and what's inside of that class is basically your blueprint of how an object created based on that class should look like
// inside a property is called a "field"
// then you can assign to it a default value
// => Classes do not replace objects as you will see, instead we build objects based on classes
// Once we create an object, based on such a class, every field will be translated to a property in that object

// Now the question is, how do you now create an object based on such a class?

console.log(new Product());

const productList = {
  products: [
    // new Product() // So now this gives us a new product object, this returns a new object which has this structure above
    {
      title: 'A pillow',
      imagUrl:
        'https://img.freepik.com/psd-gratuit/oreiller-blanc-doux_176382-890.jpg?size=626&ext=jpg',
      price: 19.99,
      description: 'A soft pillow!'
    },
    {
      title: 'A Carpet',
      imagUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      price: 89.99,
      description: 'A carpet which you might like - or not.'
    }
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
          <img src="${prod.imagUrl}" alt="${prod.title}" >
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

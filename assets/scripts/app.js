const productList = {
  products: [
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
    // "this" here if we call render() correctly should refer to this productList object,
    // and therefore "this.product" refers to this array "products"
    for (prod of this.products) {
      // "this" here if we call render() correctly should refer to this productList object,
      // and therefore this "products" refers to this array,
      // so I'm going through all the elements in there
      const prodEl = document.createElement('li'); // and then for every product there, we also need to create a new element which we can append to the DOM
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
      `; // Now this product element should of course also output some content about the product
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  } // method shortand notation
}; // Now with all of that, we got all the logic stored in the productList object

productList.render();

/*

It's hard to write proper object oriented code because with that OBJECT LITERAL NOTATION, 
which is great if we just need to create an object on the fly or just want to group some data together,
but with that notation, it's hard to write reusable object code.

1. Example 1

For example these objects here (inside of the "products" array), they always have the same structure.
Now whenever we add a new object here, we have to add it manually with an object literal notation
and we have to make sure that we don't mistype or forget a property.

=> It would be nicer if we had some way of getting some blueprint for this object,
which we can just call, some function we can call,
which gives us such an object or anything like that,
which in the end just makes sure that we have to pass in a certain amount of arguments
and then we always get such an object generated

2. Example 2

And the same here.
This logic for rendering a single product element (prodEl), it's now part of the product list.

=> It would be nice if we could have a standalone object,
which we could create multiple times, once for every product we have here in our "products" array,
which holds all that logic so that we don't have to put that logic in here
but have that logic stored somewhere else in our code
and then here we just execute it.

Of course that can all be achieved by splitting our code into functions,
but it might be easier to reason about it if you split it into objects,
  - where you have a product component object let's say which is responsible for rendering that part (prodEl);
  - a productList component which is responsible for rendering the overall list (prodList);
  - and later also a cart component;
  - maybe a header component which renders some header.
And besides these components which should be normal objects that just know how to render something,
  - we also have non-component objects which are just regular objects that hold some data 

=> And that's something which we can build with CLASSES

*/

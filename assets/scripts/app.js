/*

So when I call "new Product()"", I want to create a product with different values than the default values here.
It would be nice if we could call "new Product()"" and just pass information to that product function,
because we call it like a function,
wouldn't it be nice if you could pass some arguments like a title, a price and so on here?

=> Well, it turns out you can do that and for that, you go back to your class and you add a METHOD to that class.

Now, we don't need a custom method,
but now we need a special method, a method which Javascript automatically calls when we create a new instance of this class,
and we create a new instance when we call "new Product()"" and then execute this class like a function,
and this special method which Javascript executes for us is called the CONSTRUCTOR METHOD or the constructor function.

*/

class Product {
  title = 'DEFAULT';
  imageUrl;
  description;
  price;

  // someName() {} // a custom method is built like the method shorthand syntax

  constructor(title, image, desc, price) {
    this.title = title;
    // So "this.title" here refers to the property "title" which is added to product,
    // "title" here refers to the "title" argument.
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
// Now that will create a bunch of properties on the object which is created with this call below (new Product()),
// and initialize the values of these properties with the values you passed to the constructor.

/*

The idea behind a constructor is that it can accept arguments like any normal method and there for example,
we could accept a title, an image or imageUrl or however you want to name it, a description and a price.
So we can accept any arguments, any parameters you want just like that,
and in the curly braces and that's the interesting thing now, you can assign the values you're getting here for these parameters
so you can assign the arguments you're getting, to your class fields,
so to the properties of the object when it is instantiated then
and you do this with the good old THIS keyword.
=> "this" in here refers to your class (Product),
or to be precise, since this class will be used to create an object, to the object that is created:
So we can then for example say "this.title" and set it equal to the "title" argument.
=> So "this.title" here refers to the property "title" which is added to product,
so to the same property this field (title = 'DEFAULT';) would add,
=> "title" here refers to the "title" argument.

*/

console.log(new Product());

const productList = {
  products: [
    new Product(
      'A pillow',
      'https://img.freepik.com/psd-gratuit/oreiller-blanc-doux_176382-890.jpg?size=626&ext=jpg',
      'A soft pillow!',
      19.99
    ), // now, we can pass in the values to it
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

/*

So now we're using this class as a blueprint,
and the huge advantage here is that we now have an easy, reusable way of creating objects,
which are guaranteed to always look the same,
it's impossible for us to omit properties or to mistype properties because it's all defined in here in this class definition.

*/

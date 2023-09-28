/*

So we got our first class added,
now our code however still is such that all the logic lives in the productList,
time to change that too.

Let's add another class,
because we can not just create classes which predefine objects which are basically data containers,
we can also create classes for objects which hold more logic,
so that in the end our entire application logic is split up across multiple classes
which we then just connect in some clever way.

=> So therefore, we could create a class here which we just name "ProductList"

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

// ProductItem should be a class that is responsible for rendering a single product item.
// For that, we can add a constructor and we could accept a couple of properties that make up a product,
// to be precise title, imageUrl and so on,
// basically what we already have in the Product class,
// and therefore we can also accept the overall "product" object which we get
// => So then here in the constructor we could say "this.product is equal to "product",
// and I just expect to get a product which has this structure here in the Product class in ProductItem.
// I do split this into a product (Product class) in a ProductItem object here,
// because this product up there (Product class) should just define how a simple product looks like, just which data is in there,
// it just is there to group data together,
// ProductItem down here should not group data together or not primarily,
// instead this class will now also hold the logic to render a single product item.
// So here below the constructor we could add another render() method,
// (and of course you can name this method however you want, doesn't have to be named render),
// and then there (in the render() method in ProductList), I want to have the logic for creating that single product element (prodEl).
// So we can actually cut all that code from the ProductList and move it into this render() method of ProductItem,
// so that I create my product element there with "document.createElement",
// and now here of course when I access "imageUrl" and so on, I have to reach out to my "product" property (in ProductItem),
// so in here since "render()" belongs to the ProductItem class, it should normally be called on an object created with that class,
// so therefore here we should have "this" available and "this" should refer to the object created based on the class ProductItem,
// Now on "this", we should have a "product" property, so we should be able to do "this.product"and then ".imageUrl"
// because every "Product" object has an "imageUrl" property,
// Now with that, I have the logic to render a single product in my product item.
// the problem we have here is that this creates a product element (prodEl) but doesn't know where to append it:
// => Now we get two possible solutions for that:
// - solution A is that the render method accepts an element, a DOM object where we can call append and append this to
// - or that in this render method, we instead return the created product (prodEl),
// and wherever we call render, we have the responsibility to then use that returned object and append it,
// (and that's the approach I'll go for),
// I will return "prodEl" in here (ProductItem) in render(),
// and now we can just go to the "ProductList" and in here where I go through all products (for/of loop),
// we can now create a "productItem" with "new ProductItem()",
// so by using the "ProductItem" class we just worked on and constructing an object based on it item,
// to that as you learned, you have to pass a product, that's what we expect in the constructor (in ProductItem),
// and that's what we pass between parentheses when we create a new object with the "new" keyword (in ProductList in the for-of loop),
// and "prod" here (in for-of loop) where I through all "products" (this.products) in "ProductList",
// conveniently is just such a product object (in the products array in ProductList),
// So here (in new ProductItem()) we can just pass in "prod" (const productItem = new ProductItem(prod);),
// and then we can create our prodEl or get access to the created prodEl here (below productItem) by calling (productItem.render()),
// and as you learned, "render()"" will return this new object.
// So now we can append product element (prodEl) again because "prodEl" is such a DOM object created by "render()",
// but by "render()"" in "productItem" (productItem.render();).
// and now we might be able to see the advantages of this object oriented approach become clearer.
class ProductItem {
  constructor(product) {
    this.product = product; // to re-iterate what we learned: this adds a new "product" property to the eventually created objects
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
    // Now with that, I have the logic to render a single product in my product item
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
  // Now again, what will happen here is that when we create an object based on this class,
  // a "products" property will be added automatically and the default value will be that array.

  constructor() {} // we need a constructor and we won't need to set "this.products" to anything because we initialize it anyways (above)

  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

// Now we have to fix the code down there, productList here no longer exists,

// productList.render();

// instead now we have to instantiate our class ProductList,
// maybe create a "productList" object now with "new ProductList()",
// and then there, we could call "ProductList.render()", like that:

const productList = new ProductList();
productList.render();
// with that we should see the same result as before

// Now I want to outsource the logic for a single product (prodEl),
// so what we render for a single product into another class,
// so add another class "ProductItem"

/*

And now we might be able to see the advantages of this object oriented approach become clearer.
Now we already split our logic in some classes and yes of course it's still in the same file,
but if you are now coming to this code, if you're a new developer working on the project,
and you want to find out where's the logic for rendering a single product,
then you don't have to scan through all the file,
you just have to find this "ProductItem" class,
and it will be pretty clear that here (render() {} in ProductItem) this is what's responsible for rendering a single product element,
and you don't have to worry about the other code.
So it can make your code more readable and more structured and that's the idea behind Object Oriented Programming.
Well with that, let's save all of that and let's reload this page,
and again we get the same result as before but now with two classes that are involved in rendering content,
and now this also shows you how you can have classes with logic attached to them,
besides having classes that are just blueprints for data containers,
which also of course are very useful but here,
this helps us split our logic which makes our code more readable.

*/

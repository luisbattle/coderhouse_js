const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  if (userInfo) {
    console.log("info... ", userInfo)
    const userBtn = document.getElementById("user-btn")
    const userBtnItems = document.createElement("ul")
    userBtnItems.classList.add("dropdown-menu")
    userBtnItems.innerHTML = `
        <li><a class="dropdown-item" href="#">${userInfo.firstName} ${userInfo.lastName}</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" id="userLogout" href="#">Logout</a></li>
    `
    userBtn.append(userBtnItems)
  }
}

const getProductById = (productById) => {
  const product = products.filter((product) => product.id == productById)
  return product[0]
}

const addProductToCart = (newItem) => {

  const existInACart = myCart.items.filter((item) => item.productId == newItem.productId)
  if (existInACart.length > 0) {
    myCart.items.forEach((item) => {
      if (newItem.productId == item.productId) {
        item.quantity = item.quantity + 1
        item.totalPrice = item.quantity * getProductById(newItem.productId).price
      }
    })
  } else {
    myCart.items.push(shoppingCart.getCart())
    myCart.amount[0] = totalAmount(myCart)
  }

}

const deleteProductById = (productId) => {
  // eliminar el producto del array cart cuando presionan eliminar 
  myCart.items = myCart.items.filter((newCart) => newCart.productId != productId)
}

const totalAmount = (cart) => {
  const totalAmount = cart.items.reduce((acumulador, elemento) => acumulador + elemento.totalPrice, 0)

  return {
    totalAmount: totalAmount
  }
}

// Getting a random integer between two values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


class ShoppingCart {

  constructor(productId, quantity) {
    this.productId = productId
    this.quantity = quantity
  }

  getCart() {
    return (
      {
        productId: this.productId,
        productName: getProductById(this.productId).name,
        quantity: this.quantity,
        unitPrice: getProductById(this.productId).price,
        totalPrice: this.quantity * getProductById(this.productId).price
      }
    )
  }

}

// VARIABLES
const myCart = {
  items: [],
  amount: [],
}

let shoppingCart = []

const loadProductItems = () => {
  products.forEach((product) => {
    const productsHtml = document.getElementById("products")
    const { id, name, brandName, price, image } = product
    // armar html de productos dinamicamente
    let newProductItem = document.createElement("div")
    newProductItem.classList.add("product-item")
    newProductItem.setAttribute("id", id)
    newProductItem.innerHTML = `
    <div class="row product-item-container">
        <div class="col-6 product-item-detail-container">
            <p class="product-item-detail">${name}</p>
            <p class="product-item-detail">${brandName}</p>
            <p class="product-item-price">$ <span>${price}</span></p>
        </div>
        <div class="col-3 product-item-image-container">
            <img class="product-item-image"
                src="${image}"
                alt="">
        </div>
        <div class="col-3 product-item-buttons">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    1
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item" href="#">1</a></li>
                </ul>
            </div>
            <button type="button" class="btn btnAddProduct btn-dark" id="${id}">Agregar</button>
        </div>
    </div>
    `
    productsHtml.append(newProductItem)
  })

}

getUserInfo()

loadProductItems()

// Btn user logout
const btnUserLogout = document.getElementById("userLogout")
btnUserLogout.addEventListener("click", () => {
  localStorage.removeItem("userInfo")
  location.href = "index.html"
})

// Add Product to Cart
const btnAddProducts = document.querySelectorAll(".btnAddProduct")
btnAddProducts.forEach((btnAddProduct) => {
  btnAddProduct.addEventListener("click", (event) => {
    //press click to add product into a cart
    shoppingCart = new ShoppingCart(event.target.id, 1)

    // check if product Exist in a Cart and increment quantity
    addProductToCart(shoppingCart.getCart())

    renderCartProducts()
    renderTotalAmount()

  })
})

// Delete Product
const renderCartProducts = () => {
  const cartProductItems = document.getElementById("cart-products-items")
  cartProductItems.innerHTML = ""
  myCart.items.forEach((item) => {
    let productToCart = document.createElement("div")
    productToCart.classList.add("cart-product-item")
    productToCart.innerHTML = `
      <div class="row cart-product-item-container">
          <div class="col-10">${item.productName} X ${item.quantity} = $ ${item.totalPrice}</div>
          <div class="col-2">
              <button id="${item.productId}" type="button" class="btn btn-danger btn-delete-product-item">X</button>
          </div>
      </div>
    `
    cartProductItems.append(productToCart)

    // AddEventListener to Delete Products
    const btnDeleteProductsOfCart = document.querySelectorAll(".btn-delete-product-item")
    btnDeleteProductsOfCart.forEach((btnDeleteProduct) => {
      btnDeleteProduct.addEventListener("click", (event) => {
        deleteProductById(event.target.id)
        renderCartProducts()
        renderTotalAmount()
      })
    })
  })

}
const renderTotalAmount = () => {
  const totalAmountElement = document.getElementById("order-detail-price")
  totalAmountElement.innerHTML = totalAmount(myCart).totalAmount
}
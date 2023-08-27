
const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const userImageProfile = document.getElementById("btn-image-profile")

  if (userInfo) {
    const userBtn = document.getElementById("user-btn")
    const userBtnItems = document.createElement("ul")
    userBtnItems.classList.add("dropdown-menu", "dropdown-menu-dark")
    userBtnItems.innerHTML = `
        <li><a class="dropdown-item" href="#">${userInfo.firstName} ${userInfo.lastName}</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" id="userLogout" href="#">Logout</a></li>
    `
    const element = document.createElement("img")
    element.classList.add("profile-image")
    element.setAttribute("src", userInfo.profileImage)

    userBtn.append(userBtnItems)
    userImageProfile.append(element)



  } else { // si no está los datos del usuario en localStorage redirect to Login
    location.href = "/pages/login.html"
  }
}

const getProductById = async (productById) => {
  const products = await fetch('../data/products.json')
    .then((response => response.json()))
    .then((data) => {
      return data
    })

  const product = products.filter((product) => product.id == productById)
  return product[0]
}

const addProductToCart = async (newItem) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || { "items": [], "amount": [] }

  // const existInACart = myCart.items.filter((item) => item.productId == newItem.productId)
  const existInACart = cart.items.filter((item) => item.productId == newItem.productId)
  console.log("existInACart: ", existInACart)

  if (existInACart.length > 0) {
    cart.items.forEach((item) => {
      if (newItem.productId == item.productId) {
        console.log("yaa existe")
        item.quantity = item.quantity + 1
        item.totalPrice = item.quantity * newItem.unitPrice
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    })
  } else {
    cart.items.push(await shoppingCart.getCart())
    cart.amount[0] = totalAmount(cart)
    console.log("Cart: ", cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log("dataCartJSON: ", cart)
  }

}

const deleteProductById = (productIdToDelete) => {
  // eliminar el producto del array cart cuando presionan eliminar 
  myCart.items = myCart.items.filter((newCart) => newCart.productId != productIdToDelete)

  /*
  Obtener de mi localStorage el objeto carrito
  eliminar el productId
  actualizar el localStorage
  */
  myLocalStorageCart = JSON.parse(localStorage.getItem("cart"))
  myLocalStorageCart.items = myLocalStorageCart.items.filter((product) => product.productId != productIdToDelete)
  localStorage.setItem("cart", JSON.stringify(myLocalStorageCart))

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

const updateCartIconQuantity = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || { "items": [], "amount": [] }

  const element = document.getElementById("cart-quantity-icon")
  element.innerText = cart.items.length
}

class ShoppingCart {

  constructor(productId, quantity) {
    this.productId = productId
    this.quantity = quantity
  }

  async getCart() {
    const product = await getProductById(this.productId)
    return (
      {
        productId: this.productId,
        productName: product.name,
        quantity: this.quantity,
        unitPrice: product.price,
        totalPrice: this.quantity * product.price
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

const loadProductItems = async () => {
  const products = await fetch('../data/products.json')
    .then((response => response.json()))
    .then((data) => {
      return data
    })
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
const renderCartProducts = () => {
  const cartProductItems = document.getElementById("cart-products-items")
  cartProductItems.innerHTML = ""

  const cart = JSON.parse(localStorage.getItem("cart")) || { "items": [], "amount": [] }
  // console.log("exist key... ", cart.hasOwnProperty('items'))

  cart.items.forEach((item) => {
    let productToCart = document.createElement("div")
    productToCart.classList.add("cart-product-item")
    productToCart.innerHTML = `
      <div class="row cart-product-item-container">
          <div class="col-10">${item.productName} X ${item.quantity}</div>
          <div class="col-1">
              <button id="${item.productId}" type="button" class="btn btn-delete-product-item">
              <i id="${item.productId}" class="bi bi-trash3-fill btn-delete-product-item"></i>
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
        updateCartIconQuantity()

      })
    })
  })
  const totalElement = document.createElement("div")
  totalElement.classList.add("text-center")
  totalElement.innerHTML = `
  <p id="total-checkout-amount">Total $ ${totalAmount(cart).totalAmount}</p>
  <button type="button" class="btn btn-success btn-buy-products">Finalizar compra</button>
  `
  cartProductItems.appendChild(totalElement)

}
const addListeners = () => {
  // Btn user logout
  const btnUserLogout = document.getElementById("userLogout")
  btnUserLogout.addEventListener("click", () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cart")
    location.href = "./pages/login.html"
  })

  // Add Product to Cart
  const btnAddProducts = document.querySelectorAll(".btnAddProduct")
  btnAddProducts.forEach((btnAddProduct) => {
    btnAddProduct.addEventListener("click", async (event) => {
      //press click to add product into a cart
      shoppingCart = new ShoppingCart(event.target.id, 1)

      // check if product Exist in a Cart and increment quantity
      const newItem = shoppingCart.getCart()
        .then(((data) => {
          addProductToCart(data)
            .then(() => {
              renderCartProducts()
              // renderTotalAmount()
              updateCartIconQuantity();

            })

        }))

    })
  })

}


getUserInfo()
loadProductItems()
  .then(() => {
    addListeners()
  })
renderCartProducts()



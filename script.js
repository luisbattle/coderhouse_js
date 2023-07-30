const products = [
  {
    id: 1,
    name: "Auricular Redragon RGB",
    brandName: "Redragon",
    category: "Auriculares",
    description: "",
    price: 1000,
    stockQuantity: 2
  },
  {
    id: 2,
    name: "Procesador Ryzen 9 5900X 4.6Hz turbo AM4 ",
    brandName: "AMD",
    category: "Procesadores",
    description: "",
    price: 2000,
    stockQuantity: 2
  },
  {
    id: 3,
    name: "Gamepad Xbox Bluetooth",
    brandName: "Microsoft",
    category: "Joysticks",
    description: "",
    price: 3000,
    stockQuantity: 2
  },
  {
    id: 4,
    name: "Teclado Logitech RGB ",
    brandName: "Logitech",
    category: "Auriculares",
    description: "",
    price: 6000
  },
  {
    id: 5,
    name: "Gabinete Asus Tuf 301",
    brandName: "Redragon",
    description: "",
    category: "Gabinetes",
    price: 5000
  }
]

const getProductById = (productById) => {
  const product = products.filter((product) => product.id == productById)
  return product[0]
}
const totalAmount = (cart) => {
  console.log("cart actually....", cart)

  const totalAmount = cart.items.reduce((acumulador, elemento) => acumulador + elemento.totalPrice, 0)

  return {
    totalAmount: totalAmount
  }
}

parseProducts = () => {
  let productOptions = ""
  products.forEach((product) => {
    productOptions += `${product.id} - ${product.name} - ${product.price} \n`
  })
  return productOptions
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
let exit = false

// MENU
do {

  const productId = prompt(`Ingresa el ID de PRODUCTO a comprar \n${parseProducts()}\nSi desea salir ingrese 'SALIR'`)

  // usuario selecciona salir
  if (productId.toUpperCase() === "SALIR") {
    exit = true
  }
  // No existe el producto
  if (!getProductById(productId) && exit != true) {
    alert("el id ingresado no existe.... Ingrese un ID de producto valido")
  }
  // existe el producto
  if (getProductById(productId)) {
    const quantity = prompt(`¿Cuantos productos deseas? \n ${getProductById(productId).name} - $${getProductById(productId).price}`)
    shoppingCart = new ShoppingCart(productId, quantity)

    myCart.items.push(shoppingCart.getCart())

    addMoreProducts = prompt(`Desea agregar mas productos al carrito SI/NO`)
    if (addMoreProducts.toUpperCase() == 'SI') {
      exit = false
    } else {
      exit = true
    }
  }

} while (exit == false);


// TOTAL
myCart.amount.push(totalAmount(myCart))
console.log("carrito actual es....", myCart)

let buildTicket = ""
const getTicketDetails = () => {
  let ticketDetails = ""
  myCart.items.forEach(item => {
    ticketDetails += `${item.productId} - ${item.productName} - ${item.quantity} - $${item.unitPrice} - $${item.totalPrice} \n`
  });
  return ticketDetails

}

alert(`TICKET Nº ${getRandomInt(1000, 1000000)}
---------------------------------------------------------------
[CODIGO] [DESCRIPCION]  [CANT.] [PRECIO UNIT] [SUBTOTAL] 
${getTicketDetails()}
---------------------------------------------------------------
TOTAL A ABONAR: $${myCart.amount[0].totalAmount}
`)
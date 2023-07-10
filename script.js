// Set Variables
const company_name = "El Paisa Productos"
const producto_1001 = `[1001] - Hamburguesa con queso`
const producto_1002 = `[1002] - Mila Napolitana`
const producto_1003 = `[1003] - Super Pizza Napolitana`
const producto_1004 = `[1004] - Ñoquis con Salsa Bolognesa`
const producto_1005 = `[1005] - Sandwich de vacio completo`
const producto_1006 = `[1006] - Parrillada completa para 2Personas`

const producto_1001_price = 4400
const producto_1002_price = 4000
const producto_1003_price = 3500
const producto_1004_price = 3000
const producto_1005_price = 2500
const producto_1006_price = 6000


// Greeting
const greeting = () => {
  alert(`Bienvenido a ${company_name}`)
}


// show Menu
const showMenu = () => {
  const selected_option = prompt(showProducts())

  return selected_option
}
//show products
const showProducts = () => {
  return `Elegí un producto ingresando el ID: \n
  ${producto_1001}
  ${producto_1002}
  ${producto_1003}
  ${producto_1004}
  ${producto_1005}
  ${producto_1006}
  EXIT - presiona exit para salir`
}
const validateOption = (selected_option) => {
  switch (selected_option.toLocaleLowerCase()) {
    case "1001":
      break;

    case "1002":
      break;

    case "1003":
      break;

    case "1004":
      break;

    case "1005":
      break;

    case "1006":
      break;

    case "exit":
      break;

    default:
      alert(`La opcion seleccionada ${selected_option} no esta disponible o es incorrecta, intentá nuevamente ingresando el ID del producto`)
      return false
      break;
  }
  return true
}

const getProductPrice = (productId) => {
  console.log("productId Selected" + typeof (productId) + " - " + productId)
  switch (parseInt(productId)) {
    case 1001:
      return producto_1001_price
    case 1002:
      return producto_1002_price
    case 1003:
      return producto_1003_price
    case 1004:
      return producto_1004_price
    case 1005:
      return producto_1005_price
    case 1006:
      return producto_1006_price
    default:
      return "Precio no encontrado";
  }
}
const getProductName = (productId) => {
  switch (parseInt(productId)) {
    case 1001:
      return producto_1001
    case 1002:
      return producto_1002
    case 1003:
      return producto_1003
    case 1004:
      return producto_1004
    case 1005:
      return producto_1005
    case 1006:
      return producto_1006
    default:
      return "Producto no encontrado";
  }
}
const calculateTotalPrice = (productPrice, productQuantity) => {
  return productPrice * productQuantity;
}


// Main Function
const main = () => {

  greeting()

  let exit_menu = true;
  let productId = ""
  let exit_app = false
  let selected_option = ""


  // MENU
  do {
    selected_option = showMenu()
    exit_loop_menu = validateOption(selected_option)
    if (selected_option.toLocaleLowerCase() == "exit") {
      exit_app = true
    }
    console.log(exit_menu)
  } while (exit_loop_menu == false);

  // GET PRODUCT ID && PRICE
  if (!exit_app) {
    productId = parseInt(selected_option)
    console.log(`opcion seleccionada ${selected_option}`)
    console.log(`ProductId: ${productId}`)
    alert(`Usted seleccionó 
    ${getProductName(productId)} ---> $${getProductPrice(productId)}`)
    const productQuantity = prompt(`Ingrese la cantidad que desea comprar:
    --------------------------------------
    ${getProductName(productId)}
    --------------------------------------`)

    const totalToPay = calculateTotalPrice(getProductPrice(productId), productQuantity)
    alert(`Tu pedido se está preparando
    PEDIDO Nº 144948293849
    -------------------------------------------------------------
    ${getProductName(productId)}         ${getProductPrice(productId)} X ${productQuantity}
    -------------------------------------------------------------
    TOTAL: $ ${totalToPay}`)

  } else {
    // FIN
    console.log("APP EXIT")
    alert("Nos vemos pronto :)")
  }

}


main()
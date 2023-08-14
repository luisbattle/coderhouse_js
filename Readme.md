# Practica CoderHouse

## Primer script
````
1- Ingresa el ID del producto a comprar
2- Ingresa la Cantidad
3- Te retorna el total a abonar del producto comprado.
````

## ¿Que se utilizó?

- Funciones
    - totalAmount(cart:Array)
        - Calcula el total del carrito
    - getProductById(productId:int)
        - Obtiene el producto del ID por parámetro
    - parseProducts()
        - retorna el menu de productos para mostrar por pantalla y poder seleccionarlo.
    - getRandomInt(min,max)
        - Se utiliza para un Nº random a utilizar en el numero de ticket(Math.random())...
- Array de Objetos products
- Clase ShoppingCart con método getCart()
- Array myCart donde se pushean los objetos que vamos creando.
![Alt text](./img/myCart.png)


## Que se hizo
    - Maquetado de carrito y se agregaron botones,estilos.

## Que hay que hacer
    - Agregar evento al boton Agregar para agregar el producto hacia carrito de compra
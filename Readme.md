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
    - [getRandomInt(min,max)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values)
        - Se utiliza para un Nº random a utilizar en el numero de ticket(Math.random())...
- Array de Objetos products
- Clase ShoppingCart con método getCart()
- Array myCart donde se pushean los objetos que vamos creando.
![Alt text](./img/myCart.png)

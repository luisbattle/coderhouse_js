const btnLogin = document.getElementById("btnLogin")
btnLogin.addEventListener("click", async (event) => {
    event.preventDefault()
    const userLogin = await checkUserLogin()
    console.log("userLogin: ", userLogin)
    if (!userLogin.error) {
        console.log(`Welcome ${userLogin.user.firstName} ${userLogin.user.lastName}`)
        localStorage.setItem("userInfo", JSON.stringify(userLogin.user))
        // Move to index.html "carrito de compras"
        location.href = "cart.html"
    } else {
        console.log("invalid login")
        Swal.fire({
            icon: 'error',
            title: 'Login incorrecto',
            text: 'Usuario y/o contraseña incorrecta. Intentá nuevamente',
        })
    }

})

const checkUserLogin = () => {
    let loginData = {}
    const inputs = document.querySelectorAll("input")
    console.log("inputs.... ", inputs)
    inputs.forEach((input) => {
        loginData = {
            ...loginData,
            [input.name]: input.value
        }
    })
    return loginUser(loginData)
}

const loginUser = async (userToLogin) => {
    console.log("Login check....")
    console.log(userToLogin)

    const usersDb = await fetch('../data/users.json')
        .then((response => response.json()))
        .then((data) => {
            console.log("dataJSON: ", data)
            return data
        })

    console.log(usersDb)
    const userFind = usersDb.find((user) => userToLogin.username === user.username && userToLogin.password === user.password)

    // delete userPassword from object
    if (userFind) { delete userFind.password }

    const userLogin = {
        user: userFind ? userFind : [],
        error: userFind ? false : true
    }
    return userLogin
}


const btnLogin = document.getElementById("btnLogin")
btnLogin.addEventListener("click", async (event) => {
    event.preventDefault()
    const userLogin = await checkUserLogin()
    if (!userLogin.error) {
        localStorage.setItem("userInfo", JSON.stringify(userLogin.user))
        // Move to products.html "carrito de compras"
        location.href = "../index.html"
    } else {
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
    inputs.forEach((input) => {
        loginData = {
            ...loginData,
            [input.name]: input.value
        }
    })
    return loginUser(loginData)
}

const loginUser = async (userToLogin) => {
    const usersDb = await fetch('../data/users.json')
        .then((response => response.json()))
        .then((data) => {
            return data
        })

    const userFind = usersDb.find((user) => userToLogin.username === user.username && userToLogin.password === user.password)

    // delete userPassword from object
    if (userFind) { delete userFind.password }

    const userLogin = {
        user: userFind ? userFind : [],
        error: userFind ? false : true
    }
    return userLogin
}


const formulario = document.getElementById("formulario")
const inputs = document.querySelectorAll(".formulario__input")
const checkBox = document.querySelector(".formulario__checkbox")

const regExps = {
    usuario: /^[a-zA-Z0-9_]{4,10}$/,
    nombre: /^[a-zA-Z0-9À-ÿ\s]{3,15}$/,
    password: /^.{4,12}$/,
    correo: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    telefono: /^[0-9]{8,14}$/
}

let campos = {
    usuario: false,
    nombre: false,
    password: false,
    password2: false,
    correo: false,
    telefono: false
}

const validacionCampo = (regEx, value, name) => {
    if (regEx.test(value)) {
        document.querySelector(`#grupo__${name}`).classList.remove("formulario__grupo-incorrecto")
        document.querySelector(`#grupo__${name}`).classList.add("formulario__grupo-correcto")
        document.querySelector(`#grupo__${name} .formulario__validacion-estado`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo__${name} .formulario__validacion-estado`).classList.add("fa-check-circle")
        document.querySelector(`#grupo__${name} .formulario__input-error`).classList.remove("formulario__input-error-activo")
        campos[name] = true

    }
    else {
        document.querySelector(`#grupo__${name}`).classList.add("formulario__grupo-incorrecto")
        document.querySelector(`#grupo__${name}`).classList.remove("formulario__grupo-correcto")
        document.querySelector(`#grupo__${name} .formulario__validacion-estado`).classList.add("fa-times-circle")
        document.querySelector(`#grupo__${name} .formulario__validacion-estado`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo__${name} .formulario__input-error`).classList.add("formulario__input-error-activo")
        campos[name] = false
    }
}

const validarPassword2 = () => {
    const valor1 = document.getElementById("password").value
    const valor2 = document.getElementById("password2").value
    if (valor1 !== valor2) {
        document.querySelector(`#grupo__password2`).classList.add("formulario__grupo-incorrecto")
        document.querySelector(`#grupo__password2`).classList.remove("formulario__grupo-correcto")
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo")
        document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.add("fa-times-circle")
        document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.remove("fa-check-circle")
        campos.password2 = false


    } else {
        document.querySelector(`#grupo__password2`).classList.remove("formulario__grupo-incorrecto")
        document.querySelector(`#grupo__password2`).classList.add("formulario__grupo-correcto")
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo")
        document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.add("fa-check-circle")
        campos.password2 = true



    }
}
const validacionFormulario = e => {

    switch (e.target.name) {
        case "usuario":
            validacionCampo(regExps.usuario, e.target.value, "usuario")
            break;
        case "nombre":
            validacionCampo(regExps.nombre, e.target.value, "nombre")
            break;
        case "password":
            validacionCampo(regExps.password, e.target.value, "password")
            validarPassword2()
            break;
        case "password2":
            validacionCampo(regExps.password, e.target.value, "password2")
            validarPassword2()
            break;
        case "correo":
            validacionCampo(regExps.correo, e.target.value, "correo")
            break;
        case "telefono":
            validacionCampo(regExps.telefono, e.target.value, "telefono")
            break;
    }
    if (inputs[0].value !== "" && inputs[1].value !== "" && inputs[2].value !== "" && inputs[3].value !== "" && inputs[4].value !== "" && inputs[5].value !== "") {

        checkedCheckBox()
    }

}

const checkedCheckBox = () => {
    if (checkBox.checked) {
        if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && campos.password2) {
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo")
            document.querySelector(".formulario__btn").disabled = false

        } else {
            document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo")
            document.querySelector(".formulario__btn").disabled = true



        }
    } else {
        document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo")
        document.querySelector(".formulario__btn").disabled = true

    }
}

inputs.forEach(input => {
    input.addEventListener("blur", validacionFormulario)
    input.addEventListener("keyup", validacionFormulario)
})


checkBox.addEventListener("click", checkedCheckBox)

formulario.addEventListener("submit", e => {
    e.preventDefault();
    campos = {
        usuario: false,
        nombre: false,
        password: false,
        password2: false,
        correo: false,
        telefono: false
    }
    document.querySelectorAll(".formulario__validacion-estado").forEach(icono => {
        icono.classList.remove("fa-check-circle")
    })

    formulario.reset();
    document.querySelector(".formulario__btn").disabled = true
    document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo")
    setTimeout(() => {
        document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo")
    }, 2000)
})





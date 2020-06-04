/*
Vamos a evolucionar el tema del dni.
Crear una AppWeb, para la policía.
Tiene que detectar al poner el nombre y el dni, si esa persona nos ha dado un dni erróneo.

Crear un Mockup, porque la aplicación es para la policía y tiene que quedar correcta visualmente y que la puedan
entender sin problemas.
44123456A
2020 @ Tibor Kopca
*/
'use strict'
//VARIABLES
var charLast;

//FUNCIONS
function calcularLetraDNI(numeroDNI) {      //Devuelve la letra calculada de numero (8 caracteres)
    if (numeroDNI == 'error') {             //en caso la letra no cumple condicion de ser Z, Y o X
        return 'La primera letra es falsa.'
    } else {
        var resto = numeroDNI % 23          //Se divide el numero entre 23
        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
        var letraDNI = letras[resto];       //EL resto se sustituye por una letra
        console.log("Letra calculada : " + letraDNI);
        return letraDNI
    }
}

//COMPROBAMOS SI EL NUMERO ES COMPLETO 
function comprobarLetra() {                         //devuelve LETRA o ERROR
    const dataInput = document.getElementById('inputValue').value;  //sacamos datos entregados completos CADA VEZ se lanza la funccion                    
    const numberDni = dataInput.slice(0, 8);                 //Sacamos solo el numero del input
    console.log("Numero es : " + numberDni);
    charLast = dataInput.charAt(dataInput.length - 1).toUpperCase();      //Sacamos la letra ultima
    console.log("Last character " + charLast);
    console.log("dataInput Length : " + dataInput.length);

    switch (true) {
        case (dataInput.length < 9):                     //COMPROBACION SI LOS DATOS ENTREGADOS SON COMPLETOS
            console.log("DNI/NIE no completo.");
            break;
        case !isNaN(dataInput.charAt(8)):               //COMPROBACION SI ULTIMA LETRA EXISTE
            console.log("Falta una letra final");
            break;
        case isNaN(dataInput.charAt(0)):               //comprobamos si la primera letra es otro que numero
            console.log("Extranjero")                   //Si tiene la letra como primer caracter = Extranjero
            return calcularLetraDNI(comprobarNIE(numberDni));
        default:                                        //Si no tiene la letra como primer caracter = Espanol
            return calcularLetraDNI(numberDni);
    }
}
//MAIN FUNCTION
function botonSubmit() {
    let result = comprobarLetra();                      //lanzamos evaluacion y el resto de funciones, nos devuelve letra DNI computada o error
    let resultBox = document.getElementById('resultBox');
    resultBox.style.display = "block";                  //mostramos el elemento donde se muestra resultado
    if (charLast == result) {             //si la letra final entregada y el numero evaluado es lo mismo
        document.getElementById('result').innerHTML = "Letra es CORRECTA."
    } else {
        document.getElementById('result').innerHTML = "Letra es INCORRECTA."
    }
}

//EVENTS
const evaluar = document.getElementById("evaluar");               
const borrar = document.getElementById("borrar");
evaluar.addEventListener("click", botonSubmit);                 //si presionamos boton evaluar, lanzamos botonSubmit-MAIN FUNCTION
borrar.addEventListener("click", clearData);                    //si presionamos borrar datos => function clearData

//FUNCTION BORRAR INPUTBOX
function clearData(){
    document.getElementById('inputValue').value = null;         //limpiamos inputbox
    let resultBox = document.getElementById('resultBox');       
    resultBox.style.display = "none";                           //descubrimos caja de resultado
}


//FUNCION PARA COMPOBAR SI LA LETRA DE EXTRANJEROS ES VALIDA
function comprobarNIE(dni) {
    //Los NIE's de extranjeros residentes en España tienen una letra (X, Y, Z), 7 números y dígito de control.
    //X=0, Y=1, Z=2
    var letra0 = dni.charAt(0).toUpperCase();               //si es primera letra algo de siguientes, es extranjero                           
    if (letra0 == 'X') {
        return dni = parseInt(0 + dni.substring(1));     //parseamos dni y anadimos numero corespondiente en la primera posicion
    } else if (letra0 == 'Y') {
        return dni = parseInt(1 + dni.substring(1));
    } else if (letra0 == 'Z') {
        return dni = parseInt(2 + dni.substring(1));
    } else if (letra0 != 'Z' || 'Y' || 'X') {                  //Si la primera letra no es valida, return error
        console.log("numero Extranjero no valido " + dni);
        return dni = 'error';                               //la letra no es valida
    } else {
        return dni;
    }

}

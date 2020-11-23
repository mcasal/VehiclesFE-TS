"use strict";
// Es declara la variable car com a objecte (car.js) però encara sense definir
var car;
var infoCar = document.getElementById('infoCar');
var infoWheels = document.getElementById('infoWheels');
var formWheels = document.getElementById('formWheels');
function createCar() {
    //les definicions que no siguin globals, van dins de la funció corresponent
    var plate = document.getElementById('plate').value;
    var brand = document.getElementById('brand').value;
    var color = document.getElementById('color').value;
    //primer valida que tots els camps siguin correctes
    var validateInfo = validate(plate, brand, color);
    if (validateInfo === 0) {
        car = new Car(plate, brand, color);
        infoCar.classList.remove("d-none");
        infoCar.innerHTML = "<p class=\"pt-3\"><span class=\"font-weight-bold\">Plate:</span> " + plate + "</p>\n        <p class=\"pt-3\"><span class=\"font-weight-bold\">Brand:</span> " + brand + "</p>\n        <p class=\"pt-3\"><span class=\"font-weight-bold\">Color:</span> " + color + "</p>";
        formWheels.classList.remove("d-none");
    }
}
function addWheels() {
    // valida el diametre de les rodes i que els camps no estiguin buits
    infoWheels.innerHTML = "";
    infoWheels.classList.remove("d-none");
    var checkWheels = false;
    for (var i = 1; i <= 4; i++) { // i = 1 pq comença a la roda 1 fins la 4
        var wheelDiameter = document.getElementById('wheelDiam' + [i]).value; // OJO DUPLICAT!!
        var wheelBrand = document.getElementById('wheelBrand' + [i]).value; // OJO DUPLICAT!!
        var diameterValue = Number(wheelDiameter); // el valor passa de string a number amb decimals (sempre amb punt, mai amb coma).
        var validateWheel = validateWheels(diameterValue, i, wheelBrand);
        if (validateWheel > 0 && !checkWheels) {
            checkWheels = true;
        }
    }
    // això es veurà quan no hi hagin errors al validateWheels
    if (!checkWheels) {
        for (var i = 1; i <= 4; i++) {
            var wheelDiameter = document.getElementById('wheelDiam' + [i]).value; // OJO DUPLICAT!!
            var wheelBrand = document.getElementById('wheelBrand' + [i]).value; // OJO DUPLICAT!!
            var diameterValue = Number(wheelDiameter); // OJO DUPLICAT!!
            car.addWheel(new Wheel(diameterValue, wheelBrand));
            //infoWheels.innerHTML += `<p class="col-12 pt-3 font-weight-bold text-uppercase text-center">Wheel ${i}</p><p class="col-6 pt-3 text-right">Brand: ${wheelBrand}</p><p class="col-6 pt-3 text-left">Diameter: ${diameterValue}</p>`;
            infoWheels.innerHTML = "<p class=\"col-12 pt-3 font-weight-bold text-center text-success\">ALL WHELLS HAVE BEEN SUCCESSFULLY ADDED</p>";
        }
        console.log(car);
    }
}
function validate(plate, brand, color) {
    var error = 0;
    if (plate == "") {
        infoCar.innerHTML = "<p class=\"text-danger pt-3\">Plate value is required!</p>";
        error++;
    }
    else if (brand == "") {
        infoCar.innerHTML = "<p class=\"text-danger pt-3\">Brand value is required!</p>";
        error++;
    }
    else if (color == "") {
        infoCar.innerHTML = "<p class=\"text-danger pt-3\">Color value is required!</p>";
        error++;
    }
    else if (!validatePlate(plate)) {
        infoCar.innerHTML = "<p class=\"text-danger pt-3\">Plate error: The correct format is 0000XXX</p>";
        error++;
    }
    return error;
}
function validatePlate(plate) {
    var regex = /^[0-9]{4}[a-zA-Z]{3}$/;
    return regex.test(plate) ? true : false;
}
function validateWheels(diameter, index, brand) {
    var error = 0;
    var diameterElement = document.getElementById("wheelDiam" + [index]);
    var brandElement = document.getElementById("wheelBrand" + [index]);
    var errorDiametre = document.getElementById("errorwheelDiam" + [index]);
    var errorBrand = document.getElementById("errorwheelBrand" + [index]);
    if (diameter == "") {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = "Wheel " + index + " diameter is required!";
        error++;
    }
    else if (brand == "") {
        brandElement.classList.add("is-invalid");
        errorBrand.textContent = "Brand for wheel " + index + " is required!";
        error++;
    }
    else if (diameter < 0.4 || diameter > 2) {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = "Error value wheel " + index + ": the diameter has to be between 0.4cm and 2cm.";
        error++;
    }
    return error;
}
// treu els "is-invalid" del formWheels quan s'introdueixen els nous valors per corregir els erronis
if (formWheels) {
    formWheels.addEventListener('blur', function (event) {
        if (event.target.value != '')
            event.target.classList.remove('is-invalid');
    }, true);
}

"use strict";
// Es declara la variable car com a objecte (car.js) però encara sense definir
var car;
var plate = document.getElementById('plate');
var brand = document.getElementById('brand');
var color = document.getElementById('color');
var infoCar = document.getElementById('infoCar');
function createCar() {
    //declares un objecte (el constructor ja fet a car.js) amb els seus atributs com a paràmetres
    car = new Car(plate.value, brand.value, color.value);
    // print per pantalla
    infoCar.classList.remove("d-none");
    infoCar.innerHTML = "<p class=\"pt-3\"><span class=\"font-weight-bold\">Plate:</span> " + plate.value + "</p>\n    <p class=\"pt-3\"><span class=\"font-weight-bold\">Brand:</span> " + brand.value + "</p>\n    <p class=\"pt-3\"><span class=\"font-weight-bold\">Color:</span> " + color.value + "</p>";
    //car.addWheel(new Wheel(2,"SEAT"));
    //document.body.innerText="CAR: PLATE: " + car.plate 
    //+ " COLOR: " +car.color + " BRAND: " + brand 
    //+ " WHEELS: " + JSON.stringify(car.wheels);
}

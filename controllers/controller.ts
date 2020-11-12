// Es declara la variable car com a objecte (car.js) però encara sense definir
let car: Car;

let plate = document.getElementById('plate') as HTMLInputElement;
let brand = document.getElementById('brand') as HTMLInputElement;
let color = document.getElementById('color') as HTMLInputElement;
let infoCar = document.getElementById('infoCar') as HTMLElement;

function createCar(){
    //declares un objecte (el constructor ja fet a car.js) amb els seus atributs com a paràmetres
    car = new Car(plate.value, brand.value, color.value);
    
    // print per pantalla
    infoCar.classList.remove("d-none"); 
    infoCar.innerHTML = `<p class="pt-3"><span class="font-weight-bold">Plate:</span> ${plate.value}</p>
    <p class="pt-3"><span class="font-weight-bold">Brand:</span> ${brand.value}</p>
    <p class="pt-3"><span class="font-weight-bold">Color:</span> ${color.value}</p>`;
    
    //car.addWheel(new Wheel(2,"SEAT"));
    //document.body.innerText="CAR: PLATE: " + car.plate 
    //+ " COLOR: " +car.color + " BRAND: " + brand 
    //+ " WHEELS: " + JSON.stringify(car.wheels);
}
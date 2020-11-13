// Es declara la variable car com a objecte (car.js) però encara sense definir
let car: Car;

let plate = document.getElementById('plate') as HTMLInputElement;
let brand = document.getElementById('brand') as HTMLInputElement;
let color = document.getElementById('color') as HTMLInputElement;
let infoCar = document.getElementById('infoCar') as HTMLElement;
let formWheels = document.getElementById('formWheels') as HTMLElement;
let infoWheels = document.getElementById('infoWheels') as HTMLElement;

function createCar() {
    //primer valida que tots els camps siguin correctes
    let validateInfo = validate(plate, brand, color);

    if (validateInfo == 0) {
        car = new Car(plate.value, brand.value, color.value);
        infoCar.classList.remove("d-none");

        infoCar.innerHTML = `<p class="pt-3"><span class="font-weight-bold">Plate:</span> ${plate.value}</p>
        <p class="pt-3"><span class="font-weight-bold">Brand:</span> ${brand.value}</p>
        <p class="pt-3"><span class="font-weight-bold">Color:</span> ${color.value}</p>`;

        formWheels.classList.remove("d-none");
    }
}

function addWheels() {
    // valida el diametre de les rodes
    infoWheels.innerHTML = "";
    infoWheels.classList.remove("d-none");
    for (let i = 1; i <= 4; i++) { // i = 1 pq comença a la roda 1 fins la 4
        let wheelDiameter = document.getElementById('wheelDiam' + [i]) as HTMLInputElement;
        let wheelBrand = (document.getElementById('wheelBrand' + [i]) as HTMLInputElement).value;
        let diameterValue = parseFloat(wheelDiameter.value); // el valor passa de string a number amb decimals (sempre amb punt, mai amb coma)
        let validateDiameter = validateWheels(diameterValue, i, wheelBrand);
        if (validateDiameter == 0) {
            infoWheels.innerHTML += `<p class="col-12 pt-3 font-weight-bold text-uppercase text-center">Wheel ${i}</p><p class="col-6 pt-3 text-center">Brand: ${wheelBrand}</p><p class="col-6 pt-3 text-center">Diameter: ${diameterValue}</p>`;
            car.addWheel(new Wheel(diameterValue, wheelBrand));
        }
    }
    //console.log(car);
}

function validate(plate: HTMLInputElement, brand: HTMLInputElement, color: HTMLInputElement) {
    let error = 0;

    if (plate.value == "") {
        infoCar.innerHTML = `<p class="text-danger pt-3">Plate value is required!</p>`
        error++;
    } else if (brand.value == "") {
        infoCar.innerHTML = `<p class="text-danger pt-3">Brand value is required!</p>`
        error++;
    } else if (color.value == "") {
        infoCar.innerHTML = `<p class="text-danger pt-3">Color value is required!</p>`
        error++;
    } else if (!validatePlate(plate)) {
        infoCar.innerHTML = `<p class="text-danger pt-3">Plate error: The correct format is 0000XXX</p>`
        error++;
    }

    return error;
}

function validatePlate(plate: any) {
    let regex = /^[0-9]{4}[a-zA-Z]{3}$/;
    return regex.test(plate.value) ? true : false;
}

function validateWheels(diameter: any, index: number, brand: any) {
    let error = 0;

    if (diameter == "") {
        infoWheels.innerHTML += `<p class="col-12 text-danger pt-3 text-center">Wheel ${index} diameter is required!</p>`
        error++;
    } else if (brand == "") {
        infoWheels.innerHTML += `<p class="col-12 text-danger pt-3 text-center">Brand for wheel ${index} is required!</p>`
        error++;
    } else if (diameter < 0.4 || diameter > 2) {
        infoWheels.innerHTML += `<p class="col-12 text-danger pt-3 text-center">Error value from wheel ${index}: the diameter had to be between 0,4cm and 2cm.</p>`
        error++;
    }

    return error;
}
import UI from './classes/UI.js'
import {cityInput, countryInput} from './selectores.js'

const ui = new UI();

export function getWeather(country, city) {
    
    const key = 'c09f2225e616740afcdad4ef82002ce4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`

    ui.spinner();

    fetch(url)
        .then(response => response.json())
        .then(data =>{

            ui.cleanTempeture();
            ui.cleanUbication();

            if(data.cod === '404'){
                ui.printError('La ciudad no existe')
            }else{
                
                const {main:{temp, temp_max, temp_min}} = data;
                const celsius = toCelsius(temp);
                const celsius_max = toCelsius(temp_max);
                const celsius_min = toCelsius(temp_min);

                ui.printWeather(celsius, celsius_max, celsius_min);
                getFlag(data);
                ui.cleanForm();
            }

        })
        .catch(error=>console.log(error))
}

export function getFlag(data) {
    
    const {name, sys:{country}} = data;
    const countryCode = country.toLowerCase();
    const url = `https://www.countryflags.io/${countryCode}/flat/64.png`;

    fetch(url, {mode: 'no-cors'})
        .then(response => response.blob())
        .then(img => ui.printUbication(name, `https://www.countryflags.io/${countryCode}/flat/64.png`, country));

}

export function loadData() {
    
    fetch('https://extreme-ip-lookup.com/json/')
    .then(resolve=>resolve.json())
    .then(data=>{
        if(!data.error){
            const {city, countryCode} = data;
            getWeather(countryCode, city)
        }
    })
    .catch(error => console.log(error))
    
}

export function loadCountries(element) {
    fetch('data/countryCode.json')
    .then(response => response.json())
    .then(data=> ui.printCountries(data, element))
    .catch(error => console.log(error))
}

export function dataValidation(e) {
    e.preventDefault();
        
    if(cityInput.value == '' || countryInput.value == ''){
        ui.printError('Campos vacíos');
    }else{
        getWeather(countryInput.value, cityInput.value)
    }
}

export const toCelsius = tempeture => Math.round(tempeture-273.15);
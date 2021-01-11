import {container,resultado,ubicationDiv, cityInput, countryInput} from '../selectores.js'
class UI{

    printError(mensaje) {
    
        if (!document.querySelector('.bg-red-500')) {
            
            const alert = document.createElement('div');
            
            alert.classList.add('bg-red-500', 'text-red-100', 'px-5', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
            alert.innerHTML = `<span class="font-bold">Error:</span> ${mensaje}`;
            
            container.appendChild(alert);
    
            setTimeout(() => {
                alert.remove();
            }, 1500);
        }
    }

    printWeather(currentTmp, maxTmp, minTmp){
    
        const tempeture = document.createElement('p');
        tempeture.innerHTML = `${currentTmp}&#8451;`;
        tempeture.classList.add('font-bold', 'text-6xl')
    
        const maxMinTmp = document.createElement('p');
        maxMinTmp.innerHTML = `Máx: ${maxTmp}&#8451; - Min:${minTmp}&#8451;`
        maxMinTmp.classList.add('text-center', 'text-1xl');
    
        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'text-white');
        resultadoDiv.appendChild(tempeture);
        resultadoDiv.appendChild(maxMinTmp);
    
        resultado.appendChild(resultadoDiv);
    }

    printUbication(city, imgURL, country) {
    
        const ubication = document.createElement('p');
        ubication.classList.add('ubicationInfo');
        ubication.innerHTML = `${city}, ${country}<img src="${imgURL}">`
    
        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'text-white', 'ubicationContainer');
        resultadoDiv.appendChild(ubication);
    
        ubicationDiv.appendChild(resultadoDiv);
    }

    printCountries(data, element) {

        let options = '<option disabled selected value="">Selecciona un país</option>\n';
    
        for (const countryInf of data) {
            const {name, code} = countryInf;
            options+=`<option value="${code}">${name}</option>\n`
        }
    
        element.innerHTML = options;
    }

    spinner(){

        this.cleanTempeture();
        this.cleanUbication();

        const divSpinner = document.createElement('div');
        divSpinner.classList.add('sk-chase');

        divSpinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        `
        resultado.appendChild(divSpinner)
    }

    cleanTempeture() {
        while (resultado.firstChild) {
            resultado.firstChild.remove();
        }
    }

    cleanUbication() {
        while (ubicationDiv.firstChild) {
            ubicationDiv.firstChild.remove();
        }
    }
    cleanForm() {
            cityInput.value = '';
            countryInput.value = '';
    }
}

export default UI;
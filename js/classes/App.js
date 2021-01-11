import {loadData, loadCountries, dataValidation} from '../funciones.js'
import {form, select} from "../selectores.js"

class App{

    constructor(){
        this.initApp();
    }

    initApp(){
        document.addEventListener('DOMContentLoaded', ()=>{
            loadCountries(select);
            loadData();
        })
        form.addEventListener('submit', dataValidation)
    }

}

export default App;
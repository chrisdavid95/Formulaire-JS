"use strict";


/****************Déclaration des variables****************** */
var form, result, resetLocalStorage;
const formInputs = {}
const formData = {}

/****************Déclaration des fonctions****************** */

function getData() {
    formData.lastName = formInputs.lastName.value
    formData.firstName = formInputs.firstName.value
    formData.sexe = formInputs.sexe.value
}

function displayData() {
   
    result.innerHTML = ""
    var ul = document.createElement("ul")
    var li;

    for (var i in formData) {
        li = document.createElement('li')
        li.innerText = formData[i]
        ul.appendChild(li)
    }
    result.appendChild(ul)
}

function displayDefaultData()
{
    if(localStorage.getItem('infos') != null)
    {
        const dataJson = JSON.parse(localStorage.getItem('infos'))
        
        formData.lastName = dataJson.lastName
        formData.firstName = dataJson.firstName
        formData.sexe = dataJson.sexe
        displayData()
    }
}
function saveData(){
    // convertir formData => string
    const formDataString = JSON.stringify(formData);
    // stockage dans le localStorage
    localStorage.setItem('infos', formDataString)
}

function main(event) {
    event.preventDefault()
    
    // récupérer les valeur 
    getData()

    //Sauvgarder les infos dans le localStorage 
    saveData();
    // affichage 
    displayData()

    // réinitialiser (vider) le contenu du formulaire
    form.reset()
}


/************************Exécution************************** */
document.addEventListener('DOMContentLoaded', function () {
    /************ Traitement ici ************/

    // sélectionner le formulaire
    form = document.querySelector('form')
    // sélectionner l'emplacement de l'affichage
    result = document.getElementById('result')
    // sélectionner les input
    formInputs.lastName = document.getElementById("lastName")
    formInputs.firstName = document.getElementById("firstName")
    formInputs.sexe = document.getElementById("sexe")

    resetLocalStorage = document.querySelector('.btn.btn-success')
    // récupération des données sauvgardées
    displayDefaultData()
    
    
    //Ajouter un écouteur d'évennement sur le formulaire
    form.addEventListener('submit', main)
    resetLocalStorage.addEventListener('click', function(){
        // vider le contenu du localstorage
        //localStorage.removeItem('infos')
        localStorage.clear()

        result.innerHTML = ""
    })


})
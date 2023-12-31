'use strict'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function addClassHide(elemnt) {
    document.querySelector(`.${elemnt}`).classList.add('hide')
}

function removeClassHide(elemnt) {
    document.querySelector(`.${elemnt}`).classList.remove('hide')
}
'use strict'

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListenrs()
}

function renderGallery() {
    const imgs = getImgForGallery()
    const strHtmls = imgs.map(img => `<img data-id="${img.id}" src="Img/${img.id}.jpg" onclick="onSelectMemeImg(this)" alt="">`)
    const elGalleryContainer = document.querySelector('.gallery-img')
    elGalleryContainer.innerHTML = strHtmls.join('')
}

function onSelectMemeImg(elImg) {
    const id = +elImg.dataset.id
    setImgIdSeleted(id)
    setPassingToMemeDesign()
    onSetDefualtFeatures()
    renderMeme()
}

function onSetDefualtFeatures() {
    setDefaultLineDesign()
    onSetColorDefault()
    const elTxt = document.querySelector('.txt-input')
    elTxt.value = ''
}

function setPassingToMemeDesign() {
    addClassHide('gallery-container')
    removeClassHide('meme-editor')
}

function onRandomPickImg() {
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(1, imgs.length)
    setImgIdSeleted(randNum)
    setPassingToMemeDesign()
    renderMeme()
}

function backToGallery() {
    removeClassHide('gallery-container')
    addClassHide('meme-editor')
    onSetDefualtFeatures()
}

function onGalleryLinkClick(ev) {
    ev.preventDefault()
    removeClassHide('gallery-container')
    addClassHide('meme-editor')
}

function onSetColorDefault() {
    document.querySelector('.bgc').value = '#ffffff'
    document.querySelector('.txt').value = '#000000'
}

function onFilterClick(filterValue) {
    setFilter(filterValue)
    renderGallery()
}

function onClearFIlter() {
    document.querySelector('.filter').value = ''
    setFilter('')
    renderGallery()
}


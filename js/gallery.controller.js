'use strict'

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addEventListenrs()
    // resizeCanvas()
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
    const elTxt = document.querySelector('.txt-input')
    elTxt.value = ''
}

function setPassingToMemeDesign() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.classList.add('hide')
    const elCanvasContainer = document.querySelector('.meme-editor')
    elCanvasContainer.classList.remove('hide')
}
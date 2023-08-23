'use strict'

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderGallery() {
    const imgs = getImgForGallery()
    const strHtmls = imgs.map(img => `<img data-id="${img.id}" src="Img/${img.id}.jpg" onclick="onSelectMemeImg(this)" alt="">`)
    const elGalleryContainer = document.querySelector('.galley-img')
    elGalleryContainer.innerHTML = strHtmls.join('')
}

function onSelectMemeImg(elImg) {
    const id = +elImg.dataset.id
    setImgIdSeleted(id)
    onSetDefualtFeatures()
    renderMeme()
}

function onSetDefualtFeatures() {
    setDefaultLineDesign()
    const elTxt = document.querySelector('.txt-input')
    elTxt.value = ''
}
'use strict'

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListenrs()
    onUpdateFontSize()
}

function renderGallery() {
    const imgs = getImgForGallery()
    const strHtmls = imgs.map(img => `<img data-id="${img.id}" src="Img/${img.id}.jpg" onclick="onSelectMemeImg(this)" alt="">`)
    const elGalleryContainer = document.querySelector('.gallery-img')
    elGalleryContainer.innerHTML = strHtmls.join('')
}


function onKeyWordClick(elKeyWord) {
    updateKeyWords(elKeyWord.innerText)
    onUpdateFontSize(elKeyWord.innerText)
}

function onUpdateFontSize(elKeyWord) {
    if (!elKeyWord) return
    const keyWordMap = getKeyWords()
    document.querySelector(`.${elKeyWord}`).style.fontSize = `${keyWordMap[elKeyWord]}px`
}

function onSelectMemeImg(elImg) {
    const id = +elImg.dataset.id
    setImgIdSelected(id)
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
    removeClassHide('meme-editor')
    addClassHide('gallery-container')
    addClassHide('savedImgContainer')
}

function onRandomPickImg() {
    const imgs = getImgs()
    const randNum = getRandomIntInclusive(1, imgs.length)
    setImgIdSelected(randNum)
    setPassingToMemeDesign()
    renderMeme()
}

function backToGallery() {
    removeClassHide('gallery-container')
    addClassHide('meme-editor')
    addClassHide('savedImgContainer')
    onSetDefualtFeatures()
}

function onGalleryLinkClick(ev) {
    ev.preventDefault()
    removeClassHide('gallery-container')
    addClassHide('meme-editor')
    addClassHide('savedImgContainer')
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


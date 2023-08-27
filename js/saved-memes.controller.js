'use strict'

function onSavedImgGallery(ev) {
    ev.preventDefault()
    showOnlySavedImg()
    renderSavedMeme()
}

function renderSavedMeme() {
    const savedMemeToDisplay = getSavedImgs()
    if (!savedMemeToDisplay) showNoSavedImgsMsg()
    else showSavedImgs(savedMemeToDisplay)
}

function showSavedImgs(savedMemeToDisplay) {
    const strHtmls = savedMemeToDisplay.map(imgSaved => `
    <img data-id="${imgSaved.selectedImgId}" src="${imgSaved.previewMeme}" onclick="onSavedImgClick(this)" alt="" >`)
    document.querySelector('.savedImgGallery').innerHTML = strHtmls.join('')
}

function showNoSavedImgsMsg() {
    const strHtml = `<img class="noImgMeme" src="Img/zeroSavedMeme.jpg" alt="">`
    document.querySelector('.savedImgGallery').innerHTML = strHtml
}

function onSavedImgClick(elSavedImg) {
    const savedMemeToDisplay = getSavedImgs()
    const id = +elSavedImg.dataset.id
    const idx = findMemeIdx(savedMemeToDisplay, id)
    updateGmeme(savedMemeToDisplay[idx])
    setPassingToMemeDesign()
    OnsetTxtWhenSwitchLine()
    renderMeme()
}

function findMemeIdx(savedImgs, id) {
    const idx = savedImgs.findIndex(savedImg => savedImg.selectedImgId === id)
    return idx
}

function OnNewImgSave() {
    const savedImg = gElCanvas.toDataURL('image/jpg')
    savedMemeDataUrl(savedImg)
    renderSavedMeme()
}

function showOnlySavedImg() {
    removeClassHide('savedImgContainer')
    addClassHide('gallery-container')
    addClassHide('meme-editor')
}
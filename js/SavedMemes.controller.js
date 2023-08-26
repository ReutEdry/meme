'use strict'
renderSavedImgs()

function renderSavedImgs() {
    const imgs = getSavedImgs()
    if (!imgs) {
        var strHtmls = `<h1>THERE ARE NO SAVED IMGS</h1>`
    } else {
        strHtmls = `<img data-id="${imgs.id}" src="Img/${imgs.id}.jpg" onclick="onSelectMemeImg(this)" alt="">`
    }
    const elImgsContainer = document.querySelector('.savedImgContainer')
    elImgsContainer.innerHTML = strHtmls
}

function onSavedImgGaller(ev) {
    ev.preventDefault()
    showOnlySavedImg()
    // renderSavedImgs()
}

function OnSaveImg() {
    saveImg()

}

function showOnlySavedImg() {
    const elImgsContainer = document.querySelector('.my-memes')
    elImgsContainer.classList.remove('hide')
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.classList.add('hide')
    const elCanvasContainer = document.querySelector('.meme-editor')
    elCanvasContainer.classList.add('hide')

}
'use strict'

function onSavedImgGallery(ev) {
    ev.preventDefault()
    showOnlySavedImg()
    rendrImgsToMyMemes()
}

function rendrImgsToMyMemes() {
    const imgs = getSavedImgs()
    console.log(imgs)
    let reader = new FileReader()
    const strHtmls = imgs.map(img => `<img data-id="${img.gId}" src="Img/${img.url}.jpg" onclick="onSelectMemeImg(this)" alt="">`)
    console.log(strHtmls)
    const elGalleryContainer = document.querySelector('.savedImgContainer')
    elGalleryContainer.innerHTML = strHtmls.join('')

}

function OnnewImgSave() {
    const savedImg = gElCanvas.toDataURL('image/jpg')
    newImgSave(savedImg)
    rendrImgsToMyMemes()
}


function showOnlySavedImg() {
    removeClassHide('my-memes')
    addClassHide('gallery-container')
    addClassHide('meme-editor')
}
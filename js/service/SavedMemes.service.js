'use strict'

const SAVED_IMGS_KEY = 'savedImgsDB'
let gImgsSaved = []

function getSavedImgs() {
    const gImgsSaved = loadFromStorage(SAVED_IMGS_KEY)
    return gImgsSaved
}

function saveImg() {
    const savedImgs = getImg()
    console.log(savedImgs)
    console.log()
    gImgsSaved.push(savedImgs)
    saveToStorage(SAVED_IMGS_KEY, savedImgs)
}

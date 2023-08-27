'use strict'

const SAVED_IMGS_KEY = 'savedImgsDB'
let gSavedImgs
let gId = 100
_newImgSavesInGlobal()

function getSavedImgs() {
    return gSavedImgs
}

function _newImgSavesInGlobal() {
    gSavedImgs = loadFromStorage(SAVED_IMGS_KEY)
    if (!gSavedImgs || !gSavedImgs.length) {
        gSavedImgs = [
            _createSavedImg('zeroSavedMeme.jpg')
        ]
    }
    saveToStorage(SAVED_IMGS_KEY, gSavedImgs)
}

function _createSavedImg(url) {
    return {
        gId: gId++,
        url
    }
}

function newImgSave(imgSaved) {
    const newImageSaved = _createSavedImg(imgSaved)
    gSavedImgs.unshift(newImageSaved)
    saveToStorage(SAVED_IMGS_KEY, gSavedImgs)
    return newImageSaved
}

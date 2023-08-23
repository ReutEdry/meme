'use strict'

var gImgs = [
    { id: 1, url: 'Img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'Img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'Img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'Img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'Img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'Img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'Img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'Img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'Img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'Img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'Img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'Img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'Img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'Img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'Img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'Img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'Img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'Img/18.jpg', keywords: ['funny', 'cat'] },
]

function getImgForGallery() {
    return gImgs
}

function getImg() {
    // return gImgs[--gMeme.selectedImgId]
    const img = gImgs.find(img => img.id === gMeme.selectedImgId)
    return img
}



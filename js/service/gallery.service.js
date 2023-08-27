'use strict'


let gFilter
let gImgs = [
    { id: 1, url: 'Img/1.jpg', keywords: ['funny', 'Political'] },
    { id: 2, url: 'Img/2.jpg', keywords: ['funny', 'Animal'] },
    { id: 3, url: 'Img/3.jpg', keywords: ['funny', 'Baby', 'Animal'] },
    { id: 4, url: 'Img/4.jpg', keywords: ['funny', 'Animal'] },
    { id: 5, url: 'Img/5.jpg', keywords: ['funny', 'Baby'] },
    { id: 6, url: 'Img/6.jpg', keywords: ['funny', 'Tv'] },
    { id: 7, url: 'Img/7.jpg', keywords: ['funny', 'Baby'] },
    { id: 8, url: 'Img/8.jpg', keywords: ['funny', 'Tv'] },
    { id: 9, url: 'Img/9.jpg', keywords: ['funny', 'Baby'] },
    { id: 10, url: 'Img/10.jpg', keywords: ['funny', 'Political'] },
    { id: 11, url: 'Img/11.jpg', keywords: ['funny', 'Tv'] },
    { id: 12, url: 'Img/12.jpg', keywords: ['funny', 'Tv'] },
    { id: 13, url: 'Img/13.jpg', keywords: ['funny', 'Tv'] },
    { id: 14, url: 'Img/14.jpg', keywords: ['funny', 'Tv'] },
    { id: 15, url: 'Img/15.jpg', keywords: ['funny', 'Tv'] },
    { id: 16, url: 'Img/16.jpg', keywords: ['funny', 'Tv'] },
    { id: 17, url: 'Img/17.jpg', keywords: ['funny', 'Political'] },
    { id: 18, url: 'Img/18.jpg', keywords: ['funny', 'Tv'] },
]

function getImgs() {
    return gImgs
}

function getImgForGallery() {
    var imgs = gImgs.filter(img => {
        if (!gFilter) return img
        return (img.keywords.includes(gFilter))
    })
    return imgs
}

function getImg() {
    // return gImgs[--gMeme.selectedImgId]
    const img = gImgs.find(img => img.id === gMeme.selectedImgId)
    return img
}

function setFilter(filterValue) {
    if (filterValue !== undefined) gFilter = filterValue
    return gFilter
}



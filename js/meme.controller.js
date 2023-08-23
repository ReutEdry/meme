'use strict'

let gElCanvas
let gCtx
let gImgById

function renderMeme() {
    const meme = getMeme()
    const img = getImg()
    const elImg = new Image()
    elImg.src = img.url

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            onDrawTxt(line.x, line.y, line.txt, line.size, line.color)
        })
    }
}

function onDrawTxt(x, y, text, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyly = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function drawRect(x, y) {
    gCtx.strokeStyle = 'brown'
    gCtx.strokeRect(x, y, 120, 120)
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 120, 120)
}

function onAddLine() {
    addLine()
    renderMeme()
}

// function onxt(ev) {
//     console.log(ev.offsetX, ev.offsetY)
// }

function onSwitchLine() {
    setLineIdx()
    const elTxt = document.querySelector('.txt-input')
    elTxt.value = ''
}

function onInputVal(inpuVal) {
    setLineTxt(inpuVal)
    renderMeme()
}

function downloadImg(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onSetTextColor(clrVal) {
    setTxtColor(clrVal)
    renderMeme()
}

function onIncreaseFont() {
    setIncreaseFontSize()
    renderMeme()
}

function onDecreaseFont() {
    setDecreaseFontSize()
    renderMeme()
}

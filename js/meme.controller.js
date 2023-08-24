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
            drawRect(line.x, line.y, line.txt, line.isEditable)
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

function drawRect(x, y, text, isEditable) {
    if (!isEditable) return
    const txtMeasure = gCtx.measureText(text)
    const bounds = {
        top: y - txtMeasure.actualBoundingBoxAscent,
        right: x + txtMeasure.actualBoundingBoxRight,
        bottom: y + txtMeasure.actualBoundingBoxDescent,
        left: x - txtMeasure.actualBoundingBoxLeft
    }

    const width =
        Math.abs(txtMeasure.actualBoundingBoxLeft) +
        Math.abs(txtMeasure.actualBoundingBoxRight)
    console.log(width)
    onSaveTextWidth(width)
    const height =
        Math.abs(txtMeasure.actualBoundingBoxAscent) +
        Math.abs(txtMeasure.actualBoundingBoxDescent)

    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = "rgba(0, 0, 200, 0)"
    gCtx.strokeRect(bounds.left, bounds.top, width, height)
    gCtx.fillRect(bounds.left, bounds.top, width, height)
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
    renderMeme()
}

function onInputVal(inpuVal) {
    setLineTxt(inpuVal)
    renderMeme()
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

function preperDownLoad() {
    const memes = getMeme()
    memes.lines.forEach(meme => {
        meme.isEditable = false
    })
    renderMeme()
}

function downloadImg(elLink) {
    preperDownLoad()
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onSaveTextWidth(width) {
    saveTextWidth(width)
}


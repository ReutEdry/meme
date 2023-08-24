'use strict'

let gElCanvas
let gCtx
let gImgById
let gStartPos
// let gIsDownloadReady = false

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

function onCanvasClick(ev) {
    console.log(ev.offsetX, ev.offsetY)
    const pos = {

        x: ev.offsetX,
        y: ev.offsetY,

    }
    if (!isTextBoxClicked(pos)) return
    renderMeme()
}
function onSwitchLine() {
    setLineIdx()
    renderMeme()
}

// function addEventListenrs() {
//     addMouseEvents()
// }

// function addMouseEvents() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
// }



// function onDown(ev) {
// const pos = getEvPos(ev)
// console.log(pos)
// if (!isTextBoxClicked(pos)) return
// renderMeme()
// gStartPos = pos
// document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {

// const meme = getMeme()
// if (!meme.lines[meme.selectedLineIdx].isDragable) return

// const pos = getEvPos(ev)
// const dx = pos.x - gStartPos.x
// const dy = pos.y - gStartPos.y

// moveLine(dx, dy)
// gStartPos = pos

// renderMeme()
// }

// function onUp(ev) {
// console.log('onUp')
// setDragOff()
// }

// function getEvPos(ev) {
//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }
//     return pos
// }

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

function prepearDownLoad() {
    const memes = getMeme()
    memes.lines.forEach(meme => {
        meme.isEditable = false
        renderMeme()
    })
    gIsDownloadReady = true
}

function downloadImg(elLink) {
    prepearDownLoad()
    // setTimeout(() => {
    // if (gIsDownloadReady) {

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
    // }
    // }, 3000);
}

function onSaveTextWidth(width) {
    saveTextWidth(width)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


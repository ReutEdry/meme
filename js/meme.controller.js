'use strict'

let gElCanvas
let gCtx
let gImgById
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme() {
    const meme = getMeme()
    const img = getImg()
    const elImg = new Image()
    elImg.src = img.url

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach(line => {
            onDrawTxt(line.x, line.y, line.txt, line.size, line.bgClr, line.font, line.borderClr)
            drawRect(line.x, line.y, line.txt, line.isEditable)
        })
    }
}

function onDrawTxt(x, y, text, size, bgClr, font, borderClr) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = borderClr
    gCtx.fillStyle = bgClr
    gCtx.font = `${size}px ${font}`
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

function onSwitchLine() {
    setLineIdx()
    OnsetTxtWhenSwitchLine()
    renderMeme()
}

function OnsetTxtWhenSwitchLine() {
    const elInputTxt = document.querySelector('.txt-input')
    const txt = getCurrLineTxt()
    elInputTxt.value = txt
}

function addEventListenrs() {
    addMouseEvents()
    addTouchListeners()
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function addMouseEvents() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextBoxClicked(pos)) return
    OnsetTxtWhenSwitchLine()
    setDraginLine(true)
    renderMeme()
    gStartPos = pos
}

function onMove(ev) {

    const meme = getMeme()
    if (!meme.lines[meme.selectedLineIdx].isDragable) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)
    gStartPos = pos

    renderMeme()
}

function onUp() {
    setDraginLine(false)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onInputTxtVal(inpuVal) {
    setLineTxt(inpuVal)
    renderMeme()
}

function onSetBgcTextColor(clrVal) {
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

function onSaveTextWidth(width) {
    saveTextWidth(width)
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSetBorderTextColor(value) {
    SetBorderTextColor(value)
    renderMeme()
}

function onMoveLineDown() {
    moveLineDown()
    renderMeme()
}

function onMoveLineUp() {
    moveLineUp()
    renderMeme()
}

function onMoveLineRight() {
    moveLineRight()
    renderMeme()
}

function onMoveLineLeft() {
    moveLineLeft()
    renderMeme()
}

function onSetTextToMiddle() {
    setTextToMiddle()
    renderMeme()
}

function onSetTextToCenter() {
    setTextToCenter()
    renderMeme()
}

function onSetTextLeft() {
    setTextLeft()
    renderMeme()
}

function onSetTextRight() {
    setTextRight()
    renderMeme()
}

function onFontChange(fontVal) {
    setFontChange(fontVal)
    renderMeme()
}

function onStickerClick(elSticker) {
    addLine(elSticker.innerText)
    renderMeme()
}

// sharing on facebook
function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        console.log(url);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

// download
function prepearDownLoad() {
    setPrepearForDownLoad()
    renderMeme()
}

function downloadImg(elLink) {
    // prepearDownLoad()
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

// whatsapp
function shareToWattsup() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        console.log(url);
        window.open(`https://wa.me/?text=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}


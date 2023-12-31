'use strict'
const SAVED_IMGS_KEY = 'savedImgsDB'
let gSavedMemes = []
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        _createLine(45, 32, true),
        _createLine(45, 368)
    ],
    previewMeme: '',
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 10, 'political': 20, 'dog': 20 }

function getMeme() {
    return gMeme
}

function _createLine(x, y, isEditable = false, txt = 'Write something funny') {
    return {
        x,
        y,
        width: 281.4111328125,
        txt,
        size: 30,
        font: 'Impact',
        bgClr: 'white',
        borderClr: 'black',
        isEditable,
        isDragable: false
    }
}

function setImgIdSelected(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(inputVal) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].txt = inputVal
}

function setTxtColor(clrVal) {
    gMeme.lines[gMeme.selectedLineIdx].bgClr = clrVal
}

function SetBorderTextColor(clrVal) {
    gMeme.lines[gMeme.selectedLineIdx].borderClr = clrVal
}

function setDefaultLineDesign() {
    gMeme.lines = [
        _createLine(45, 32, true),
        _createLine(45, 368)
    ]
    gMeme.selectedLineIdx = 0
}

function setIncreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 7
}

function setDecreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 7
}

function addLine(sticker) {
    if (!sticker) gMeme.lines.push(_createLine(45, 210, true))
    else gMeme.lines.push(_createLine(45, 210, true, sticker))
    gMeme.lines[gMeme.selectedLineIdx].isEditable = false
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setLineIdx() {
    gMeme.selectedLineIdx++
    let { selectedLineIdx, lines } = gMeme
    if (selectedLineIdx === lines.length) {
        lines[selectedLineIdx - 1].isEditable = false
        gMeme.selectedLineIdx = 0
        lines[0].isEditable = true
    } else {
        lines[0].isEditable = false
        lines[selectedLineIdx].isEditable = true
        lines[selectedLineIdx - 1].isEditable = false
    }
}

function saveTextWidth(txtWidth) {
    gMeme.lines[gMeme.selectedLineIdx].width = txtWidth
}

function isTextBoxClicked(pos) {
    const clickedLine = gMeme.lines.find(line => {
        return pos.x >= line.x && pos.x <= line.x + line.width
            && pos.y >= (line.y - (0.5 * line.size)) && pos.y <= (line.y + (0.5 * line.size))
    })

    if (!clickedLine) {
        return false
    } else {
        findLineIdx(clickedLine)
        return true
    }
}

function findLineIdx(lineClicked) {
    const idx = gMeme.lines.findIndex(line => {
        return lineClicked.x === line.x && lineClicked.y === line.y
    })
    gMeme.selectedLineIdx = idx

    gMeme.lines.forEach(line => {
        line.isEditable = false
    })
    gMeme.lines[gMeme.selectedLineIdx].isEditable = true
}

function setDraginLine(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDragable = isDrag
}

function moveLine(dx, dy) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.x += dx
    line.y += dy
}

function deleteLine() {
    gMeme.lines.forEach((line, idx) => {
        if (line.isEditable) {
            gMeme.lines.splice(idx, 1)
        }
    })
    if (!gMeme.lines.length) return
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
    gMeme.lines[gMeme.selectedLineIdx].isEditable = true
}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].y += 10
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}

function moveLineRight() {
    gMeme.lines[gMeme.selectedLineIdx].x += 10

}

function moveLineLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x -= 10

}

function setTextToMiddle() {
    gMeme.lines[gMeme.selectedLineIdx].y = 200
    gMeme.lines[gMeme.selectedLineIdx].x = 200 - (gMeme.lines[gMeme.selectedLineIdx].width / 2)
}

function setTextToCenter() {
    gMeme.lines[gMeme.selectedLineIdx].x = 200 - (gMeme.lines[gMeme.selectedLineIdx].width / 2)
}

function setTextLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x = 10
}

function setTextRight() {
    gMeme.lines[gMeme.selectedLineIdx].x = 390 - (gMeme.lines[gMeme.selectedLineIdx].width)
}

function setFontChange(fontVal) {
    // i did not do !fontVal because i wanted to know if it is an 
    // empty string
    if (fontVal === undefined) fontVal = 'Impact'
    gMeme.lines[gMeme.selectedLineIdx].font = fontVal
}

function getCurrLineTxt() {
    if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Write something funny') {
        var textLine = ''
    } else {
        var textLine = gMeme.lines[gMeme.selectedLineIdx].txt
    }
    return textLine
}

function getSavedImgs() {
    gSavedMemes = loadFromStorage(SAVED_IMGS_KEY)
    return gSavedMemes
}

function savedMemeDataUrl(savedMeme) {
    console.log(savedMeme)
    gMeme.previewMeme = savedMeme
    gSavedMemes.push(gMeme)
    saveToStorage(SAVED_IMGS_KEY, gSavedMemes)
}

function updateGmeme(newGmeme) {
    gMeme = newGmeme
}

function setPrepearForDownLoad() {
    gMeme.lines[gMeme.selectedLineIdx].isEditable = false
}

function getKeyWords() {
    return gKeywordSearchCountMap
}

function updateKeyWords(elKeyWord) {
    gKeywordSearchCountMap[elKeyWord]++
}
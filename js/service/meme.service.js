'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        _createLine(45, 32, true),
        _createLine(45, 368)
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function _createLine(x, y, isEditable = false) {

    return {
        x,
        y,
        txt: 'Write something funny',
        size: 30,
        color: 'white',
        isEditable,
        // width
    }
}

function setImgIdSeleted(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(inputVal) {
    gMeme.lines[gMeme.selectedLineIdx].txt = inputVal
}

function setTxtColor(clrVal) {
    gMeme.lines[gMeme.selectedLineIdx].color = clrVal
}

function setDefaultLineDesign() {
    gMeme.lines = [
        _createLine(45, 32, true),
        _createLine(45, 368)
    ]
}

function setIncreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 7
}

function setDecreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 7
}

function addLine() {
    gMeme.lines.push(_createLine(45, 210))
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

function saveTextWidth(width) {
    console.log(width)
    return width
}
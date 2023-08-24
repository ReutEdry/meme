'use strict'

let gMeme = {
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
        width: 281.4111328125,
        isDragable: false
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
    gMeme.lines[gMeme.selectedLineIdx].width = width
}

function isTextBoxClicked(pos) {

    const clickedLine = gMeme.lines.find(line => {
        return pos.x >= line.x && pos.x <= line.x + line.width
            && pos.y >= line.y && pos.y <= line.y + line.size
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
    gMeme.lines[idx].isEditable = true
    // setDraginLine(true, idx)
}

// function setDraginLine(isDrag, idx) {
//     gMeme.lines[idx].isDragable = isDrag
// }

// function moveLine(dx, dy) {
//     let { x, y } = gMeme.lines[gMeme.selectedLineIdx]
//     x += dx
//     y += dy
// }

// function setDragOff() {
//     gMeme.lines[gMeme.selectedLineIdx].isDragable = false

// }




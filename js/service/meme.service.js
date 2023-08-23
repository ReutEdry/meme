'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            x: 45,
            y: 32,
            txt: 'Write something funny',
            size: 30,
            color: 'white'
        },
        {
            x: 45,
            y: 368,
            txt: 'Write something funny',
            size: 30,
            color: 'white'
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
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
    gMeme.lines.forEach(line => {
        line.txt = 'Write something funny'
        line.color = 'white'
        line.size = 30
    })
}

function setIncreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 7
}

function setDecreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 7
}

function addLine() {
    gMeme.lines.push({
        x: 45,
        y: 210,
        txt: 'Write something funny',
        size: 30,
        color: 'white'
        ,
    })
}

function setLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}
'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt:"", size: 30, color: '#rrggbb', fontFamily: 'Ariel', x: 0, y: 40 },
        ]
}

function getMeme() {
    return gMeme
}
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function addLine() {
    // Define a line height to space lines evenly
    const lineHeight = 50
    const newY = gMeme.lines.length * lineHeight
    const newLine = { txt: 'New Text', size: 20, color: 'black', x: 0, y: newY }
    gMeme.lines.push(newLine)
    // Set the new line as the selected line
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font
}



'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gSelectedLineIdx = null
let gStartPos = null
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    // document.getElementById('meme-canvas').addEventListener('click', onCanvasClick)
    updateControls()
    renderMeme()
    resizeCanvas()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    const meme = getMeme()
    const selectedImg = gImgs.find(img => img.id === meme.selectedImgId)
    if (!selectedImg) return
    const img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        // Clear the canvas
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        // Draw the image on the canvas
        gElCanvas.height = (img.height / img.width) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // Draw the text on top of the image
        drawFrame()
    }
}
function drawFrame() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px ${line.fontFamily}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.textAlign
        const x = line.x ? line.x : gElCanvas.width / 2
        // Calculate y to place the line on canvas and spaces between lines
        const y = line.y ? line.y : gElCanvas.height / (meme.lines.length + 1) * (idx + 1)
        // Draw the text
        gCtx.fillText(line.txt, x, y)

        // Calculate the width and height of the text
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size
        textSize(textWidth,textHeight)

        // Draw frame around selected line
        if (idx === meme.selectedLineIdx && line.txt !== "") {
            const padding = 5
            gCtx.strokeStyle = 'white'
            gCtx.lineWidth = 2

            let frameX
            switch (line.textAlign) {
                case 'left':
                    frameX = x - padding
                    break
                case 'right':
                    frameX = x - textWidth - padding
                    break
                case 'center':
                default:
                    frameX = x - textWidth / 2 - padding
                    break
            }

            gCtx.strokeRect(frameX, y - textHeight, textWidth + (2 * padding), textHeight + padding)
        }
    })

}

function onChangeMemeText() {
    const textInput = document.getElementById('meme-text-input').value
    setLineTxt(textInput)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 10
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('img/jpeg')
    elLink.href = imgContent
}

function onChangeFillColor() {
    const elFillColor = document.querySelector('input[name="fill-color"]').value
    setLineColor(elFillColor)
    renderMeme()
}

function onChangeFontFamily() {
    const elFontFamily = document.querySelector('.font-family-select').value
    setFontFamily(elFontFamily)
    renderMeme()
}

function onChangeTextAlign(textAlign) {
    changeTextAlign(textAlign)
    renderMeme()
}

function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}

function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function OnSwitchLine() {
    switchLine()
    updateControls()
    renderMeme()
}

function OnMoveUp() {
    moveLineUp()
    renderMeme()
}

function onMoveDown() {
    moveLineDown()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    updateControls()
    renderMeme()
}

function updateControls() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    if (selectedLine) {
        document.getElementById('meme-text-input').value = selectedLine.txt
        document.querySelector('input[name="fill-color"]').value = selectedLine.color
        document.querySelector('.font-family-select').value = selectedLine.fontFamily
        document.querySelector('.font-size-controls').value = selectedLine.size
        document.querySelector('.text-align-controls').value = selectedLine.textAlign || 'center'
    }
}

function onCanvasClick(event) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const rect = gElCanvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const meme = getMeme()
    let lineFound = false

    meme.lines.forEach((line, idx) => {
        const textWidth = getTextWidth(line.txt, line.size, line.fontFamily)
        const textHeight = line.size

        const textX = gElCanvas.width / 2 - textWidth / 2
        const textY = line.y - textHeight / 2

        if (x >= textX && x <= textX + textWidth && y >= textY && y <= textY + textHeight) {
            setSelectedLineIdx(idx)
            updateControls()
            renderMeme()
            lineFound = true
        }
    })

    if (!lineFound) {
        console.log('Clicked outside of text lines')
    }
}

function getTextWidth(text, size, fontFamily) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = `${size}px ${fontFamily}`
    return context.measureText(text).width
}

function navigateToGallery() {
    document.querySelector('.meme-gallery').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
}

function onAddEmoji() {
    const emoji = document.querySelector('.emoji-select').value
    addEmoji(emoji)
    renderMeme()
}

function onCanvasMouseDown(ev) {
    const pos = getEvPos(ev)
    const clickedLineIdx = getClickedLineIdx(pos)
    if (clickedLineIdx !== -1) {
        gIsDragging = true
        gSelectedLineIdx = clickedLineIdx
        gStartPos = pos
    }
}

function onCanvasMouseMove(ev) {
    if (!gIsDragging) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onCanvasMouseUp() {
    gIsDragging = false
    gSelectedLineIdx = null
    gStartPos = null
}

function getEvPos(ev) {
    const { offsetX: x, offsetY: y } = ev
    return { x, y }
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onCanvasMouseDown)
    gElCanvas.addEventListener('mousemove', onCanvasMouseMove)
    gElCanvas.addEventListener('mouseup', onCanvasMouseUp)
}





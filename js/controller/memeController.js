'use strict'

let gElCanvas
let gCtx

function addListeners() {
    // Add event listener to the text input
    const textInput = document.getElementById('meme-text-input')
    textInput.addEventListener('input', (event) => {
        setLineTxt(event.target.value)
        renderMeme()
    })
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
    const meme = getMeme()
    const selectedImg = gImgs.find(img => img.id === meme.selectedImgId)
    if (!selectedImg) return
    const img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        // Clear the canvas
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        // Draw the image on the canvas
        gElCanvas.height = (img.width / img.height) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // Draw the text on top of the image
        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.fontFamily}`
            gCtx.fillStyle = line.color
            gCtx.textAlign = 'center'
            // Calculate y to place the line on canvas and spaces between lines
            const y = line.y ? line.y : gElCanvas.height / (meme.lines.length + 1) * (idx + 1)
            gCtx.fillText(line.txt, gElCanvas.width / 2, y)
            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            // Store position and size in the line object
            // line.x = (gElCanvas.width / 2) - (textWidth / 2)
            // line.y = y - textHeight
            // line.width = textWidth
            // line.height = textHeight

            // 9Draw frame around selected line
            if ((idx === meme.selectedLineIdx && line.txt != "")) {
                const padding = 10
                const textHeight = line.size
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 2
                gCtx.strokeRect((gElCanvas.width / 2) - (textWidth / 2) - padding, y - line.size, textWidth + (2 * padding), textHeight + padding)
            }
        })
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 20
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

// function onChangeTextAlign(textAlign) {
//     const meme = getMeme()
//     const selectedLine = meme.lines[meme.selectedLineIdx]
//     if (selectedLine) {
//         selectedLine.textAlign = textAlign
//         renderMeme()
//     }
// }

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

function updateControls() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    if (selectedLine) {
        document.getElementById('meme-text-input').value = selectedLine.txt
        document.querySelector('input[name="fill-color"]').value = selectedLine.color
        // document.querySelector('.font-family-select').value = 'Arial'
        document.querySelector('.font-size-controls').value = selectedLine.size
        document.querySelector('.text-align-controls').value = selectedLine.textAlign || 'center'
    }
}

function onCanvasClick(event) {
    const canvas = document.querySelector('canvas')
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const meme = getMeme()
    var lineFound = false
    meme.lines.forEach((line, idx) => {
        if (x >= line.x && x <= line.x + line.width && y >= line.y && y <= line.y + line.height) {
            setSelectedLineIdx(idx)
            updateControls()
            renderMeme()
            lineFound = true
        }
    })
}

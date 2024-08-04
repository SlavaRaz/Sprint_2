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
    renderMeme()
    resizeCanvas()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
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
        // gElCanvas.height = (gElCanvas.width / gElCanvas.height) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // Draw the text on top of the image
        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.textAlign = 'center'
            // Calculate y to place the line on canvas and spaces between lines
            const y = line.y ? line.y : gElCanvas.height / (meme.lines.length + 1) * (idx + 1)
            gCtx.fillText(line.txt, gElCanvas.width / 2, y)
            const textWidth = gCtx.measureText(line.txt).width

            // Draw frame around selected line
            if (idx === meme.selectedLineIdx) {
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
    renderMeme()
}

function onCanvasClick(event) {
    const canvas = document.querySelector('canvas')
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const meme = getMeme()
    let lineFound = false
    meme.lines.forEach((line, idx) => {
        if (x >= line.x && x <= line.x + line.width && y >= line.y && y <= line.y + line.height) {
            setSelectedLineIdx(idx)
            renderMeme()
            lineFound = true
        }
    })
}

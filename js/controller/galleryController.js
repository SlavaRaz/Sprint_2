'use strict'


function onInit() {
    renderGallery()
}

function renderGallery(images = gImgs) {
    const elMemeGallery = document.querySelector('.meme-gallery')
    elMemeGallery.innerHTML = ''
    images.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
        imgElement.alt = img.keywords.join(', ')
        imgElement.classList.add('gallery-img')
        imgElement.addEventListener('click', () => onImgSelect(img.id))
        elMemeGallery.appendChild(imgElement)
    })
}

function onImgSelect(imgId) {
    setImg(imgId)
    addListeners()
    switchToEditor()
}

function onRandomMeme() {
    const randomImg = getRandomImage()
    setImg(randomImg.id)
    const randomText = 'Random Meme Text'
    setLineTxt(randomText)
    switchToEditor()
    renderMeme()
}

function switchToEditor() {
    document.querySelector('.meme-gallery').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
}

function onSearchImages() {
    const searchInput = document.querySelector('.search-keyword').value
    const filteredImgs = gImgs.filter(img => {
        return img.keywords.some(keyword => keyword.includes(searchInput))
    })
    console.log(filteredImgs)
    renderGallery(filteredImgs)
}



'use strict'


function onInit() {
    renderGallery()
}

function renderGallery() {
    const elMemeGallery = document.querySelector('.meme-gallery')
    gImgs.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
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

function switchToEditor() {
    document.querySelector('.meme-gallery').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
}

function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('div[id]').forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}
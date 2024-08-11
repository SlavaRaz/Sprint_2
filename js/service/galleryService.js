'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'tramp'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['babby', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'sleep'] },
    { id: 5, url: 'img/5.jpg', keywords: ['boy', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['boy', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['man', 'hat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['smile', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama', 'laughing'] },
    { id: 11, url: 'img/11.jpg', keywords: ['play', 'friend'] },
    { id: 12, url: 'img/12.jpg', keywords: ['explaine', 'glasses'] },
    { id: 13, url: 'img/13.jpg', keywords: ['leonardo', 'drink'] },
    { id: 14, url: 'img/14.jpg', keywords: ['matrix', 'film'] },
    { id: 15, url: 'img/15.jpg', keywords: ['cool', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['laughing', 'film'] },
    { id: 17, url: 'img/17.jpg', keywords: ['explaine', 'two'] },
    { id: 18, url: 'img/18.jpg', keywords: ['cartoon', 'toy'] },
    ]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMemeGallery() {
    return gImgs
}

function getImgs() {
    return gImgs
}

function getRandomImage() {
    const imgs = getImgs()
    const randomIndex = Math.floor(Math.random() * imgs.length)
    return imgs[randomIndex]
}


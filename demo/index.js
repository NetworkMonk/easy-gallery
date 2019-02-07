(function() {
    'use strict';

    var galleryImages = [
        {src: 'img/01.jpg'},
        {src: 'img/02.jpg'},
        {src: 'img/03.jpg'},
        {src: 'img/04.jpg'},
        {src: 'img/05.jpg'},
        {src: 'img/06.jpg'},
    ];

    var gallery = new EasyGallery({
        targetElement: document.getElementsByClassName('gallery-display').item(0),
        imageList: galleryImages,
    });
}());
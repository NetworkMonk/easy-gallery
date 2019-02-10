(function() {
    'use strict';

    var galleryImages = [
        {src: 'img/01.jpg'},
        {src: 'img/02.jpg'},
        {src: 'img/03.jpg'},
        {src: 'img/04.jpg'},
        {src: 'img/05.jpg'},
        {src: 'img/06.jpg'},
        {src: 'img/07.jpg'},
        {src: 'img/08.jpg'},
        {src: 'img/09.jpg'},
        {src: 'img/10.jpg'},
        {src: 'img/11.jpg'},
        {src: 'img/12.jpg'},
        {src: 'img/13.jpg'},
        {src: 'img/14.jpg'},
        {src: 'img/15.jpg'},
        {src: 'img/16.jpg'},
        {src: 'img/17.jpg'},
    ];

    new EasyGallery({
        targetElement: document.getElementsByClassName('gallery-display').item(0),
        imageList: galleryImages,
    });
}());
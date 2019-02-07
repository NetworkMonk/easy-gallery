
class EasyGalleryPopup {
    constructor(gallery) {
        this.gallery = gallery;
        this.selectedImage = 0;
    }

    createPopup() {
        // Check to see if the popup has already been created
        if (this.gallery.context.getElementsByClassName('easy-gallery-popup').length > 0) {
            return;
        }

        var popupBack = this.gallery.context.createElement('div');
        popupBack.classList.add('easy-gallery-popup');
        popupBack.style.position = 'fixed';
        popupBack.style.top = '0';
        popupBack.style.left = '0';
        popupBack.style.right = '0';
        popupBack.style.bottom = '0';
        popupBack.style.opacity = '0';
        popupBack.style.zIndex = '1050';
        popupBack.style.backgroundColor = 'rgba( 0, 0, 0, 0.75 )';
        popupBack.style.transitionDuration = '1s';
        popupBack.style.transitionProperty = 'opacity';
        
        this.gallery.context.body.appendChild(popupBack);

        setTimeout(function() {
            popupBack.style.opacity = '1';
        }, 16);


        var popupImgContainer = this.gallery.context.createElement('div');
        popupImgContainer.classList.add('easy-gallery-popup-image');
        popupImgContainer.style.position = 'absolute';
        popupImgContainer.style.top = '3rem';
        popupImgContainer.style.left = '0';
        popupImgContainer.style.right = '0';
        popupImgContainer.style.bottom = '3rem';
        popupBack.appendChild(popupImgContainer);


        // Create popup close button
        var popupClose = this.gallery.context.createElement('div');
        popupClose.innerHTML = '<i class="fas fa-fw fa-times"></i>';
        popupClose.style.position = 'absolute';
        popupClose.style.top = '0.5rem';
        popupClose.style.right = '0.5rem';
        popupClose.style.color = '#fff';
        popupClose.style.cursor = 'pointer';
        popupClose.style.opacity = '0.4';
        popupClose.style.transitionDuration = '.2s';
        popupClose.style.transitionProperty = 'opacity';
        popupClose.style.fontSize = '1.6rem';
        popupClose.addEventListener('mouseenter', function() {
            this.style.opacity = '1.0';
        });
        popupClose.addEventListener('mouseleave', function() {
            this.style.opacity = '0.4';
        });
        popupBack.appendChild(popupClose);
        popupClose.addEventListener('click', () => this.closePopup());


        // Create controls container
        var popupControlsContainer = this.gallery.context.createElement('div');
        popupControlsContainer.style.position = 'absolute';
        popupControlsContainer.style.bottom = '0.5rem';
        popupControlsContainer.style.left = '0';
        popupControlsContainer.style.right = '0';
        popupControlsContainer.style.color = '#fff';
        popupControlsContainer.style.fontSize = '1.6rem';
        popupBack.appendChild(popupControlsContainer);

        var popupControls = this.gallery.context.createElement('div');
        popupControls.style.marginLeft = 'auto';
        popupControls.style.marginRight = 'auto';
        popupControls.style.maxWidth = '50rem';
        popupControls.style.textAlign = 'center';
        popupControlsContainer.appendChild(popupControls);

        var controlLeft = this.gallery.context.createElement('div');
        controlLeft.innerHTML = '<i class="fas fa-fw fa-chevron-left"></i>';
        controlLeft.style.display = 'inline-block';
        controlLeft.style.width = '25%';
        controlLeft.style.color = '#fff';
        controlLeft.style.cursor = 'pointer';
        controlLeft.style.opacity = '0.4';
        controlLeft.style.transitionDuration = '.2s';
        controlLeft.style.transitionProperty = 'opacity';
        controlLeft.style.fontSize = '1.6rem';
        controlLeft.style.textAlign = 'center';
        controlLeft.addEventListener('mouseenter', function() {
            this.style.opacity = '1.0';
        });
        controlLeft.addEventListener('mouseleave', function() {
            this.style.opacity = '0.4';
        });
        popupControls.appendChild(controlLeft);
        controlLeft.addEventListener('click', () => this.previousImage());
    
        var controlRight = this.gallery.context.createElement('div');
        controlRight.innerHTML = '<i class="fas fa-fw fa-chevron-right"></i>';
        controlRight.style.display = 'inline-block';
        controlRight.style.width = '25%';
        controlRight.style.color = '#fff';
        controlRight.style.cursor = 'pointer';
        controlRight.style.opacity = '0.4';
        controlRight.style.transitionDuration = '.2s';
        controlRight.style.transitionProperty = 'opacity';
        controlRight.style.fontSize = '1.6rem';
        controlRight.style.textAlign = 'center';
        controlRight.addEventListener('mouseenter', function() {
            this.style.opacity = '1.0';
        });
        controlRight.addEventListener('mouseleave', function() {
            this.style.opacity = '0.4';
        });
        popupControls.appendChild(controlRight);
        controlRight.addEventListener('click', () => this.nextImage());
}

    closePopup() {
        // Check to see if there is a popup to close
        if (this.gallery.context.getElementsByClassName('easy-gallery-popup').length === 0) {
            return;
        }

        var popupBack = this.gallery.context.getElementsByClassName('easy-gallery-popup').item(0);
        popupBack.style.opacity = '0';

        setTimeout(function() {
            popupBack.parentNode.removeChild(popupBack);
        }, 1000);
    }

    selectImageIndex(newIndex) {
        // Check to see if there is a popup to modify
        if (this.gallery.context.getElementsByClassName('easy-gallery-popup').length === 0) {
            return;
        }

        newIndex = parseInt(newIndex);

        // Restrict the selected index range to a valid image
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= this.gallery.config.imageList.length) {
            newIndex = this.gallery.config.imageList.length - 1;
        }
        this.selectedImage = newIndex;

        // Loop through existing images to see if this image has already been created in the popup, hide all other images
        var imageExists = false;
        var imgContainer = this.gallery.context.getElementsByClassName('easy-gallery-popup').item(0).getElementsByClassName('easy-gallery-popup-image').item(0);
        for (var i = 0; i < imgContainer.getElementsByClassName('image').length; i++) {
            if (parseInt(imgContainer.getElementsByClassName('image').item(i).dataset.imageIndex) === newIndex) {
                imgContainer.getElementsByClassName('image').item(i).style.opacity = '1';
                imageExists = true;
            } else {
                imgContainer.getElementsByClassName('image').item(i).style.opacity = '0';
            }
        }
        if (imageExists === true) {
            return;
        }

        // Image does not current exist, create now
        var imgBox = this.gallery.context.createElement('div');
        imgBox.classList.add('image');
        imgBox.style.opacity = 0;
        imgBox.style.position = 'absolute';
        imgBox.style.top = '0';
        imgBox.style.left = '0';
        imgBox.style.right = '0';
        imgBox.style.bottom = '0';
        imgBox.style.backgroundRepeat = 'no-repeat';
        imgBox.style.backgroundPosition = 'center center';
        imgBox.style.backgroundSize = 'contain';
        imgBox.style.transitionDuration = '1s';
        imgBox.style.transitionProperty = 'opacity';
        imgBox.style.backgroundImage = 'url("' + this.gallery.config.imageList[newIndex].src + '")';
        imgBox.dataset.imageIndex = newIndex;
        imgContainer.appendChild(imgBox);

        setTimeout(function() {
            imgBox.style.opacity = '1';
        }, 16);
    }

    previousImage() {
        var index = this.selectedImage - 1;
        if (index < 0) {
            index = this.gallery.config.imageList.length - 1;
        }
        this.selectImageIndex(index);
    }

    nextImage() {
        var index = this.selectedImage + 1;
        if (index >= this.gallery.config.imageList.length) {
            index = 0;
        }
        this.selectImageIndex(index);
    }

    click(element) {
        // click is called whenever a gallery image is clicked
        // we need to open an overlay with a full screen image and allow browsing through images left and right (looped)
        // also allow the option of sharing images to social media from the popup

        // Get the correct container for the image
        if (element.classList.contains('easy-gallery-image') === false) {
            while ((element !== document.body) && (element.classList.contains('easy-gallery-image') === false)) {
                element = element.parentNode;
            }
        }

        var imageIndex = element.dataset.imageIndex;

        this.createPopup();
        this.selectImageIndex(parseInt(imageIndex));
    }
}

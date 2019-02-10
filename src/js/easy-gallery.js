
//function EasyGallery(galleryConfig) {}

class EasyGallery {
    constructor(galleryConfig) {
        this.context = false;
        if (typeof(document) !== 'undefined') {
            this.context = document;
        }
        this.config = galleryConfig;
        this.render = new EasyGalleryRender(this);
        this.popup = new EasyGalleryPopup(this);
        this.init();
    }

    init() {
        this.render.init();
    }
}

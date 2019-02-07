
export default class EasyGallery {
    constructor(galleryConfig) {
        this.config = galleryConfig;
        this.render = EasyGalleryRender(this);
        this.popup = EasyGalleryPopup(this);
        this.context = false;
        if (typeof(document) !== 'undefined') {
            this.context = document;
        }
        this.init();
    }

    init() {
        this.render.init();
        this.popup.init();
    }
}


class EasyGalleryRender {
    constructor(gallery) {
        this.gallery = gallery;
        this.columns = 0;
        this.init();
    }

    init() {
        if ((typeof(this.gallery) === 'undefined') || (this.gallery.context === false)) {
            return;
        }
        if (this.resize() === true) {
            this.draw();
        }
        if ((typeof(this.gallery.config.targetElement) === 'object') && (this.gallery.config.targetElement instanceof HTMLElement)) {
            if (typeof(window) !== 'undefined') {
                window.addEventListener('resize', this.resize);
            }
        }
    }

    resize() {
        // checks if a new draw is required and calls draw

        if ((typeof(this.gallery) === 'undefined') || (this.gallery.context === false)) {
            return;
        }

        var columnCount = 1;
        var windowWidth = this.gallery.context.innerWidth;

        if (windowWidth <= 768) {
            columnCount = 1;
        } else if (windowWidth <= 992) {
            columnCount = 2;
        } else if (windowWidth <= 1200) {
            columnCount = 3;
        } else if (windowWidth <= 1440) {
            columnCount = 4;
        }

        if ((typeof(this.gallery.config.imageList) === 'object') && (Array.isArray(this.gallery.config.imageList)) === true) {
            if (columnCount > this.gallery.config.imageList.length) {
                columnCount = this.gallery.config.imageList.length;
            }
        }

        if ((typeof(this.gallery.config.maxColumns) === 'number') && (columnCount > this.gallery.config.maxColumns)) {
            columnCount = this.gallery.config.maxColumns;
        }

        if (this.columns !== columnCount) {
            this.columns = columnCount;
            this.draw();
        }
    }

    draw() {
        // create column grid for image list, we use bootstrap styles for this

        var colClass = 'col-12';
        var i=0,n=0,colIndex=0,img;

        if (this.columns === 2) {
            colClass = 'col-6';
        } else if (this.columns === 3) {
            colClass = 'col-4';
        } else if (this.columns === 4) {
            colClass = 'col-3';
        }

        this.gallery.config.targetElement.innerHTML = '';

        var columns = [];
        for (i = 0; i < this.columns; i++) {
            columns[i] = this.gallery.context.createElement('div');
            columns[i].classList.add(colClass);
            this.gallery.config.targetElement.appendChild(columns[i]);
        }

        for (i = 0; i < this.gallery.config.imageList.length; i++) {
            colIndex = 0;
            for (n = 1; n < this.columns; n++) {
                if (columns[n].clientHeight < columns[colIndex].clientHeight) {
                    colIndex = n;
                }
            }
            img = document.createElement('img');
            img.setAttribute('src', this.gallery.config.imageList[i].src);
            img.dataset.imageIndex = i;
            columns[colIndex].appendChild(img);
        }
    }
}

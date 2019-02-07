
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
        if ((typeof(this.gallery.config.targetElement) === 'object') && (this.gallery.config.targetElement instanceof HTMLElement)) {
            this.gallery.config.targetElement.style.opacity = 0;
            this.gallery.config.targetElement.style.transitionDuration = '0s';
            this.gallery.config.targetElement.style.transitionProperty = 'opacity';
            if (typeof(window) !== 'undefined') {
                window.addEventListener('resize', () => this.resize());
            }
        }
        this.preload().then(() => this.resize());
    }

    preload() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var arrImages = [];

            function _loadImage(src, arr) {
                var img = new Image();
                img.onload = function() {arr.push([src, img]);};
                img.onerror = function() {arr.push([src, null]);};
                img.src = src;
            }
            self.gallery.config.imageList.forEach(function (image) {
                _loadImage(image.src, arrImages);
            });
            var interval_id = setInterval(function () {
                if (arrImages.length === self.gallery.config.imageList.length) {
                    clearInterval(interval_id);
                    resolve(arrImages);
                }
            }, 100);
        });
    }

    resize() {
        // checks if a new draw is required and calls draw

        if ((typeof(this.gallery) === 'undefined') || (this.gallery.context === false)) {
            return;
        }

        var columnCount = 1;
        var windowWidth = this.gallery.context.body;
        if (typeof(window) === 'object') {
            windowWidth = window.innerWidth;
        }

        if (windowWidth <= 768) {
            columnCount = 1;
        } else if (windowWidth <= 1200) {
            columnCount = 2;
        } else if (windowWidth <= 1600) {
            columnCount = 3;
        } else if (windowWidth > 1600) {
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

    calcColHeight(col) {
        var result = 0;
        var children = col.childNodes;
        for (var i = 0; i < children.length; i++) {
            result += children[i].clientHeight;
        }
        return result;
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

        var row = document.createElement('div');
        row.classList.add('row');
        this.gallery.config.targetElement.appendChild(row);

        var columns = [];
        for (i = 0; i < this.columns; i++) {
            columns[i] = this.gallery.context.createElement('div');
            columns[i].classList.add(colClass);
            columns[i].classList.add('p-0');
            row.appendChild(columns[i]);
        }

        for (i = 0; i < this.gallery.config.imageList.length; i++) {
            colIndex = 0;
            for (n = 1; n < columns.length; n++) {
                if (this.calcColHeight(columns[n]) < this.calcColHeight(columns[colIndex])) {
                    colIndex = n;
                }
            }
            
            var imgContainer = this.gallery.context.createElement('div');
            imgContainer.classList.add('easy-gallery-image');
            imgContainer.classList.add('my-2');
            imgContainer.classList.add('mx-1');
            imgContainer.style.minHeight = '1rem';
            imgContainer.style.cursor = 'pointer';
            imgContainer.dataset.imageIndex = i;

            img = this.gallery.context.createElement('img');
            img.setAttribute('src', this.gallery.config.imageList[i].src);
            img.style.maxWidth = '100%';
            imgContainer.appendChild(img);

            columns[colIndex].appendChild(imgContainer);
            imgContainer.addEventListener('click', (e) => this.gallery.popup.click(e.target));
        }

        this.gallery.config.targetElement.style.transitionDuration = '.5s';
        this.gallery.config.targetElement.style.opacity = '1';
    }
}

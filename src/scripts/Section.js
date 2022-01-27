export default class Section {
    constructor({items, renderer}, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderAll() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(item) {
        const card = this._renderer(item)
        this._container.prepend(card);
    }
}
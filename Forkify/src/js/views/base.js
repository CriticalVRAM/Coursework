export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

export var elementStrings = {
    loader: 'loader',
}

export var renderLoader = parent => {
    var loader = `
    <div class='${elementStrings.loader}'>
        <svg>
            <use href='img/icons.svg#icon-cw'></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader)
}

export var clearLoader = () => {
    var loader = document.querySelector(`.${elementStrings.loader}`)
    if (loader) {
        loader.parentElement.removeChild(loader)
    }
}
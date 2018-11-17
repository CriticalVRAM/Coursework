import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

var state = {}

var controlSearch = async () => {
    // 1 Get query
    var query = searchView.getInput()
    if (query) {
        // 2 New search object and add to state
        state.search = new Search(query)
        // 3 Prepare UI for result
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)
        try {
            // 4 Search for results
            await state.search.getResults()
            // 5 Render in UI
            clearLoader()
            searchView.renderResults(state.search.result)
            
        } catch (error) {
            alert(error)
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', ele => {
    ele.preventDefault()
    controlSearch()
})

elements.searchResPages.addEventListener('click', event => {
    var btn = event.target.closest('.btn-inline')
    if (btn) {
        var goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
})



const controlRecipe = async () => {
    var id = window.location.hash.replace('#', '')
    if (id) {
        recipeView.clearRecipe()
        renderLoader(elements.recipe)
        state.recipe = new Recipe(id)
        try {
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()
            state.recipe.calcTime()
            state.recipe.calcServings()

            clearLoader()
            recipeView.renderRecipe(state.recipe)
        } catch (error) {
            alert(error)
        }
    }
}

window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)
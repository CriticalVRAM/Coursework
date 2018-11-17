import axios from 'axios'
import { key, proxy} from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.title = res.data.recipe.title
            this.author = res.data.recipe.publisher
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients
        } catch (error) {
            alert(error)
        }
    }

    calcTime() {
        var numIng = this.ingredients.lenght
        var periods = Math.ceil(numIng / 3)
        this.time = periods * 15
    }

    calcServings() {
        this.serving = 4
    }

    parseIngredients() {
        var unitsLong = ['tablespoon', 'tablespoons', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        var unitsShort = ['tbs', 'tbs', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        var units = [...unitsShort, 'kg', 'g']

        var newIngredients = this.ingredients.map(el => {
            var ingredient = el.toLowerCase()
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

            // 3. parse algorithm
            var arrIng = ingredient.split(' ')
            var unitIndex = arrIng.findIndex(el2 =>  units.includes(el2))


            var objIng = {}
            if (unitIndex > -1) {
                //There is a unit
                var arrCount = arrIng.slice(0, unitIndex)
                var count
                if (arrCount.lenght === 1) {
                    count = eval(arrIng[0].replace('-', '+'))
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                // There is no unit but the first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng
        })
        this.ingredients = newIngredients
    }
}
const recipesEl = document.querySelector('#recipes')
const recipeAddEl = document.querySelector('#add-recipe')
const searchEl = document.querySelector('#search-recipe')
const newRecipe = document.querySelector('#new-recipe')

const recipes = getSavedRecipes()

const filters = {
    searchText: ''
}

newRecipe.addEventListener('click', e => {
    const id = uuidv4()
    recipes.push({
        id,
        title: '',
        body: '',
        requiredItems: []
    })
    saveRecipes(recipes)
    location.assign(`/edit.html#${id}`)
})

searchEl.addEventListener('input', e => {
    filters.searchText = e.target.value
    render(recipes, filters)
})

const render = (recipes, filters) => {
    
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''
    
    filteredRecipes.forEach(recipe => {
        const recipeEl = document.createElement('div')
        const textEl = document.createElement('a')
        if (recipe.title) {
            textEl.textContent = recipe.title
        } else {
            textEl.textContent = 'Not named recipe'
        }
        textEl.setAttribute('href', `/edit.html#${recipe.id}`)
        recipesEl.appendChild(recipeEl)
        recipeEl.appendChild(textEl)
    })        
}

render(recipes, filters)
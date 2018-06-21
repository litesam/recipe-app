const recipesEl = document.querySelector('#recipes')
const recipeAddEl = document.querySelector('#add-recipe')
const searchEl = document.querySelector('#search-recipe')
const newRecipe = document.querySelector('#new-recipe')

const recipes = getSavedRecipes()

const filters = {
    searchText: ''
}

// Add new recipe to the list
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

// Search for your required recipe!
searchEl.addEventListener('input', e => {
    filters.searchText = e.target.value
    render(recipes, filters)
})


// Render the list of recipes to the screen
const render = (recipes, filters) => {
    
    // Filter the recipes by the search term
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''
    
    // Displays the recipe to the user
    filteredRecipes.forEach(recipe => {
        const recipeEl = document.createElement('div')
        const textEl = document.createElement('a')
        const howManyAvailableEl = document.createElement('p')
        if (recipe.title) {
            textEl.textContent = recipe.title
        } else {
            textEl.textContent = 'Not named recipe'
        }
        howManyAvailableEl.textContent = showParagraph(recipe.requiredItems, recipe)
        textEl.setAttribute('href', `/edit.html#${recipe.id}`)
        recipesEl.appendChild(recipeEl)
        recipeEl.appendChild(textEl)
        recipesEl.appendChild(howManyAvailableEl)
    })        
}

// Initial rendering after the page has been loaded
render(recipes, filters)
const recipeTitleEl = document.querySelector('#recipe-title')
const recipeTextEl = document.querySelector('#recipe-steps')
const recipeRequirementEl = document.querySelector('#recipe-items')
const addRecipeEl = document.querySelector('#add-ingredients')
const deleteEl = document.querySelector('#delete-recipe')
const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()

// Find the recipe which has been clicked by the user
const recipeInd = recipes.find((recipe) => {
	return recipeId == recipe.id
})

// Finding the index of the recipe so that the recipe can be deleted from the list
const recipeIndex = recipes.findIndex((recipe) => {
	return recipeId == recipe.id
})

// const individualItem = recipeInd.requiredItems

// Set the text value for initial rendering
recipeTitleEl.value = recipeInd.title
recipeTextEl.textContent = recipeInd.body

// To modify the title in the screen
recipeTitleEl.addEventListener('input', (e) => {
	recipeInd.title = e.target.value
	saveRecipes(recipes)
})

// To modify the body in the screen
recipeTextEl.addEventListener('input', e => {
	recipeInd.body = e.target.value
	saveRecipes(recipes)
})

// Renders the individual items that are needed to make the recipe!
const renderIndiviual = (indIndEl) => {
	recipeRequirementEl.innerHTML = ' '
	indIndEl.forEach(item => {
		const holdEl = document.createElement('div')
		const checkboxEl = document.createElement('input')
		const indEl = document.createElement('label')
		const removeEl = document.createElement('button')
		checkboxEl.setAttribute('type', 'checkbox')
		checkboxEl.checked = item.checkItem
		indEl.textContent = item.textEl

		// Adding a checkbox to the list
		checkboxEl.addEventListener('click', e => {
			item.checkItem = !item.checkItem
			saveRecipes(recipes)
			renderIndiviual(recipeInd.requiredItems)
		})

		// Removing a item from the recipe
		removeEl.textContent = 'remove'
		removeEl.addEventListener('click', e => {
			indIndEl.splice(indIndEl.findIndex((ind) => item.id === ind.id), 1)
			saveRecipes(recipes)
			renderIndiviual(recipeInd.requiredItems)
		})
		recipeRequirementEl.appendChild(holdEl)
		holdEl.appendChild(indEl)
		indEl.appendChild(checkboxEl)	
		holdEl.appendChild(removeEl)
	})
}

// Adds a new item to the recipe!
addRecipeEl.addEventListener('submit', e => {
	e.preventDefault()
	let textValue = e.target.elements.recipe.value
    textEl = textValue.trim()
	recipeInd.requiredItems.push({
		id: uuidv4(),
		textEl,
		checkItem: false
	})
	renderIndiviual(recipeInd.requiredItems)
	saveRecipes(recipes)
	e.target.elements.recipe.value = ''
})

// Deletes the recipe from the Recipes
deleteEl.addEventListener('click', () => {
	recipes.splice(recipeIndex, 1)
	saveRecipes(recipes)
	location.assign('/index.html')
})

// Initial rendering to the screen
renderIndiviual(recipeInd.requiredItems)
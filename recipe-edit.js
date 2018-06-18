const recipeTitleEl = document.querySelector('#recipe-title')
const recipeTextEl = document.querySelector('#recipe-steps')
const recipeRequirementEl = document.querySelector('#recipe-items')
const addRecipeEl = document.querySelector('#add-ingredients')
const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()

const recipeInd = recipes.find((recipe) => {
	return recipeId == recipe.id
})

// const individualItem = recipeInd.requiredItems

recipeTitleEl.value = recipeInd.title
recipeTextEl.textContent = recipeInd.body

recipeTitleEl.addEventListener('input', (e) => {
	recipeInd.title = e.target.value
	saveRecipes(recipes)
})

recipeTextEl.addEventListener('input', e => {
	recipeInd.body = e.target.value
	saveRecipes(recipes)
})

const renderIndiviual = (indIndEl) => {
	indIndEl.forEach(item => {
		const indEl = document.createElement('p')
		indEl.textContent = item
		recipeRequirementEl.appendChild(indEl)	
	})
}

addRecipeEl.addEventListener('submit', e => {
	e.preventDefault()
	let textValue = e.target.elements.recipe.value
    textEl = textValue.trim()
	recipeInd.requiredItems.push(textEl)
	renderIndiviual(recipeInd.requiredItems)
	saveRecipes(recipes)
})

renderIndiviual(recipeInd.requiredItems)
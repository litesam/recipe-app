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
	recipeRequirementEl.innerHTML = ' '
	indIndEl.forEach(item => {
		const holdEl = document.createElement('div')
		const checkboxEl = document.createElement('input')
		const indEl = document.createElement('label')
		const removeEl = document.createElement('button')
		checkboxEl.setAttribute('type', 'checkbox')
		checkboxEl.checked = item.checkItem
		indEl.textContent = item.textEl
		checkboxEl.addEventListener('click', e => {
			item.checkItem = !item.checkItem
			saveRecipes(recipes)
			renderIndiviual(recipeInd.requiredItems)
		})
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

renderIndiviual(recipeInd.requiredItems)
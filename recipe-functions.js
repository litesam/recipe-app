// Get the saved recipes from the localStorage
const getSavedRecipes = () => {
    try {
        const recipesJSON = localStorage.getItem('recipes')
        if (recipesJSON) {
            return JSON.parse(recipesJSON)
        } else {
            return []
        }    
    } catch {
        return []
    }
}

// Save the recipes to the localStorage
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const showParagraph = (indItems, recipe) => {
    
    
    const el = indItems.filter((element) => {
        return element.checkItem
    })
    
    if (el.length === recipe.requiredItems.length) {
        return 'You have all the items!'
    } else if (el.length < recipe.requiredItems.length && el.length === 0) {
        return 'You have none of the items!'
    } else {
        return 'You have some of the items!'
    }
}
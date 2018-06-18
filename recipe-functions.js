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

const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}
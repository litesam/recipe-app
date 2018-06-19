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

const showParagraph = (indItems, recipes) => {
    
    // // const recipes = getSavedRecipes()
    // const el = indItems.filter((element) => {
    //     return element.checkItem
    // })
    // console.log(recipes.requiredItems)
    // console.log(el)
    // // if (el.length === recipes.requiredItems.length) {
    // //     return 'You have all the items!'
    // // } else if (el.length < recipes.requiredItems.length) {
    // //     return 'You have some of the items!'
    // // } else {
    // //     return 'You have none of the items!'
    // // }
}
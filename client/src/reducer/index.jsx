const initialState = {
    recipes: [],
    filter: [],
    filter2: [],
    diets: [],
    details: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipe: action.payload,
                filter: action.payload,
                filter2: action.payload
            }
        case "GET_TYPES":
            return {
                ...state,
                diets: action.payload
            }
        case "GET_NAME_RECIPES":
            return {
                ...state,
                filter: action.payload
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }
        case "POST_RECIPES":
            return {
                ...state
            }
            case "FILTER_BY_TYPES":
      const typesFil = state.filter2;

      const typeFiltered = action.payload === "All" ?
      typesFil :     
      typesFil.filter((el) => el.diets.includes(action.payload))
      return {
        ...state,
        filter: typeFiltered
      };
        case "ORDER_BY_HEALTHSCORE":
            const filterHealthScore =
                action.payload === "max"
                    ? state.filter2.sort((a, b) => {
                        if (a.healthScore < b.healthScore) {
                            return 1;
                        }
                        if (b.healthScore < a.healthScore) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                    : state.filter2.sort((a, b) => {
                        if (a.healthScore < b.healthScore) {
                            return -1;
                        }
                        if (b.healthScore < a.healthScore) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
            return {
                ...state,
                recipes: filterHealthScore,
            };
        case "ORDER_BY_NAME":
            const filterName =
                action.payload === "asc"
                    ? state.filter2.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                    : state.filter2.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
            return {
                ...state,
                recipes: filterName,
            };
        default:
            return state;
    }

}

export default rootReducer;

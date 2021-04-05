import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (id, categories, category) => {
  let myCategories = [];
  if (id === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === id) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              id,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parenId: category.parenId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(id, [...cat.children], category)
          : [],
      });
    }
  }
  return myCategories;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.ADD_NEW_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_SUCCESS:
      const category = action.payload.category;
      const newCategories = buildNewCategories(
        category.parenId,
        state.categories,
        category
      );
      console.log(newCategories);
      state = {
        ...state,
        categories: newCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_FAILURE:
      state = {
        ...initState,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;

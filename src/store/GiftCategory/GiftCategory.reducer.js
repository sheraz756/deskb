import * as ActionType from "./Giftcategory.type";

const initialState = {
  giftCategory: [],
  dialogOpen: false,
  dialogData: null,
};
export const GiftCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // get category
    case ActionType.GET_GIFT_CATEGORY:
      console.log(action.payload);
      return {
        ...state,
        giftCategory: action.payload,
      };
    // open dialog
    case ActionType.OPEN_CATEGORY_DIALOG:
      return {
        ...state,
        dialogOpen: true,
        dialogData: action.payload || null,
      };
    // close dialog
    case ActionType.CLOSE_CATEGORY_DIALOG:
      return {
        ...state,
        dialogOpen: false,
        dialogData: null,
      };

    // create category
    case ActionType.CREATE_GIFT_CATEGORY:
      let data = [...state.giftCategory];
      data.unshift(action.payload);
      return {
        ...state,
        giftCategory: data,
      };

    // update category
    case ActionType.EDIT_GIF_CATEGORY:
      return {
        ...state,
        giftCategory: state.giftCategory.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        ),
      };

    // delete category

    case ActionType.DELETE_GIF_CATEGORY:
      ;
      return {
        ...state,
        giftCategory: state.giftCategory.filter(
          (giftCategory) => giftCategory._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

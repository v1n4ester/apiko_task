import { ProductsApi, SearchApi } from "../API"
import { updateObjectInArray } from "../Components/utils/object-helpers"


const GOODS = 'GOODS'
const SEARCH_TEXT = 'SEARCH_TEXT'
const SEARCHED_GOODS = 'SEARCHED_GOODS'
const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE';
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"

const initialState={
    goods: [],
    searchText: '',
    categories: [],
    sortedBy: "",
    currentCategory: null
}

export const goodsReducer=(state = initialState, action)=>{
    switch(action.type) {
        case LIKE:
            return {
                ...state,
                goods: updateObjectInArray(state.goods, action.itemId, 'id', {favorite: true})
            }
        case DISLIKE:
            return {
                ...state,
                goods: updateObjectInArray(state.goods, action.itemId, 'id', {favorite: false})
            }
        case GOODS:
        return{
            ...state,
            goods: action.goods,
        }
        case SEARCHED_GOODS:{
            return{
                ...state,
                goods: action.goods
            }
        }
        case SEARCH_TEXT:{
            return{
                ...state,
                searchText: action.text
            }
        }
        case SET_CATEGORIES:{
            return{
                ...state,
                categories: action.category
            }
        }
        case SET_CURRENT_CATEGORY:{
            return{
                ...state,
                sortedBy: action.sort
            }
        }
        default: 
            return state

    }
}

const setGoods=(goods)=>({type: GOODS, goods});
const setCategories=(category)=>({type: SET_CATEGORIES, category});
export const setCurrentSort=(sort)=>({type: SET_CURRENT_CATEGORY, sort});
export const likeSuccess = (itemId) => ({ type: LIKE, itemId })
export const dislikeSuccess = (itemId) => ({ type: DISLIKE, itemId })
const searchedGoods=(goods)=>({type: SEARCHED_GOODS, goods})
export const searchTextAC=(text)=>({type: SEARCH_TEXT, text})

export const getGoods=(sort)=>async(dispatch)=>{
    const responce = await SearchApi.startProducts(sort);
    dispatch(setGoods(responce.data))
}

export const getCategories=()=>async(dispatch)=>{
    const responce = await SearchApi.getCategories();
    dispatch(setCategories(responce.data))
}

export const getChoosedCategoryProducts=(id, sort)=>async(dispatch)=>{
    const responce = await SearchApi.getChoosedCategory(id, sort);
    dispatch(setGoods(responce.data))
}

export const getFavoriteGoods=()=>async(dispatch)=>{
    const responce = await ProductsApi.favoritsGoods();
    dispatch(setGoods(responce.data))
}

export const getSearchedGoods=(text)=>async(dispatch)=>{
    const responce = await SearchApi.searchText(text);
    console.log(responce)
    dispatch(searchedGoods(responce.data))
}

const likeDislikeFlow = async(dispatch, itemId, apiMethod, actionCreator)=>{
    // dispatch(toggleIsFollowingProgres(true, itemId));
    let response = await apiMethod(itemId);
    console.log(response)
        dispatch(actionCreator(itemId));
        // dispatch(toggleIsFollowingProgres(false, itemId));
}

export const like = (itemId) => async(dispatch) => {
    likeDislikeFlow(dispatch, itemId, ProductsApi.like, likeSuccess);
}

export const dislike = (itemId) => async(dispatch) => {
    likeDislikeFlow(dispatch, itemId, ProductsApi.dislike.bind(ProductsApi), dislikeSuccess);
}

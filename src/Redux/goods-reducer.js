import { ProductsApi, SearchApi } from "../API"
import { updateObjectInArray } from "../Components/utils/object-helpers"


const GOODS = 'GOODS'
const SEARCH_TEXT = 'SEARCH_TEXT'
const SEARCHED_GOODS = 'SEARCHED_GOODS'
const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE'

const initialState={
    goods: [],
    searchText: '',
}

export const goodsReducer=(state = initialState, action)=>{
    switch(action.type) {
        case LIKE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case DISLIKE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case GOODS:
        return{
            ...state,
            goods: action.goods
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
        default: 
            return state

    }
}

const goodsAc=(goods)=>({type: GOODS, goods});
export const likeSuccess = (itemId) => ({ type: LIKE, itemId })
export const dislikeSuccess = (itemId) => ({ type: DISLIKE, itemId })
const searchedGoods=(goods)=>({type: SEARCHED_GOODS, goods})
export const searchTextAC=(text)=>({type: SEARCH_TEXT, text})

export const getGoods=()=>async(dispatch)=>{
    const responce = await ProductsApi.ShoesApi();
    dispatch(goodsAc(responce.data))
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
    likeDislikeFlow(dispatch, itemId, ProductsApi.like.bind(ProductsApi), likeSuccess);
}

export const dislike = (itemId) => async(dispatch) => {
    likeDislikeFlow(dispatch, itemId, ProductsApi.dislike.bind(ProductsApi), dislikeSuccess);
}

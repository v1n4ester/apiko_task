import { ProductsApi, SearchApi } from "../API"
import { updateObjectInArray, updateChoosedItemsArray, updateCountItemsArray } from "../Components/utils/object-helpers"


const GOODS = 'GOODS'
const SEARCH_TEXT = 'SEARCH_TEXT'
const SEARCHED_GOODS = 'SEARCHED_GOODS'
const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE';
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"
const SET_CHOOSED_PRODUCT = "SET_CHOOSED_PRODUCT"
const GET_PRODUCTS_IN_CART = "GET_PRODUCTS_IN_CART"

const initialState={
    goods: [],
    choosedProducts: [],
    searchText: '',
    categories: [],
    sortedBy: "",
    currentCategory: null,
    disabledButton: false,
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
            disabledButton: action.active
        }

        case SET_CHOOSED_PRODUCT:
        return{
            ...state,
            choosedProducts: action.product
        }

        case SEARCHED_GOODS:{
            return{
                ...state,
                goods: action.goods,
                searchText: ""
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
        case GET_PRODUCTS_IN_CART:{
            return{
                ...state,
                goods: action.product
            }
        }
        default: 
            return state

    }
}

const setGoods=(goods, active)=>({type: GOODS, goods, active});
const setCategories=(category)=>({type: SET_CATEGORIES, category});
export const setCurrentSort=(sort)=>({type: SET_CURRENT_CATEGORY, sort});
const setChoosedProduct=(product)=>({type: SET_CHOOSED_PRODUCT, product});
export const getProductsInCart=(product)=>({type: GET_PRODUCTS_IN_CART, product});
export const likeSuccess = (itemId) => ({ type: LIKE, itemId })
export const dislikeSuccess = (itemId) => ({ type: DISLIKE, itemId })
const searchedGoods=(goods)=>({type: SEARCHED_GOODS, goods})
export const searchTextAC=(text)=>({type: SEARCH_TEXT, text})

export const getGoods=(sort, limit)=>async(dispatch)=>{
    const responce = await SearchApi.startProducts(sort, limit);
    if(responce.data < limit){
        dispatch(setGoods(responce.data, true))
    }else{
        dispatch(setGoods(responce.data, false))
    }
    
}

export const getCategories=()=>async(dispatch)=>{
    const responce = await SearchApi.getCategories();
    dispatch(setCategories(responce.data))
}

export const getChoosedCategoryProducts=(id, sort, limit)=>async(dispatch)=>{
    const responce = await SearchApi.getChoosedCategory(id, sort, limit);
    if(responce.data < limit){
        dispatch(setGoods(responce.data, true))
    }else{
        dispatch(setGoods(responce.data, false))
    }
}

export const getFavoriteGoods=()=>async(dispatch)=>{
    const responce = await ProductsApi.favoritsGoods();
    dispatch(setGoods(responce.data))
}

export const getSearchedGoods=(text)=>async(dispatch)=>{
    const responce = await SearchApi.searchText(text);
    dispatch(searchedGoods(responce.data))
}

export const setProductToCart=(product, count)=>(dispatch)=>{
    const data = JSON.parse(sessionStorage.getItem('cart'));
    const result = updateChoosedItemsArray(data, product, count);
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(setChoosedProduct(result))
}

export const updateCountInCart=(product, type)=>(dispatch)=>{
    const data = JSON.parse(sessionStorage.getItem('cart'));
    sessionStorage.removeItem('cart');
    const result = updateCountItemsArray(data, product, type)
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(setChoosedProduct(result))
}

export const removeProductFromCart=(product)=>(dispatch)=>{
    const data = JSON.parse(sessionStorage.getItem('cart'));
    sessionStorage.removeItem('cart');
    const result = data.filter(el=> !el.title.includes(product.title))
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(getProductsInCart(result))
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

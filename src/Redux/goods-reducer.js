import { ProductsApi, SearchApi } from "../Components/API/API"
import { updateChoosedItemsArray, updateCountItemsArray, updateObjectInArray } from "../Components/utils/object-helpers"
import { setLoading } from "./app-reducer"


const GOODS = 'GOODS'
const SEARCH_TEXT = 'SEARCH_TEXT'
const SEARCHED_GOODS = 'SEARCHED_GOODS'
const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE';
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"
const GET_PRODUCTS_IN_CART = "GET_PRODUCTS_IN_CART"
const SET_DISABLE_BUTTON = "SET_DISABLE_BUTTON"
const SET_NEW_GOODS = "SET_NEW_GOODS"

const initialState = {
    goods: [],
    cartGoods: [],
    searchText: '',
    searchedText: '',
    categories: [],
    sortedBy: "",
    currentCategory: null,
    disabledButton: false,
}

export const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE:
            return {
                ...state,
                goods: updateObjectInArray(state.goods, action.itemId, 'id', { favorite: true })
            }
        case DISLIKE:
            return {
                ...state,
                goods: updateObjectInArray(state.goods, action.itemId, 'id', { favorite: false })
            }

        case GOODS:
            return {
                ...state,
                goods: action.goods,
            }
        case SEARCHED_GOODS: {
            return {
                ...state,
                goods: action.goods,
                searchedText: action.text,
                searchText: ""
            }
        }

        case SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.text
            }
        }

        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.category
            }
        }
        case SET_CURRENT_CATEGORY: {
            return {
                ...state,
                sortedBy: action.sort
            }
        }
        case GET_PRODUCTS_IN_CART: {
            return {
                ...state,
                cartGoods: action.product
            }
        }
        case SET_DISABLE_BUTTON: {
            return {
                ...state,
                disabledButton: action.active
            }
        }
        case SET_NEW_GOODS: {
            return {
                ...state,
                goods: [...state.goods, ...action.goods]
            }
        }
        default:
            return state

    }
}

const setGoods = (goods) => ({ type: GOODS, goods });
const setDisabledButton = (active) => ({ type: SET_DISABLE_BUTTON, active })
const setCategories = (category) => ({ type: SET_CATEGORIES, category });
export const setCurrentSort = (sort) => ({ type: SET_CURRENT_CATEGORY, sort });
export const getProductsInCart = (product) => ({ type: GET_PRODUCTS_IN_CART, product });
export const likeSuccess = (itemId) => ({ type: LIKE, itemId })
export const dislikeSuccess = (itemId) => ({ type: DISLIKE, itemId })
const searchedGoods = (goods, text) => ({ type: SEARCHED_GOODS, goods, text })
export const searchTextAC = (text) => ({ type: SEARCH_TEXT, text })
const setNewGoods = (goods) => ({ type: SET_NEW_GOODS, goods })

export const getGoods = (sort, limit = 0) => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await SearchApi.startProducts(sort, limit);
    dispatch(setGoods(responce.data))
    if (responce.data.length < 12) {
        dispatch(setDisabledButton(true))
    }
    dispatch(setLoading(false))
}

export const getCategories = () => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await SearchApi.getCategories();
    dispatch(setCategories(responce.data))
    dispatch(setLoading(false))
}

export const getChoosedCategoryProducts = (id, sort, limit) => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await SearchApi.getChoosedCategory(id, sort, limit);
    if (limit != 0) {
        dispatch(setNewGoods(responce.data))
    } else {
        dispatch(setGoods(responce.data, true))
    }

    if (responce.data.length < 12) {
        dispatch(setDisabledButton(true))
    }
    dispatch(setLoading(false))
}

export const getFavoriteGoods = () => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await ProductsApi.favoritsGoods();
    dispatch(setGoods(responce.data))
    dispatch(setLoading(false))
}

export const getSearchedGoods = (text, limit) => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await SearchApi.searchText(text, limit);
    dispatch(searchedGoods(responce.data, text))
    if (responce.data.length < 12) {
        dispatch(setDisabledButton(true))
    }
    dispatch(setLoading(false))
}

export const setProductToCart = (product, count) => (dispatch) => {
    const data = JSON.parse(sessionStorage.getItem('cart'));
    const result = updateChoosedItemsArray(data, product, count);
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(getProductsInCart(result))
}

export const updateCountInCart = (product, type) => (dispatch) => {
    const data = JSON.parse(sessionStorage.getItem('cart'));
    sessionStorage.removeItem('cart');
    const result = updateCountItemsArray(data, product, type)
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(getProductsInCart(result))
}

export const removeProductFromCart = (product) => (dispatch) => {
    const data = JSON.parse(sessionStorage.getItem('cart'));
    sessionStorage.removeItem('cart');
    const result = data.filter(el => !el.title.includes(product.title))
    sessionStorage.setItem('cart', JSON.stringify(result))
    dispatch(getProductsInCart(result))
}

const likeDislikeFlow = async (dispatch, itemId, apiMethod, actionCreator) => {
    dispatch(setLoading(true))
    let response = await apiMethod(itemId);
    dispatch(actionCreator(itemId));
    dispatch(setLoading(false))
}

export const like = (itemId) => (dispatch) => {
    likeDislikeFlow(dispatch, itemId, ProductsApi.like, likeSuccess);
}

export const dislike = (itemId) => (dispatch) => {
    likeDislikeFlow(dispatch, itemId, ProductsApi.dislike.bind(ProductsApi), dislikeSuccess);
}

export const unauthorizedLike = (itemId) => (dispatch) => {
    const data = JSON.parse(sessionStorage.getItem('likes'));
    sessionStorage.removeItem('likes');
    if (data) {
        data.push(itemId);
        sessionStorage.setItem('likes', JSON.stringify(data));
    } else {
        sessionStorage.setItem('likes', JSON.stringify([itemId]));
    }
    dispatch(likeSuccess(itemId))
}

export const unauthorizedDislike = (itemId) => (dispatch) => {
    const data = JSON.parse(sessionStorage.getItem('likes'));
    console.log(itemId)
    sessionStorage.removeItem('likes')
    const result = data.filter(el => (el != itemId))
    sessionStorage.setItem('likes', JSON.stringify(result));
    dispatch(dislikeSuccess(itemId))
}

export const setunaUthorizedlikes = () => () => {
    const data = JSON.parse(sessionStorage.getItem('likes'));
    sessionStorage.removeItem('likes');
    if (data && data.length > 0) {
        ProductsApi.setFavoritsUnauthorizedGoods(data)
    }
}

export const addNewGoods = (sort, limit) => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await SearchApi.startProducts(sort, limit);
    dispatch(setNewGoods(responce.data))
    if (responce.data.length < 12) {
        dispatch(setDisabledButton(true))
    }
    dispatch(setLoading(false))
}

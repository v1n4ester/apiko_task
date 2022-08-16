import { offerApi } from "../Components/API/API";
import { setLoading } from "./app-reducer";

const OFFER_ERROR = "OFFER_ERROR"
const SET_OFFERS = 'auth/SET_OFFERS';
const SHOW_MESSAGE = "SHOW_MESSAGE"


let initialState = {
    offers: [],
    offerError: false,
    showMessage: false
};

const offerReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_OFFERS:
            return {
                ...state,
                offers: action.offers
            }
        case OFFER_ERROR:
            return {
                ...state,
                offerError: action.value
            }
        case SHOW_MESSAGE:
            return {
                ...state,
                showMessage: action.value
            }

        default:
            return state;
    }
}

const setOffers = (offers) => ({ type: SET_OFFERS, offers });
export const offersError = (value) => ({ type: OFFER_ERROR, value });
export const setShowMessage = (value) => ({ type: SHOW_MESSAGE, value })

export const sendOffer = (products, values) => async (dispatch) => {
    dispatch(setLoading(true))
    const goods = [];
    products.forEach(el => {
        const some = {}
        some.productId = el.id;
        some.quantity = el.productCount
        goods.push(some);
    });
    const responce = await offerApi.postOffer(goods, values);
    if (responce.status === 200) {
        sessionStorage.removeItem('cart');
        dispatch(offersError(false))
        dispatch(setShowMessage(true))
    } else {
        dispatch(offersError(true))
    }
    dispatch(setLoading(false))
}

export const getOffers = () => async (dispatch) => {
    dispatch(setLoading(true))
    const responce = await offerApi.getOffers();
    dispatch(setOffers(responce.data))
    dispatch(setLoading(false))
}


export default offerReducer
import { authApi, offerApi } from "../API";


const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_COUNTRIES = 'auth/SET_COUNTRIES';


let initialState = {
    id: null,
    email: null,
    isAuth: false,
    fullName: '',
    phone: '',
    countries: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.country
            }

        default:
            return state;
    }
}


export const setAuthUserData = (fullName, phone, email, id) => ({ type: SET_USER_DATA, payload: { fullName, phone, email, id } })
const setCountries = (country) => ({ type: SET_COUNTRIES, country })

export const sendOffer = (products, values) => async (dispatch) => {
    const goods = [];
    products.forEach(el => {
        const some = {}
        some.id = el.id;
        some.quantity = el.productCount
        goods.push(some);
    });
    const responce = await offerApi.postOffer(goods, values);
    console.log(responce)

    // return offerApi.me().then(response => {
    //     const data = response.data;
    //     console.log(data)
    //     if (response.status == 200) {
    //         // success
    //         let { fullName, phone, email, id } = data.data
    //         dispatch(setAuthUserData(fullName, phone, email, id))
    //     }
    // });
}

export const getAuthUserData = () => (dispatch) => {
    return authApi.me().then(response => {
        const data = response.data;
        console.log(data)
        if (response.status == 200) {
            // success
            let { fullName, phone, email, id } = data.data
            dispatch(setAuthUserData(fullName, phone, email, id))
        }
    });
}

export const login = (email, password) => async (dispatch) => {
    let response = await authApi.login(email, password);
    const data = response.data.account;
    if (response.status == 200) {
        let { fullName, phone, email, id } = data
        dispatch(setAuthUserData(fullName, phone, email, id));
    } else {
        dispatch(setAuthUserData('something went wrong'))
    }
}

export const register = (fullName, email, password, phone) => async (dispatch) => {
    let response = await authApi.register(fullName, email, password, phone);
    const data = response.data.account;
    if (response.status == 200) {
        let { fullName, phone, email, id } = data
        dispatch(setAuthUserData(fullName, phone, email, id));
    } else {
        dispatch(setAuthUserData('something went wrong'))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authApi.logOut()
    if (response.status == 200) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCountries = () => async (dispatch) => {
    let response = await authApi.getCountries();
    if (response.status == 200) {
        dispatch(setCountries(response.data))
    }
}


export default authReducer
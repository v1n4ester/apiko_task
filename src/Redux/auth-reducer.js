import { authApi } from "../Components/API/API";
import { setLoading } from "./app-reducer";
import { offersError } from "./offer-reducer";


const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_COUNTRIES = 'auth/SET_COUNTRIES';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SUCCESS_CHANGE = 'SUCCESS_CHANGE';


let initialState = {
    initialized: true,
    id: null,
    email: null,
    isAuth: false,
    fullName: '',
    phone: '',
    countries: [],
    successChange: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.country
            }
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: action.value,
            }

            case SUCCESS_CHANGE:
            return {
                ...state,
                successChange: action.success,
            }

        default:
            return state;
    }
}

export const initializedSuccess = (value) => ({ type: INITIALIZED_SUCCESS, value });
export const successChanged = (success) => ({ type: SUCCESS_CHANGE, success });
export const setAuthUserData = (fullName, phone, email, id, isAuth) => ({ type: SET_USER_DATA, payload: { fullName, phone, email, id, isAuth } })
const setCountries = (country) => ({ type: SET_COUNTRIES, country });

export const initialiezeApp = () => (dispatch) => {
    dispatch(getAuthUserData());
    dispatch(initializedSuccess(false));
}

export const getAuthUserData = () => (dispatch) => {
    const data = JSON.parse(localStorage.getItem('account'))
    if (data) {
        // success
        let { fullName, phone, email, id } = data.account
        dispatch(setAuthUserData(fullName, phone, email, id, true))
    }
}

export const login = (email, password) => async (dispatch) => {
    const Email = email
    dispatch(setLoading(true))
    try{
        let response = await authApi.login(Email, password);
        const data = response.data;
        localStorage.setItem('account', JSON.stringify(data))
        let { fullName, phone, email, id } = data.account
        dispatch(setAuthUserData(fullName, phone, email, id, true));
        dispatch(offersError(false))
        window.location.reload(false)
    }
    catch(error){
        dispatch(offersError(true))
    }
    dispatch(setLoading(false))
}

export const register = (fullName, email, password, phone) => async (dispatch) => {
    dispatch(setLoading(true))
    let response = await authApi.register(fullName, email, password, phone);
    const data = response.data;
    if (response.status == 200) {
        localStorage.setItem('account', JSON.stringify(data))
        let { fullName, phone, email, id } = data.account
        dispatch(setAuthUserData(fullName, phone, email, id, true));
        dispatch(offersError(false))
        window.location.reload(false)
    } else {
        dispatch(offersError(true))
    }
    dispatch(setLoading(false))
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('account');
    sessionStorage.removeItem('cart')
    dispatch(setAuthUserData(null, null, null, null, false));
    window.location.reload(false)
}

export const setNewPassword = (old, newPas) => async(dispatch) => {
    const responce = await authApi.changePassword(old, newPas);
    if(responce.status == 200){
        dispatch(successChanged(true))
        dispatch(offersError(false))
    }else{
        dispatch(offersError(true))
    }

}

export const setNewUserData = (fullName, email, phone, country, city, address) => async(dispatch) => {
    const responce = await authApi.changeUserData(fullName, email, phone, country, city, address);
    if(responce.status == 200){
        dispatch(successChanged(true))
        dispatch(offersError(false))
    }else{
        dispatch(offersError(true))
    }

}

export const getCountries = () => async (dispatch) => {
    dispatch(setLoading(true))
    let response = await authApi.getCountries();
    if (response.status == 200) {
        dispatch(setCountries(response.data))
    }
    dispatch(setLoading(false))
}


export default authReducer
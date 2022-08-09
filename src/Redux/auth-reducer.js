import { authApi } from "../API";


const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    isAuth: false,
    fullName: '',
    phone: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
                }
    
        default:
            return state;
    } 
}


export const setAuthUserData = (fullName, phone, email, id) => ({ type: SET_USER_DATA , payload: {fullName, phone, email, id}})

export const getAuthUserData = () => (dispatch) =>{
    return authApi.me().then(response => {
        const data = response.data;
        console.log(data)
        if(response.status == 200){
            // success
            let{fullName, phone, email, id} = data.data
            dispatch(setAuthUserData(fullName, phone, email, id))
        }
    });
}

export const login = ( email, password)=> async(dispatch)=>{
    let response = await authApi.login( email, password);
        const data = response.data.account;
        if(response.status == 200){
            let{fullName, phone, email, id} = data
            dispatch(setAuthUserData(fullName, phone, email, id));
        } else{
            dispatch(setAuthUserData('something went wrong'))
        }
}

export const register = (fullName ,email, password, phone)=> async(dispatch)=>{
    let response = await authApi.register(fullName ,email, password, phone);
    const data = response.data.account;
    if(response.status == 200){
        let{fullName, phone, email, id} = data
        dispatch(setAuthUserData(fullName, phone, email, id));
    } else{
        dispatch(setAuthUserData('something went wrong'))
    }
}

export const logout = ()=> async(dispatch)=>{
    let response = await authApi.logOut()
        if(response.status == 200){
            dispatch(setAuthUserData(null, null, null, false))
        }
}
 

export default authReducer
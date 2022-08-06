import { authApi, securityApi } from "../API";


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    fullName: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                }
    
        default:
            return state;
    } 
}


export const setAuthUserData = (fullName) => ({ type: SET_USER_DATA , payload: {fullName}})

// export const getAuthUserData = () => (dispatch) =>{
//     return authApi.me().then(response => {
//         const data = response.data;
//             data.data = {}
//             data.data.userId = 2;
//             data.data.email = 'blabla@bla.com';
//             data.data.login = 'free';
//             data.data.isAuth = true
//         if(response.status == 200){
//             // success
//             let{userId, login, email, isAuth} = data.data
//             dispatch(setAuthUserData(userId, email, login, isAuth))
//         }
//     });
// }

export const login = ( email, password)=> async(dispatch)=>{
    let response = await authApi.login( email, password);
    console.log(response)
        const data = response.data;
        if(response.status == 200){
            let{fullName} = data
            dispatch(setAuthUserData(fullName));
            let user = await authApi.getAcc();
            console.log(user)
            
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
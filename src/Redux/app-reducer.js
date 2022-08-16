const SET_ACCOUNT_BUTTON = 'SET_ACCOUNT_BUTTON';
const LOADING = "LOADING"

let initialState = {
    accountButton: '',
    loading: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ACCOUNT_BUTTON:
            return {
                ...state,
                accountButton: action.text
            }
        case LOADING:
            return {
                ...state,
                loading: action.value
            }


        default:
            return state;
    }
}

export const setLoading = (value) => ({ type: LOADING, value });
export const setAccountButton = (text) => ({ type: SET_ACCOUNT_BUTTON, text });

export default appReducer
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userPersist: null,
    role: null,
    accessToken: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_OR_REGISTER_SUCCESS:
            console.log('login');
            console.log(state.isLoggedIn);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                userPersist: action.userInfo,
                role: action.userInfo.role,
                accessToken: action.userInfo.accessToken,
            };

        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                userPersist: null,
                role: null,
                accessToken: '',
            };

        default:
            return state;
    }
};

export default userReducer;
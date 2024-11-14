export const loginUser = (userData) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userData,  // The user data from the login response
    };
};


export const logoutUser = () => ({
    type: 'LOGOUT',
});
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
const initialState = {
    User: Cookies.get('User') ? JSON.parse(Cookies.get('User')) : [],
    userData: localStorage.getItem('User Data') ? JSON.parse(localStorage.getItem('User Data')) : [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        RegisterUser: (state, action) => {
            state.User.push(action.payload);
            Cookies.set('User', JSON.stringify(state.User));
            localStorage.setItem('User Data', JSON.stringify(state.User));
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const Data = JSON.parse(localStorage.getItem('User Data'))
            console.log(Data);

            if (email === Data[0].email && password === Data[0].password) {
                state.userData = Data
                console.log('Logged in successfully');
                browserHistory.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                Swal.fire({
                        title: "Successfully Logged In",
                        text: "Do you want to continue",
                        icon: "success",
                        confirmButtonText: "Ok",

                    })
                    .then((result) => {
                        console.log(result);

                    }).catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    });
            } else if (email !== Data[0].email || password !== Data[0].password) {
                Swal.fire({
                    title: "Error",
                    text: "Invalid email or password",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }

        },
        LogOutUser: (state) => {
            state.User = [];
            Cookies.remove('User');
            localStorage.removeItem('User Data');
        },
    },
});



export const { RegisterUser, loginUser, LogOutUser } = userSlice.actions;
export default userSlice.reducer;
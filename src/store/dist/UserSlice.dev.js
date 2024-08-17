"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LogOutUser = exports.loginUser = exports.RegisterUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _history = require("history");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var browserHistory = (0, _history.createBrowserHistory)();
var initialState = {
  User: _jsCookie["default"].get('User') ? JSON.parse(_jsCookie["default"].get('User')) : [],
  userData: localStorage.getItem('User Data') ? JSON.parse(localStorage.getItem('User Data')) : []
};
var userSlice = (0, _toolkit.createSlice)({
  name: 'user',
  initialState: initialState,
  reducers: {
    RegisterUser: function RegisterUser(state, action) {
      state.User.push(action.payload);

      _jsCookie["default"].set('User', JSON.stringify(state.User));

      localStorage.setItem('User Data', JSON.stringify(state.User));
    },
    loginUser: function loginUser(state, action) {
      var _action$payload = action.payload,
          email = _action$payload.email,
          password = _action$payload.password;
      var Data = JSON.parse(localStorage.getItem('User Data'));
      console.log(Data);

      if (email === Data[0].email && password === Data[0].password) {
        state.userData = Data;
        console.log('Logged in successfully');
        browserHistory.push('/');
        setTimeout(function () {
          window.location.reload();
        }, 1500);

        _sweetalert["default"].fire({
          title: "Successfully Logged In",
          text: "Do you want to continue",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(function (result) {
          console.log(result);
        })["catch"](function (error) {
          _sweetalert["default"].fire({
            title: "Error",
            text: error,
            icon: "error",
            confirmButtonText: "Ok"
          });
        });
      } else if (email !== Data[0].email || password !== Data[0].password) {
        _sweetalert["default"].fire({
          title: "Error",
          text: "Invalid email or password",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    },
    LogOutUser: function LogOutUser(state) {
      state.User = [];

      _jsCookie["default"].remove('User');

      localStorage.removeItem('User Data');
    }
  }
});
var _userSlice$actions = userSlice.actions,
    RegisterUser = _userSlice$actions.RegisterUser,
    loginUser = _userSlice$actions.loginUser,
    LogOutUser = _userSlice$actions.LogOutUser;
exports.LogOutUser = LogOutUser;
exports.loginUser = loginUser;
exports.RegisterUser = RegisterUser;
var _default = userSlice.reducer;
exports["default"] = _default;
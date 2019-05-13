import axios from "../axios-store";

export function login(info) {
  return {
    type: "LOGIN",
    payload: info.data,
  };
}

export function logout() {
  return function(dispatch) {
    axios.get('/api/auth/logout').then(res => {
      dispatch({
        type: 'LOGOUT'
      })
    })
  }
}
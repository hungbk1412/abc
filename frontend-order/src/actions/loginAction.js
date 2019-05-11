// import axios from "../axios-store";

export function login(info) {
  return {
    type: "LOGIN",
    payload: info.data,
  };
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
/* eslint-disable default-case */
export default function orderReducer(state = {
    username: null,
    roleId: null
}, action) {
    let username = state.username;
    let roleId = state.roleId
    switch (action.type) {
        case 'LOGIN':
            username = action.payload['username'];
            roleId = action.payload['userRole'];
            // console.log('action.payload', action.payload);
            break;
        case 'LOGOUT': 
            username = null;
            roleId = null;
            break;
    }
    return {
        ...state,
        username: username,
        roleId: roleId
    }
}
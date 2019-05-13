import React from 'react';
import NavigationBar from 'ordering/Navbar';
import Content from 'ordering/Content';
import Login from '../login/Login'
import { connect } from 'react-redux';
import Kitchen from '../kitchen/Kitchen';
import {logout} from '../actions/loginAction'
class Index extends React.Component {
    render() {
        // console.log('this.props.username', this.props.username)
        // console.log('this.props.foo', this.props.foo)
        let mainScreen = <Content/>
        if (!this.props.username || !this.props.roleId) {
            mainScreen = <Login />
        } else if (this.props.roleId === 2) {
            mainScreen = <Kitchen />
        }
        return (
            <div>
                <NavigationBar logout={this.props.logout} logoutBtn={ this.props.roleId ? true : false } />
                {mainScreen}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        username: state.auth.username,
        roleId: state.auth.roleId
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Index);
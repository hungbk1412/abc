import React from 'react';
import NavigationBar from 'ordering/Navbar';
import Content from 'ordering/Content';
import Login from '../login/Login'
import { connect } from 'react-redux';
import Kitchen from '../kitchen/Kitchen';
class Index extends React.Component {
    render() {
        // console.log('this.props.username', this.props.username)
        // console.log('this.props.foo', this.props.foo)
        let mainScreen = <Content/>
        if (!this.props.username || !this.props.roleId) {
            mainScreen = <Login />
        }
        return (
            <div>
                <NavigationBar/>
                {/* {mainScreen} */}
                <Kitchen />
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

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Index);
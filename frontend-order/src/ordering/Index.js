import React from 'react';
import NavigationBar from 'ordering/Navbar';
import Content from 'ordering/Content';
export default class Index extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Content/>
            </div>
        );
    }
}
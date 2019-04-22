import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import Index from 'ordering/Index';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App" id="root">
                    <Index/>
                </div>
            </Provider>
        );
    }
}

export default App;

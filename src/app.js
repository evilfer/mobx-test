import React from 'react';
import {observer, inject} from 'mobx-react';


@inject('store')
@observer
export class App extends React.Component {
    render() {
        let store = this.props.store;

        return (
            <div>
                <button onClick={() => store.dec()}>-</button>
                <span>{store.counter}</span>
                <button onClick={() => store.inc()}>+</button>
            </div>
        );
    }
}

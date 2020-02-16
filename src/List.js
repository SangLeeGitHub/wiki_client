import React, {Component} from 'react';

export default class List extends Component {

    render() {
        const {data} = this.props;
        let list;

        if (data == null) {
            list = 'There is no data.'
        } else {
            list = data.map(
                a => (
                    <div><a href={a}>{a}</a></div>
                )
            );
        }

        return (
            <div>
                <h1>Articles</h1>
                <div>{list}</div>
            </div>
        )
    }
};
import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import List from "./List"
import View from "./View"
import Edit from "./Edit"

class App extends Component {

    state = {articles: []};

    fetchAll()
    {
        fetch('/articles')
            .then(res => res.json())
            .then((r) => {
                this.setState({articles: r});
            })
    }
    
    componentDidMount()
    {
        this.fetchAll();
    }

    render()
    {
        const { articles } = this.state;
        let divStyle = {'text-align': 'center'}

        return (
            <div style={divStyle}>
                <Route exact path="/" component={() => <List data={articles}/>} />
                <Route exact path="/edit/:name" component={Edit}/>
                <Route exact path="/:name" component={View}/>
            </div>
        )
    }
}

export default App;

import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'

export default class View extends Component {

    state = {content: ''};

    fetchContent(name)
    {
        let error = false;

        fetch('/articles/' + name)
            .then((res) => {
                if (res.status === 404) error = true;
                return res;
            })
            .then(res => res.text())
            .then((r) => {
                if (error)
                    this.setState({content: 'No article with this exact name found. Use Edit button in the header to add it.'});
                else
                    this.setState({content: r});
            })
    }

    componentDidMount()
    {
        this.fetchContent(this.props.match.params.name);
    }

    handleEdit = (e) => {
        e.preventDefault();
        window.location.href = "/edit/" + this.props.match.params.name;
    };

    handleBack = (e) => {
        e.preventDefault();
        window.location.href = "/";
    };

    render() {
        return (
                <div>
                    <h5><button onClick={this.handleEdit}>Edit</button> &nbsp; <button onClick={this.handleBack}>Back</button></h5>
                    <h1>{this.props.match.params.name}</h1>
                    <hr />
                    <div><ReactMarkdown source={this.state.content} /></div>
                </div>
            );
    }
}
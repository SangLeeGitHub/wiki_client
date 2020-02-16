import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";

export default class Edit extends Component {

    state = {text: ''};

    fetchCont(name)
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
                    this.setState({text: ''});
                else
                    this.setState({text: r});
            })
    }

    componentDidMount()
    {
        this.fetchCont(this.props.match.params.name);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleCancel = (e) => {
        e.preventDefault();
        window.history.back();
    };

    handleSubmit = (e) => {
        // Avoid reload.
        e.preventDefault();
        // Avoid empty
        if (this.state.text === '')
        {
            alert("No empty");
            return;
        }

        fetch('/articles/' + this.props.match.params.name, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: this.state.text
        }).then((response) => {
            if (response.status >= 400)
            {
                throw new Error("Bad response from server");
            }
            console.log("create - response:", response);
            this.fetchAll();
            return response.json();
        }).then((data) => {
            console.log("create - data:", data);
        }).catch((err) => {
            console.log(err);
        });

        window.location.href = '/';
    };

    render() {
        let formStyle = {'text-align': 'center'}
        return (
            <>
                <h1>{this.props.match.params.name}</h1>
                <form onSubmit={this.handleSubmit} style={formStyle}>
                    <div>
                        <textarea
                            placeholder="Contents"
                            value={this.state.text}
                            onChange={this.handleChange}
                            name="text"
                            rows="15" cols="75">
                        </textarea>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>

                <h5> - - - - - - - - - Preview - - - - - - - - -</h5>
                <div><ReactMarkdown source={this.state.text} /></div>
            </>
        );
    }
};
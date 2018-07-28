import React, { Component } from 'react';
var axios = require('axios');

class PostEditor extends Component {

    state = {
        newBodyPost: '',
        username: '',
        email: '',
        posts: []
    };

    componentDidMount() {
        axios.get('/api/authentication/profile')
            .then(res => this.setState({ username: res.data.username, email: res.data.email }))
        this.getSavedPosts();
    }

    getSavedPosts = () => {
        let that = this;
        axios.get('/api/posts')
            .then(function (response) {
                console.log(response)
                that.setState({
                    posts: response.data
                })
            })
    }

    handleInput(event) {
        this.setState({
            newBodyPost: event.target.value
        })
    }

    addPost(newBodyPost) {
        console.log(this);
        console.log("in addPost");
        const postData = {
            username: this.state.username,
            email: this.state.email,
            post: this.state.newBodyPost

        }

        axios.post('/api/posts', postData)
            .then(function (response) {
            })
    }

    render() {
        return (
            <div>
                <div className="card post-editor">
                    <h4 className="card-title pt-2 pl-2 post-title"> Tell Us About Your Community's Environment </h4>
                    <div className="card-body">
                        <textarea className="form-control post-editor-input" value={this.state.newBodyPost} onChange={this.handleInput.bind(this)} />
                        <button className="btn post-editor-btn" onClick={this.addPost.bind(this)}> Post </button>
                    </div>
                </div>

                <div className="card post-body">
                    <div className="card-body user-comment">
                        {this.state.posts.slice(0,5).map(post => (
                            post.username + ": " +
                            post.post
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default PostEditor;
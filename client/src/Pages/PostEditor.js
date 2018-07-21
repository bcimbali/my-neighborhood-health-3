import React, { Component } from 'react';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBodyPost: '',
        };

        this.handleInput = this.handleInput.bind(this);
        this.createPost = this.createPost.bind(this);
    }
    
    handleInput(event) {
        this.setState({
            newBodyPost:event.target.value
        })
    }

    createPost () {
        this.props.addPost(this.state.newBodyPost);
        this.setState({
            newBodyPost:'',
        })
    }

    render () {
        return (
            <div className="card post-editor">
                    <div className="card-body">
                        <textarea className="form-control post-editor-input" value={this.state.newBodyPost} onChange={this.handleInput}/>
                        <button className="btn btn-success post-editor-btn" onClick={this.createPost}> Post </button>
                    </div>
                </div>
        )
    }
}

export default PostEditor;
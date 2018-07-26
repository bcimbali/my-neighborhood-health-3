import React, { Component } from 'react';
var axios = require('axios');
// import Post from "./../components/Post"

class PostEditor extends Component {
   
    state = {
            newBodyPost: '',
            username: '',
            email: '',
            posts: []
            
           
    };
    componentDidMount(){
        axios.get('/api/authentication/profile')
        .then(res => this.setState({username: res.data.username, email: res.data.email}))
        this.getSavedPosts();
       
    }
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         newBodyPost: '',
    //         username: '',
    //         email: '',
    //         id: '',
    //     };

        
    //     this.handleInput = this.handleInput.bind(this);
    //     this.createPost = this.createPost.bind(this);
    // }

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
            newBodyPost:event.target.value
        })
    }

    // createPost () {
    //     this.props.addPost(this.state.newBodyPost);
    //     this.setState({
    //         newBodyPost:'',
    //     })
       
    // }

    addPost(newBodyPost) {
        // const newState = Object.assign({}, this.state);
        // newState.posts.push(newBodyPost);
        // this.setState(newState);
       console.log(this);
       console.log("in addPost");
        const postData = {
            username: this.state.username,
            email: this.state.email,
            post: this.state.newBodyPost
            //email: "myemail",
            
		}
       
        axios.post('/api/posts', postData)
        .then(function (response) {
				
		})
    }
   

    render () {
        return (
            <div>
            <div className="card post-editor">
            authentication{this.state.email + this.state.username}
                    <div className="card-body">
                        <textarea className="form-control post-editor-input" value={this.state.newBodyPost} onChange={this.handleInput.bind(this)}/>
                        <button className="btn btn-success post-editor-btn" onClick={this.addPost.bind(this)}> Post </button>
                    </div>
                </div>
            
            <div>
            {/* <Post idx={idx} postBody={postBody}/> */}
            {this.state.posts.map(post =>(
                post.username + 
                post.post
            ))}
            </div>
        </div>
        )
    }
}

export default PostEditor;
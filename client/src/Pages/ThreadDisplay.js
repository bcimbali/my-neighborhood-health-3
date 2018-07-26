// import React, { Component } from 'react';
// import PostEditor from './PostEditor';
// import Post from '../components/Post';
// var axios = require('axios');

// class ThreadDisplay extends Component {
    
//     constructor(props) {
//         super(props);
//         this.addPost = this.addPost.bind(this);
//         this.state = {
//             posts: [],
//             username: '',
//             email: '',
//             id: '',
//         }
//     }
    

    
//     addPost(newBodyPost) {
//         const newState = Object.assign({}, this.state);
//         newState.posts.push(newBodyPost);
//         this.setState(newState);
//         axios.get('/api/authentication/profile')
//         .then(res => this.setState({username: res.data.username, email: res.data.email, id: res.data.id}))
       
//         const postData = {
// 			username: this.state.username,
//             email: this.state.email,
//             newBodyPost: this.state.newBodyPost
// 		}
       
//         axios.post('/api/posts', postData)
//         .then(function (response) {
				
// 		})
//     }

//     render () {
//         return (
//             <div>
//                 {
//                     this.state.posts.map((postBody, idx) => {
//                         return (
//                             <Post idx={idx} postBody={postBody}/>
//                         )
//                     })
//                 }
//                 <PostEditor addPost={this.addPost} />
//             </div>
//         );
//     }
// }

// export default ThreadDisplay;

import React, {Component} from "react";
import Post from '../../components/Post';
import "./Communities.css";
import PostEditor from '../PostEditor';

class Communities extends Component {
    constructor(props) {
        super(props);

        this.addPost = this.addPost.bind(this);


        this.state = {
            posts: [],
        }
    }

    addPost(newBodyPost) {
        const newState = Object.assign({}, this.state);
        newState.posts.push(newBodyPost);
        this.setState(newState);
    }


    render() {
        return (
            <div>
                {
                    this.state.posts.map((postBody, idx) => {
                        return (
                            <Post idx={idx} postBody={postBody}/>
                        )
                    })
                }
                <PostEditor addPost={this.addPost} />
            </div>
        );
    }
}

export default Communities;
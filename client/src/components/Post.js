import React from 'react';

const Post = (props) => (
    <div className="card post-body">
        <div className="card-body">
            {props.postBody}
        </div>
    </div>
);

export default Post;
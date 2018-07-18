import React, { Component } from "react";
import API from "../../utils/API";

class News extends Component {

    componentDidMount () {
        this.getArticles();
    };

    getArticles = () => {
        API.getArticles()
        .then(res => 
            {console.log(res)}
        )
        .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}

export default News;
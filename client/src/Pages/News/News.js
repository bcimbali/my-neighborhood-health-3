import React, { Component } from 'react';

import API from '../../utils/API';
import Article from '../../components/Article';
import Card from '../../components/Card';
import { List } from '../../components/List';

class News extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    API.getArticles()
      .then(res => {
        console.log(res.data.name);
        this.setState({
          articles: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Card title="Environmental News">
        {this.state.articles.length ? (
          <List>
            {this.state.articles.map(article => (
              <Article title={article.title} link={article.link} />
            ))}
          </List>
        ) : (
          <h2 className="text-center">No News</h2>
        )}
      </Card>
    );
  }
}

export default News;

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResult: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.setState({
      loading: true,
    });
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResult: parsedData.totalResults,
    });

    this.props.setProgress(100)
  }

  fetchMoreData = async () => {
    this.setState({
      loading: true,
      page: this.state.page + 1
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResult: parsedData.totalResults,
    });
  }

  

  render() {
    return (
      <div>
        <h1 className="my-5 text-center" style={{ margin: "50px 0px" }}>
          NewsMonkey {this.capitalizeFirstLetter(this.props.category)} headlines
        </h1>
        {this.state.loading && <Spinner />}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResult}
              loader={<Spinner/>}
            >
            <div className="container">
              <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
              </div>
            </div>
              
            </InfiniteScroll>
      </div>
    );
  }
}

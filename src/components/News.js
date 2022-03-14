import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1, 
            totalResult: 38
        }
    }

    async componentDidMount() {
      this.setState({
        loading: true
      })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        loading: false
      })
    }

    handlePrev = async () => {
      this.setState({
        loading: true
      })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }

    handleNext = async () => {
      this.setState({
        loading: true
      })
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      
    }


  render() {
      
    return (
      <div>
        <div className="container">
        {this.state.loading && <Spinner/>}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element) => 
                 <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
                </div>
              )}
            </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1}  type="button" onClick={this.handlePrev} className="btn btn-dark">Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} type="button" onClick={this.handleNext} className="btn btn-dark">Next</button>
        </div>
      </div>
    );
  }
}

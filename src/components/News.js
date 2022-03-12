import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1, 
            totalResults: 35
        }
    }

    async componentDidMount() {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles
      })
    }

    handlePrev = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
      })
    }

    handleNext = async () => {
      console.log("Next");
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=da6fee47702e40b3870c86883c80a824&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      })
      
    }


  render() {
      
    return (
      <div>
        <div className="container">
            <div className="row">
              {this.state.articles.map((element) => 
                 <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
                </div>
              )}
            </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1}  type="button" onClick={this.handlePrev} className="btn btn-dark">Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNext} className="btn btn-dark">Next</button>
        </div>
      </div>
    );
  }
}

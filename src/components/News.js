import React, { Component, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'



export default function News(props) {
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResult,setTotalResult] = useState(0)

  const [progress,setProgress] = useState(0)


  function progressSet (progress) {
    setProgress(progress)
  }

  const updateNews = async () => {
    setLoading(true)
    progressSet(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    progressSet(30)
    let parsedData = await data.json();
    progressSet(70)
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResult(parsedData.totalResults)
    progressSet(100)
  }

  
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;    
    updateNews()
  },[])
  

  const fetchMoreData = async () => {
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=da6fee47702e40b3870c86883c80a824&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
    setTotalResult(parsedData.totalResults)
  }

  

    return (
      <div>
      <LoadingBar
          color='#f11946'
          progress={progress}
                
      />
        <h1 className="text-center" style={{ marginTop: "80px",
        marginBottom: "30px" }}>
          NewsMonkey {capitalizeFirstLetter(props.category)} headlines
        </h1>
        {loading && <Spinner />}
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResult}
              loader={<Spinner/>}
            >
            <div className="container">
              <div className="row">
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    key={element.url}
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

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

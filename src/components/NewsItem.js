import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, date, author, source} = this.props;
    return (
      <div className='my-3'>
          <div className="card">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{zIndex: '1'}}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://www.journaldugeek.com/content/uploads/2022/03/testla3.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
          <span className="badge rounded-pill bg-danger">New</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text">Date: {new Date(date).toGMTString()}</p>
            <p className="card-text">Author: {!author? 'Unknown': author}</p>
            <a href={newsUrl} target="_blank" className="btn btn-primary bg-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    )
  }
}

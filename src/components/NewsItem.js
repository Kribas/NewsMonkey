import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
          <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl ? imageUrl : "https://www.journaldugeek.com/content/uploads/2022/03/testla3.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-primary bg-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    )
  }
}

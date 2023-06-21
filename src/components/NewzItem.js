import React, { Component } from 'react'

export default class NewzItem extends Component {
  render() {
    let { title, desc,imgUrl, newzUrl} = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl?imgUrl:"https://image.cnbcfm.com/api/v1/image/107245731-1684890805227-gettyimages-841810874-set04364_23august2017_vf373.jpeg?v=1687218163&w=1920&h=1080"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <a href={newzUrl} target='_blank' className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
          </div>
        </div>
      </>
    )
  }
} 

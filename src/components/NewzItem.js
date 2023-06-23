import React from 'react'

const NewzItem= (props)=>{
    let { title, desc, imgUrl, newzUrl, author, date,source } = props;
    return (
      <>
        <div className="card" style={{ minHeight: '500px' }}>
          <span className="position-absolute top-0 translate-middle badge bg-danger" style={{left:'90%',zIndex:1}}>{source}<span className="visually-hidden">unread messages</span></span>
          <img src={imgUrl ? imgUrl : "https://image.cnbcfm.com/api/v1/image/107245731-1684890805227-gettyimages-841810874-set04364_23august2017_vf373.jpeg?v=1687218163&w=1920&h=1080"} className="card-img-top" alt="..." style={{ height: '400px', width: '100%', objectFit: 'contain' }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="card-muted">By {author ? author : "Anonymous"} on {new Date(date).toGMTString().split('GMT')}</small></p>
            <a href={newzUrl} target='_blank' className="btn btn-sm btn-outline-dark" rel="noreferrer">Read More</a>
          </div>
        </div>
      </>
    )
  }
export default NewzItem

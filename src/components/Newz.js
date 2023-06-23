import React, { useEffect, useState } from 'react'
import NewzItem from './NewzItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const Newz = (props) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  

  const updateNewz = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  
  useEffect(() => {
    updateNewz()
    document.title = `${capitalizeFirstLetter(props.category)} - NewzApp`
    //eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };


  return (
    <>
      <h2 className='text-center mt-5' style={{margin:'35px 0px',marginTop:'90px'}}>NewzApp - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
      >
        <div className="container">
          <div className="row my-4">
            {articles.map((e) => {
              return <div className="col-md-4 my-3" key={e.url}>
                <NewzItem title={e.title ? e.title.slice(0, 40) : ""} desc={e.description ? e.description.slice(0, 80) : ""} imgUrl={e.urlToImage} newzUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
Newz.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}
Newz.propType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default Newz
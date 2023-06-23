import React, { Component } from 'react'
import NewzItem from './NewzItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newz extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  static PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewzApp`
  }

  async updateNewz() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a52210bccba740ad8a7ebc65d315703b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    this.props.setProgress(30)
    let data = await fetch(url)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNewz()
  }
  // handlePrev = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNewz()
  // }
  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNewz()
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a52210bccba740ad8a7ebc65d315703b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
          <h2 className='text-center mt-5'>NewzApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
          {this.state.loading && <Loading />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            >
            <div className="container">
              <div className="row my-4">
                {this.state.articles.map((e) => {
                  return <div className="col-md-4 my-3" key={e.url}>
                    <NewzItem title={e.title ? e.title.slice(0, 40) : ""} desc={e.description ? e.description.slice(0, 80) : ""} imgUrl={e.urlToImage} newzUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNext} id='next'>Next &rarr; </button>
            </div> */}
      </>
    )
  }
}

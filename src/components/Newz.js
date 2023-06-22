import React, { Component } from 'react'
import NewzItem from './NewzItem'
import Loading from './Loading';
import PropTypes from 'prop-types'

export default class Newz extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  static PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a52210bccba740ad8a7ebc65d315703b&page=1&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }
  handlePrev = async () => {
    if (document.getElementById("next").disabled) {
      document.getElementById("next").disabled = false;

    }
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a52210bccba740ad8a7ebc65d315703b&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })

    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false

    })

  }
  handleNext = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=a52210bccba740ad8a7ebc65d315703b&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })

    }
  }
  render() {
    return (
      <>
        <div className="container my-2">
          <h2 className='text-center'>NewzApp - Top Headlines</h2>
          {this.state.loading && <Loading />}
          <div className="row my-4">
            {!this.state.loading && this.state.articles.map((e) => {
              return <div className="col-md-4 my-3" key={e.url}>
                <NewzItem title={e.title ? e.title.slice(0, 40) : ""} desc={e.description ? e.description.slice(0, 80) : ""} imgUrl={e.urlToImage} newzUrl={e.url} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNext} id='next'>Next &rarr; </button>
          </div>
        </div>
      </>
    )
  }
}

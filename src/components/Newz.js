import React, { Component } from 'react'
import NewzItem from './NewzItem'

export default class Newz extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false };
  }
  async componentDidMount(){
    let url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=a52210bccba740ad8a7ebc65d315703b";
    let data =await fetch(url)
    let parsedData = await data.json()
    this.setState({articles:parsedData.articles})
  }
  render() {
    return (
      <>
        <div className="container my-2">
          <h2 className='text-center'>NewzApp - Top Headlines</h2>
          <div className="row my-4">
            {this.state.articles.map((e) => {
              return <div className="col-md-4 my-3" key={e.url}>
                <NewzItem  title={e.title?e.title.slice(0,40):""} desc={e.description?e.description.slice(0,80):""} imgUrl={e.urlToImage} newzUrl={e.url} />
              </div>
            })}
          </div>
        </div>
      </>
    )
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import {BookItem} from './App';
import './App.css';
const convert = require('xml-js');

export default class GoodReadsClient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue:'',
            searchResult:[],
            pageNumbers:[],
            requestedPage:1,
            noResultFound:false
        }
    }
    onSearchClick(e){
        console.log("Event onSearchClick:", e.target, this.state);
        let dataAsJson;
        let dataAsJson1;
        const requestApi = `search/index.xml?key=qguaUP3yguOOrMvBCpg&q=${this.state.searchValue}`;
          fetch(requestApi,{
            headers:{
                "accepts":"text/xml"
            },
             method: 'GET',
            credentials: 'include'
           })
          .then(response => 
                response.text())
           .then(data => {
            dataAsJson = JSON.parse(convert.xml2json(data,{compact:true}));
            dataAsJson1 = dataAsJson.GoodreadsResponse.search.results.work;
           console.log("dataAsJson::",dataAsJson,dataAsJson1);
           const totalReslt  = dataAsJson.GoodreadsResponse.search['total-results']._text;
            if(totalReslt>0){
              this.setState({ searchResult:dataAsJson1});
           const pageNumbers = []; 
           for (let i = 1; (i <= Math.ceil(totalReslt / 20) && i<=100); i++) {
             pageNumbers.push(i);
           }
           console.log("state::", this.state,pageNumbers);
           this.setState({pageNumbers:pageNumbers});
            }else{
              this.setState({noResultFound:true, searchValue:''});
            }   
        })
          .catch(err => console.error(err));    
    }
    onChangeSearchQuery(e){
        console.log("onChangeSearchQuery", e.target);
        this.setState({searchValue:e.target.value});
    }
    handlePageClick(e){
      let dataAsJson;
      let dataAsJson1;
      let requestedPage = e.target.id;
      const requestApi = `search/index.xml?key=qguaUP3yguOOrMvBCpg&q=${this.state.searchValue}&page=${requestedPage}`;
        fetch(requestApi,{
          headers:{
              "accepts":"text/xml"
          },
           method: 'GET',
          credentials: 'include'
         })
        .then(response => 
              response.text())
         .then(data => {
          dataAsJson = JSON.parse(convert.xml2json(data,{compact:true}));
          dataAsJson1 = dataAsJson.GoodreadsResponse.search.results.work;
         console.log("dataAsJson::",dataAsJson,dataAsJson1);
            this.setState({requestedPage:requestedPage,searchResult:dataAsJson1});
         
      })
        .catch(err => console.error(err));
      // this.setState({searchValue:''});
      
    }
    render(){
        const renderPageNumbers = this.state.pageNumbers.map(number => {
            return (
              <li
                key={number}
                id={number}
                onClick={(e)=>this.handlePageClick(e)}
              >
                {number}
              </li>
            );
          });
  
        return(
            <div>
                <div>
                    <h2>GoodReads Client</h2>
                </div>
                <hr/>
                <div>
                    <input type="text" id="searchBox" name="serchBox" value={this.state.searchValue} onChange={(e)=>{this.onChangeSearchQuery(e)}}/>
                    <button id="searchButton" onClick={(e)=>{this.onSearchClick(e)}}>Search</button>
                </div>
                <hr/>
                <div className="ui items">
                <BookItem listItems={this.state.searchResult}/>
                </div>
               <ul id ="page-numbers">
               {renderPageNumbers}
               </ul>
              {this.state.noResultFound?<h4>No Result Found</h4>:null}
            </div>
        )
    }
}
ReactDOM.render(<GoodReadsClient/>, document.querySelector('#root'));

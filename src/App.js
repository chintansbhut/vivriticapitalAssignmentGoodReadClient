import React from 'react';

export const BookItem = (props)=>{
  console.log("props", props);
return(
  props.listItems.map((item , index)=>
        <div className="item" key ={index}>
            <div className="ui tiny image">
                <img alt='bookImage' src={item.best_book.image_url._text}/>
            </div>
            <div className="content">
                <a href="/"className="header">{item.best_book.title._text}</a>
                <div className="meta">
                  <span>{item.best_book.author.name._text}</span>
               
                </div>
                <div className="description">
                  <p></p>
                </div>
                <div className="extra">
                Average Rating {item.average_rating._text}
                </div>
            </div>
        </div>
  )

);
}

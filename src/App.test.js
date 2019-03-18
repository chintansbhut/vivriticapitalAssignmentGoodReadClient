import React from 'react';
import ReactDOM from 'react-dom';
import {BookItem} from './App';

it('renders App component without crashing', () => {
  const div = document.createElement('div');
  let listItems = [
    {
    average_rating: {_text: "3.67"},
    best_book: { 
        author:{
          name:{
            _text: "Luke   Jackson"
          }
        },
        image_url: {
          _text: "https://images.gr-assets.com/books/1455943724m/27157754.jpg"
        },
        title:{
          _text: "Sex, Drugs and Asperger's Syndrome (ASD): A User Guide to"
        }
    }
  }]
  ReactDOM.render(<BookItem  listItems={listItems}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';

class SearchList extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
  };

  render(){
      return (
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book) => <Book book={book} key={book.id} onBookUpdate={this.props.onBookUpdate}/>)}
          </ol>
        </div>
      );
  };

}

export default SearchList;
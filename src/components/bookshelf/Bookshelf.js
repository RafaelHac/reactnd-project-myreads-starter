import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';

class Bookshelf extends Component{
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    };

    render(){
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.books.map((book) => <Book book={book} key={book.id} onBookUpdate = {this.props.onBookUpdate}/>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Bookshelf;
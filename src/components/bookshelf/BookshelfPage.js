import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class BookshelfPage extends Component{
    static propTypes = {
        allBooks: PropTypes.object.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    };

    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf shelfName="Currently Reading" books = {this.props.allBooks.currentlyReading} onBookUpdate = {this.props.onBookUpdate}/>
                        <Bookshelf shelfName="Want to Read" books = {this.props.allBooks.wantToRead} onBookUpdate = {this.props.onBookUpdate}/>
                        <Bookshelf shelfName="Read" books = {this.props.allBooks.read} onBookUpdate = {this.props.onBookUpdate}/>
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search'>
                        <button>
                            Add a book
                        </button>
                    </Link>   
                </div>
            </div>
        );
    };
}

export default BookshelfPage;
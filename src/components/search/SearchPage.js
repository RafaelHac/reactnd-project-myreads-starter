import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../BooksAPI';
import { Link } from 'react-router-dom';
import SearchList from './SearchList';

class SearchPage extends Component{
  static propTypes = {
    defineBookshelf: PropTypes.func.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
  };
  
  state = {
    bookSearch : [],
    query: '',
  };

  //Ao atualizar campo de busca
  onUpdateQuery = (query) => {
    this.setState(() => ({
        query: query.trim(),
    }));
    this.searchBooks(this.state.query);
  };

  //Procurar livros na API
  searchBooks = (query) => {
    //Limpar lista de resultados quando query vazia
    if(query === ''){
      this.setState(() => ({
        bookSearch: []
      }));
      return false;
    }
    //Busca na API
    BooksAPI.search(query).then(
      (results) => {
        Array.isArray(results) ? 
          this.setState(() => ({
            //Definir bookshelf dos resultados encontrados
            bookSearch: results.map((result) => this.props.defineBookshelf(result))
          })) :
          this.setState(() => ({
            bookSearch: []
          }));
      }
    );
  };

  render(){
    const {query} = this.state;
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
              to='/'
            className='close-search'
          >Return</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-contacts'
              type='text'
              placeholder='Search Contacts'
              value = {query}
              onChange = {(event) => this.onUpdateQuery(event.target.value)}
            />
          </div>
        </div>   
        <SearchList books={this.state.bookSearch} onBookUpdate = {this.props.onBookUpdate}/>
      </div>
    );
  };
}

export default SearchPage;
import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import SearchPage from './components/search/SearchPage';
import BookshelfPage from './components/bookshelf/BookshelfPage';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  //Carregar livros salvos na API apos montar componentes
  componentDidMount(){
    this.loadBooks();
  }

  //Carregar livros da API
  loadBooks = () => {
    BooksAPI.getAll().then((books) => {
      //Separar livros de cada bookshelf para atribuir ao state
      const shelf = {
        currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
        wantToRead: books.filter((book) => book.shelf === "wantToRead"),
        read: books.filter((book) => book.shelf === "read"),
      }
      this.setState(shelf);
    });
  };

  //Atualizar bookshelf do livro alterado
  updateBook = (book, shelf) => {
    //Atualizar na API
    BooksAPI.update(book, shelf).then((result) => {
      const oldShelf = book.shelf;
      //remover livro da bookshelf antiga
      if(oldShelf !== "none"){
        let bookList = this.state[oldShelf].filter((b) => b.id !== book.id);
        this.setState((currentState) => currentState[oldShelf] = bookList);
      }
      //Atualizar livro
      book.shelf = shelf;
      //Adicionar livro na nova bookshelf
      shelf !== "none" && this.setState((currentState) => currentState[shelf].push(book));
    });
  };

  //Verificar e atualizar a qual bookshelf pertence o livro
  checkBookShelf = (book) => {
    book.shelf = "none";
    const {currentlyReading, wantToRead, read} = this.state;
    
    //Verificar qual bookshelf tem o livro e atualizar o valor no livro
    if(currentlyReading.find((b) => b.id === book.id)){
      book.shelf = "currentlyReading";
    }
    else if (wantToRead.find((b) => b.id === book.id)){
      book.shelf = "wantToRead";
    }
    else if (read.find((b) => b.id === book.id)){
      book.shelf = "read";
    }
    return book;
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render = {() => (
          <BookshelfPage allBooks = {this.state} onBookUpdate = {this.updateBook}/>
        )}/>
        <Route path='/search' render = {() => (
          <SearchPage defineBookshelf = {this.checkBookShelf} onBookUpdate = {this.updateBook}/> 
        )}/>
      </div>
    )
  }
}

export default BooksApp

import React, { Component, Fragment } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import actionsCreators from '/redux/book/actions'

import Book from './components/Book';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import styles from './styles.scss';
import { connect } from 'react-redux';

class App extends Component {
  
  componentDidMount() {
    this.props.getBooks();
  }

  CONFIGURATION_BUTTON = {
    add: {
      text: 'Add to cart',
      function: this.props.addToCart
    },
    remove: {
      text: 'Remove',
      function: this.props.removeItem,
      isDanger: true
    }
  };

  renderBooks = item => {
    const showButton = !this.props.bookSelected.some(el => el.id === item.id);
    const configButton = showButton ? this.CONFIGURATION_BUTTON.add : this.CONFIGURATION_BUTTON.remove;
    return <Book key={item.id} data={item} configButton={configButton} />;
  };

  render() {
    const { books, bookSelected, onSearch, addItem, removeItem } = this.props;
    return (
      <Fragment>
        <Navbar />
        <div className={styles.container}>
          <Search onSearch={onSearch} />
          {books.length ? (
            books.map(this.renderBooks)
          ) : (
              <div className={styles.noData}>
                <h2 className={styles.title}>No Data</h2>
              </div>
            )}
        </div>
        {bookSelected.length ? (
          <ShoppingCart data={bookSelected} addItem={addItem} removeItem={removeItem} />
        ) : null}
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.books,
  bookSelected: state.books.bookSelected
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(actionsCreators.getBooks()),
  removeItem: itemId => dispatch(actionsCreators.removeItem(itemId)),
  addToCart: item => dispatch(actionsCreators.addToCart(item)),
  onSearch: value => dispatch(actionsCreators.searchBook(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

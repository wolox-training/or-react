import React, { Component, Fragment } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

import Book from './components/Book';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import styles from './styles.scss';
import { connect } from 'react-redux';

class App extends Component {
  props: any;

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
    return (
      <Fragment>
        <Navbar />
        <div className={styles.container}>
          <Search onSearch={this.props.onSearch} />
          {this.props.books.length ? (
            this.props.books.map(this.renderBooks)
          ) : (
              <div className={styles.noData}>
                <h2 className={styles.title}>No Data</h2>
              </div>
            )}
        </div>
        {this.props.bookSelected.length ? (
          <ShoppingCart data={this.props.bookSelected} addItem={this.props.addItem} removeItem={this.props.removeItem} />
        ) : null}
        <Footer />
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    books: state.books.books,
    bookSelected: state.books.bookSelected
  };
};


const mapDispatchToProps = dispatch => {
  return {
    getBooks: () => {
      dispatch({type: '@@BOOK/GET_BOOKS'});
    },
    removeItem: (itemId) => {
      dispatch({type: '@@BOOK/REMOVE_ITEM', itemId});
    },
    addToCart: (item) =>  {
      dispatch({type: '@@BOOK/ADD_TO_CART', item});
    },
    addItem: (itemId) =>  {
      dispatch({type: '@@BOOK/ADD_ITEM', itemId});
    },
    onSearch: (value) =>  {
      dispatch({type: '@@BOOK/SEARCH_ITEM', value});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

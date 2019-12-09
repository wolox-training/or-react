import React, { PureComponent, Fragment } from 'react';
import { arrayOf, func } from 'prop-types';
import { bookSelectedPropType } from '@constants/propTypes';
import Button from '@components/Button';
import { connect } from 'react-redux';

import Item from './components/Item';
import styles from './styles.scss';

class ShoppingCart extends PureComponent {

  total = (accumulator, currentValue) => accumulator + currentValue.quantity;

  renderItem = item => {
    //console.log(this.props);
    const { addItem, removeItem } = this.props;
    return <Item key={item.id} item={item} addItem={addItem} removeItem={removeItem} />;
  };

  render() {
    // const { data } = this.props;

    return (
      <Fragment>
        <Button className={styles.buttonCart} onClick={this.props.toggleContent}>
          <i className="fa fa-shopping-cart" />
        </Button>
        <div className={`${styles.container} ${this.props.open ? styles.open : ''}`}>
          <h1 className={styles.title}>Cart</h1>
          <ul className={styles.content}>{this.props.bookSelected.map(this.renderItem)}</ul>
          <h2 className={`${styles.title} ${styles.total}`}>Total: {this.props.bookSelected.reduce(this.total, 0)}</h2>
        </div>
      </Fragment>
    );
  }
}

ShoppingCart.propTypes = {
  data: arrayOf(bookSelectedPropType).isRequired,
  addItem: func.isRequired,
  removeItem: func.isRequired
};

const mapStateToProps = state => {
  return {
    open: state.plays.open,
    bookSelected: state.books.bookSelected
  };
};

const mapDispatchToProps = dispatch => ({
  removeItem: (itemId) => dispatch({ type: '@@BOOK/REMOVE_ITEM', itemId }),
  addItem: (itemId) => dispatch({ type: '@@BOOK/ADD_ITEM', itemId }),
  toggleContent: () => dispatch({ type: '@@CART/TOGGLE_CONTENT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

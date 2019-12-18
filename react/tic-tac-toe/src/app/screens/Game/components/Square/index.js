import React, { Component } from 'react';
import styles from './styles.module.scss';

class Square extends Component {

  handleClick = () => {
    const { onClick, i } = this.props;
    onClick(i);
  }
  
  render() {
    const { value } = this.props
    return (
      <button
        className={styles.square}
        onClick={this.handleClick}
      >
        {value}
      </button>
    );
  }
}

export default Square;


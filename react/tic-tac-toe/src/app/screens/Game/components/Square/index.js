import React, { Component } from 'react';
import styles from './styles.module.scss';

class Square extends Component {

  render() {
    const { onClick, value, i } = this.props
    return (
      <button
        className={styles.square}
        onClick = {() => onClick(i)}
      >
        {value}
      </button>
    );
  }
}

export default Square;

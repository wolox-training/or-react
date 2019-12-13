import React, { Component } from 'react';
import Square from '../Square';
import styles from './styles.module.scss';

class Board extends Component {

  squarePosition(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className={styles.boardRow}>
          {this.squarePosition(0)}
          {this.squarePosition(1)}
          {this.squarePosition(2)}
        </div>
        <div className={styles.boardRow}>
          {this.squarePosition(3)}
          {this.squarePosition(4)}
          {this.squarePosition(5)}
        </div>
        <div className={styles.boardRow}>
          {this.squarePosition(6)}
          {this.squarePosition(7)}
          {this.squarePosition(8)}
        </div>
      </div>
    );
  }
}

export default Board;

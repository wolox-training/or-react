import React, { Component } from 'react';
import Board from './components/Board';
import calculateWinner from '/utils/utils.js';
import styles from './styles.module.scss';
import api from '/services/MatchesService.js';
var Spinner = require('react-spinkit');

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
    matches: []
  };
  
  componentDidMount() {
    api.getMatches()
      .then(function (val) {
        let items = val.data.map((item) => {
          return (
            <li>{item.player_one}</li>
          )
        });
        console.log(items);
      //  this.setState ({matches: items});
      });
  }

  handleClick(i) {
    const { history, xIsNext } = this.state;
    var steps = history.slice(0, this.state.stepNumber + 1);
    const current = steps[steps.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: steps.concat([{
        squares: squares,
      }]),
      stepNumber: steps.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const renderMoves = (step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    }

    const moves = history.map(renderMoves);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className={styles.game}>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
        <Spinner name="circle" />
        <ol></ol></div>
      </div>
    );
  }
}

export default Game;
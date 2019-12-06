import React from 'react';
import styles from './styles.module.scss';

function Square({ onClick,value }) {
  return (
    <button 
      className={styles.square} 
      onClick={ onClick }
      >
      {value}
    </button>
  );
}

export default Square;

import React from 'react';

export default function Tile({ number, id, image }) {
  if (number % 2 === 0) {
    return <div id={id}
      style={{
        width: 64,
        height: 64,
        backgroundColor: '#242424'
      }}>{id}        
      </div>
  } else {
    return <div id={id}
      style={{
        width: 64,
        height: 64,
        backgroundColor: '#7E7E7E'
      }}>{id}</div>
  }
}
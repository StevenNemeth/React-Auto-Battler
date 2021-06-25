import React from "react";

export default function OverHeads({ boardHeros }) {




  return <div id={`overHeads-${boardHeros.slice(-1).pop().id}`} className='overhead' style={{
    top: boardHeros.slice(-1).pop().top,
    left: boardHeros.slice(-1).pop().left,
    position: 'absolute', 

  }}>
    <div className='Health' style={{
      background: 'red',
      width: 32,
      position: 'relative',
      height: 8,
      marginLeft: '16px',
      visibility: 'hidden'
    }}>
    </div>
    <div className='Mana' style={{
      background: 'cyan',
      width: 32,
      position: 'relative',
      height: 8,
      marginLeft: '16px',
      visibility: 'hidden'
    }}>
    </div>
    <div id={boardHeros.slice(-1).pop().id} style={{
      background: boardHeros.slice(-1).pop().heroName,
      width: 32,
      height: 32,
      position: 'relative',
      marginLeft: '16px',
    }}>
    </div>
  </div>
}
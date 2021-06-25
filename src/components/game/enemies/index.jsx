import React, { useState } from 'react';

export default function EnemySetup({ round, setBoardEnemies2, boardEnemies2 }) {

  const enemyRoundSetup = {
    1: {
      enemies: 2,
      enemeyName: 'bruce',
      enemeyImg: 'url(/sprites/enemies/bruce.png) no-repeat',
      enemiesStartingPos: [{
        startingTop: '64px',
        startingLeft: '128px'
      },
      {
        startingTop: '64px',
        startingLeft: '320px'
      }]
    }

  }

  const enemiesArr = []


  

  for(let i = 0; i < enemyRoundSetup[round].enemies; i++){    

    enemiesArr.push(<div className='enemy' style={{
      top: enemyRoundSetup[round].enemiesStartingPos[i].startingTop,
      left: enemyRoundSetup[round].enemiesStartingPos[i].startingLeft,
      position: 'absolute',
  
    }}>
      <div className='Enemy-Health' style={{
        background: 'red',
        width: 32,
        position: 'relative',
        height: 8,
        marginLeft: '16px',
        visibility: 'hidden'
      }}>
      </div>
      <div className='Enemy-Mana' style={{
        background: 'cyan',
        width: 32,
        position: 'relative',
        height: 8,
        marginLeft: '16px',
        visibility: 'hidden'
      }}>
      </div>
      <div id='enemey' style={{
        background: enemyRoundSetup[round].enemeyImg,
        width: 32,
        height: 32,
        position: 'relative',
        marginLeft: '16px',
      }}>
      </div>
    </div>)
  console.log(enemiesArr)

}
return enemiesArr
}
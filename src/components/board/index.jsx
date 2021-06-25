import React, { useState } from 'react';
import Tile from '../tile'
import Bench from '../bench'
import Overheads from '../ui/unit-overheads'


export default function Board({ setMoney, setBenchHeros, startRoundHealthMana, benchHeros, setBoardHeros, boardHeros, maxHeroCapacity, Overheads }) {
  let board = []
  let bench = []
  
  const verticalAxis = [' 7',' 6', ' 5', ' 4', ' 3', ' 2', ' 1', ' 0']
  const horizontalAxis = [ '0','1', '2', '3', '4', '5', '6', '7']  
  let activeHero = null;
  let xStart = null;
  let yStart = null



  function moveHero(e) {
    if (activeHero) {
      const x = e.clientX - 32
      const y = e.clientY - 32
      activeHero.style.position = 'absolute'
      activeHero.style.left = `${x}px`
      activeHero.style.top = `${y}px`


    }
  }

  function grabHero(e) {
    const element =  e.target
    if (element.style.background) {
      element.style.position = 'absolute'
      const x = e.clientX - 32
      const y = e.clientY - 32
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      activeHero = element

      xStart = Math.floor(e.clientX / 64)
      yStart = Math.floor(e.clientY / 64)
      console.log(xStart, yStart, activeHero, e.target,'xStart yStart grabHero')

    }
  }

  function dropHero(e) {

    if (activeHero) {
      const x = Math.floor(e.clientX / 64)
      const y = Math.floor(e.clientY / 64)
      console.log(x, y, 'x', 'y', 'drophero')



      activeHero.hidden = true;
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      activeHero.hidden = false;
      if (elemBelow.id !== activeHero.id && elemBelow.style.background && activeHero.style.background) {
        elemBelow.style.left = `${xStart * 64}px`
        elemBelow.style.top = `${yStart * 64}px`

      }
      console.log('elembelow', elemBelow, 'activeHero', activeHero)
      if (elemBelow.id === 'trash-can') {
        // selling a tier 1 unit should set money +2 
        setMoney(prevMoney => prevMoney + 2)
        console.log(benchHeros, activeHero.id, 'heros drophero sold')
        benchHeros.splice(activeHero.id, 1)
        activeHero.remove()
      } //if combining same units
      if (elemBelow.style.background === activeHero.style.background && elemBelow.id !== 'trash-can') {
        elemBelow.style.background = 'url("/sprites/heros/hero0tier2.png") no-repeat'
        benchHeros.splice(activeHero.id, 1)
        activeHero.remove()

      }// if moving hero to target tile on board
      if (activeHero && x >= 0 && y > 0 && x < 8 && y < 8) {

        activeHero.style.left = `${x * 64}px`
        activeHero.style.top = `${y * 64}px`
        // if moving unit from starting position on bench to board and there is room
        if(yStart > 7 && boardHeros.length < maxHeroCapacity) {
          console.log('moved into board', boardHeros)
          setBoardHeros([...boardHeros, {
            heroName: activeHero.style.background,
            id: x + ' ' + y,
            top: activeHero.style.top,
            left: activeHero.style.left,
            startingTop: activeHero.style.top,
            startingLeft: activeHero.style.left,
            prevX: x,
            prevY: y,
            x: x,
            y: y,            
            dir: null,
            visibile: 'visible'          

          }])                    

          benchHeros.splice(activeHero.id, 1)
          console.log('board', boardHeros,)
          activeHero.remove()
        }
        if (activeHero && x >= 0 && y > 0 && x < 8 && y < 8 && yStart <8) activeHero = null

      }//bench
      if(activeHero && x >= 0 && y > 7 && x < 8 && y < 10) {
        console.log('bench')
        activeHero.style.left = `${x * 64}px`
        activeHero.style.top = `${y * 64}px`
        activeHero = null
      }
      else if (activeHero && boardHeros.length >= maxHeroCapacity && yStart > 7) {
        console.log('rejected')
        activeHero.style.left = `${xStart * 64}px`
        activeHero.style.top = `${yStart * 64}px`
        activeHero = null

      }

    }
  }

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2
      const id = horizontalAxis[i] + verticalAxis[j]

      board.push(<Tile number={number} id={id} />
      )
    }
  }
  for (let k = 0; k < 16; k++) {
    
      const id = 'bench' + k      
      bench.push(<Bench id={id} />)
    }
  


  return <div id='board'
    onMouseMove={e => moveHero(e)}
    onMouseDown={e => grabHero(e)}
    onMouseUp={e => dropHero(e)} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 64px)',
      gridTemplateRows: 'repeat(8, 64px)',
      width: 512,
      height: 640,
    }}>{board}{bench}</div>
}

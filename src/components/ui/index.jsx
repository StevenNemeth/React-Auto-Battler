import React, { useState } from "react";
import Overheads from '../ui/unit-overheads'

export default function UI({ boardEnemies, numBoardEnemies, setRound, setLiveRound, benchHeros, setBenchHeros, boardHeros, setMoney, money, lives, heroCapacityCost, heroCapacity, maxHeroCapacity, setHeroCapacity, setHeroCapacityCost, setMaxHeroCapacity, round }) {

  let fight = false
  const enemyPositionLeft = ['2', '5']
  const enemyPositionTop = ['1', '1']
  const enemyPositions = [{
    x: 2,
    y: 1
  },
  {
    x: 5,
    y: 1,
  }]
  let xDistance = 0
  let yDistance = 0
  let totalDistance = 0
  let target = {}
  let moved = false
  let withinMeleeRange = {above: -1,
    right: 1,
    below: 1,
    left: -1
  }

  function startRound() {



    setLiveRound(current => !current)

    let randomMoveTop = null
    let randomMoveLeft = null
    let win = false


    let count = 0
    const battleDuration = setInterval(() => {
      for (let o = 0; o < numBoardEnemies[round - 1]; o++) {
        document.getElementsByClassName('Enemy-Health')[o].style.visibility = 'visible'
        document.getElementsByClassName('Enemy-Mana')[o].style.visibility = 'visible'
      }


      for (let i = 0; i < boardHeros.length; i++) {
        document.getElementsByClassName('Health')[i].style.visibility = 'visible'
        document.getElementsByClassName('Mana')[i].style.visibility = 'visible'
        count += 1
        // console.log(count, 'count')
        let distArr = []

        let moveHero = document.getElementById(`overHeads-${boardHeros[i].id}`)
        randomMoveTop = Math.floor(Math.random() * 3)
        randomMoveLeft = Math.floor(Math.random() * 3)

        const yTile = Math.floor(Number(moveHero.style.top.slice(0, -2)) / 64)
        const xTile = Math.floor(Number(moveHero.style.left.slice(0, -2)) / 64)
        for (let j = 0; j < enemyPositionLeft.length; j++) {
          randomMoveTop = Math.floor(Math.random() * 3)
          randomMoveLeft = Math.floor(Math.random() * 3)


          // if (randomMoveTop === 0 && y > 0) { // move up
          //   moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
          //   boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
          //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${96}px`
          //   boardHeros[i].dir = 'up'
          //   // console.log('up', boardHeros)
          // }
          // if (randomMoveLeft === 0 && x > 0) { // move left
          //   moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
          //   boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
          //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${32}px`
          //   boardHeros[i].dir = 'left'
          //   // console.log('left', boardHeros)
          // }
          // if (randomMoveTop === 1 && y < 7) { // move down
          //   moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
          //   boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
          //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px ${0}px`
          //   boardHeros[i].dir = 'down'
          //   // console.log('down')
          // }
          // if (randomMoveLeft === 1 && x < 7) { // move right
          //   moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
          //   boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
          //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${64}px`
          //   boardHeros[i].dir = 'right'
          //   // console.log('right')
          // }



          // enemyPositionLeft[j] -= 1
          // if(enemyPositions[j].y < 7){
          //   enemyPositions[j].y += 1
          //   document.getElementsByClassName('enemy')[j].style.top =  Number(document.getElementsByClassName('enemy')[j].style.top.slice(0, -2)) + 64 + 'px'
          // }
          // document.getElementsByClassName('enemy')[j].style.left =  Number(document.getElementsByClassName('enemy')[j].style.left.slice(0, -2)) + 64 + 'px'

          xDistance = Math.abs(xTile - enemyPositionLeft[j])
          yDistance = Math.abs(yTile - enemyPositionTop[j])
          totalDistance = xDistance + yDistance
          distArr.push(totalDistance)
          if (j === 1) {
            if (distArr[j] < distArr[j - 1]) {
              target = {
                x: enemyPositions[j].x,
                y: enemyPositions[j].y,
                xDistance: xDistance,
                yDistance: yDistance,
                tilesSurroundingTarget: 
                  enemyPositions[j].x + 1 + ' ' + enemyPositions[j].y ||
                  enemyPositions[j].x - 1 + ' ' + enemyPositions[j].y ||
                  enemyPositions[j].x + ' ' + enemyPositions[j].y + 1 ||
                  enemyPositions[j].x + ' ' + enemyPositions[j].y - 1              
                
              }

            }
            else {
              target = {
                x: enemyPositions[j - 1].x,
                y: enemyPositions[j - 1].y,
                xDistance: xDistance,
                yDistance: yDistance,
                tilesSurroundingTarget: [
                  enemyPositions[j - 1].x + 1 + ' ' + enemyPositions[j - 1].y,
                  enemyPositions[j - 1].x - 1 + ' ' + enemyPositions[j - 1].y,
                  enemyPositions[j - 1].x + ' ' + enemyPositions[j - 1].y + 1,
                  enemyPositions[j - 1].x + ' ' + enemyPositions[j - 1].y - 1,                
                ],
              }
            }
          }


          // console.log(totalDistance, distArr, target, `total dist to ${enemyPositionLeft[j]} ${enemyPositionTop[j]} from ${xTile} ${yTile} is ${totalDistance} `)

        }
                //if this hero y value is greater (below on board) target y move up
            if (boardHeros[i].y > target.y + 1 && !moved) {
              boardHeros[i].wantsToMove = 'up'
                console.log(`Hero at ${boardHeros[i].x + ' ' + boardHeros[i].y} wants to move to ${boardHeros[i].x} ${boardHeros[i].y - 1} `)
    
                console.log('moving up')
                moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
                boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
                moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${96}px`
                boardHeros[i].dir = 'up'
                boardHeros[i].y = Math.floor(Number(moveHero.style.top.slice(0, -2)) / 64)
                boardHeros[i].pos = boardHeros[i].x + ' ' + boardHeros[i].y 
                moved = true



            }          
            if (boardHeros[i].x < target.x &&  !moved && target.xDistance >= target.yDistance) {
              boardHeros[i].wantsToMove = 'right'
              console.log(`Hero at ${boardHeros[i].x + ' ' + boardHeros[i].y} wants to move to ${boardHeros[i].x + 1 + ' ' + boardHeros[i].y} `)
              
              console.log('moving right')
              moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
              boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
              moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${64}px`
              boardHeros[i].dir = 'right'
              boardHeros[i].x = Math.floor(Number(moveHero.style.left.slice(0, -2)) / 64)
              moved = true

            }
            if (boardHeros[i].x > target.x && !moved) {
              boardHeros[i].wantsToMove = 'left'
              console.log(`Hero at ${boardHeros[i].x + ' ' + boardHeros[i].y} wants to move to ${boardHeros[i].x - 1 + ' ' + boardHeros[i].y} `)
              
              console.log('moving left')
              moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
              boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
              moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${64}px`
              boardHeros[i].dir = 'left'
              boardHeros[i].x = Math.floor(Number(moveHero.style.left.slice(0, -2)) / 64)
              moved = true

            }
            if (boardHeros[i].y < target.y + 1 && !moved) {
              boardHeros[i].wantsToMove = 'down'
              console.log(`Hero at ${boardHeros[i].x + ' ' + boardHeros[i].y} wants to move to ${boardHeros[i].x} ${boardHeros[i].y + 1} `)
             
              moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
              boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
              moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${96}px`
              boardHeros[i].dir = 'down'
              boardHeros[i].y = Math.floor(Number(moveHero.style.top.slice(0, -2)) / 64)
              moved = true                   
            }

            if (i === boardHeros.length){
              for(let r = 0; r < boardHeros.length; r++){
                if(boardHeros[r].wantsToMove === 'up'){
                  
                }
              }
            }


          
          moved = false 
          console.log(boardHeros)    



        //     randomMoveTop = 
        //     randomMoveLeft =

        //   }
        // console.log(boardEnemies, 'board enemies')

        // if (randomMoveTop === 0 && y > 0) { // move up
        //   moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
        //   boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) - 64 + 'px'
        //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${96}px`
        //   boardHeros[i].dir = 'up'
        //   // console.log('up', boardHeros)
        // }
        // if (randomMoveLeft === 0 && x > 0) { // move left
        //   moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
        //   boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) - 64 + 'px'
        //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${32}px`
        //   boardHeros[i].dir = 'left'
        //   // console.log('left', boardHeros)
        // }
        // if (randomMoveTop === 1 && y < 7) { // move down
        //   moveHero.style.top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
        //   boardHeros[i].top = Number(moveHero.style.top.slice(0, -2)) + 64 + 'px'
        //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px ${0}px`
        //   boardHeros[i].dir = 'down'
        //   // console.log('down')
        // }
        // if (randomMoveLeft === 1 && x < 7) { // move right
        //   moveHero.style.left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
        //   boardHeros[i].left = Number(moveHero.style.left.slice(0, -2)) + 64 + 'px'
        //   moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${64}px`
        //   boardHeros[i].dir = 'right'
        //   // console.log('right')
        // }       
      }
      //end of fight reset and clean up
      if (count >= 60) {
        clearInterval(battleDuration)
        for (let i = 0; i < boardHeros.length; i++) {
          document.getElementsByClassName('Health')[i].style.visibility = 'hidden'
          document.getElementsByClassName('Mana')[i].style.visibility = 'hidden'
          let moveHero = document.getElementById(`overHeads-${boardHeros[i].id}`)
          moveHero.childNodes[2].style.backgroundPosition = `-${32}px -${96}px`
          boardHeros[i].dir = 'up'
          moveHero.style.top = boardHeros[i].startingTop
          moveHero.style.left = boardHeros[i].startingLeft
          console.log(boardHeros[i].startingTop, 'boardheros end of fight')

        }
        for (let o = 0; o < numBoardEnemies[round - 1]; o++) {
          document.getElementsByClassName('Enemy-Health')[o].style.visibility = 'hidden'
          document.getElementsByClassName('Enemy-Mana')[o].style.visibility = 'hidden'
        }

      }

    }, 1000);

    if (win === true) {
      setRound(prevRound => prevRound + 1)
      setMoney(prevMoney => prevMoney + 10)
    }
  }

  function ugradeCapacity() {
    if (money > heroCapacityCost) {
      setMaxHeroCapacity(prevCapacity => prevCapacity + 1)
      setHeroCapacityCost(prevCapacityCost => prevCapacityCost + 5)
      setMoney(prevMoney => prevMoney - heroCapacityCost)
    }
  }


  function buyUnit() {
    if (benchHeros.length < 16) {
      if (money > 2) {
        setMoney(prevMoney => prevMoney - 3)
        setBenchHeros((benchHeros) => {

          console.log(benchHeros, 'bhero')
          let random = Math.floor(Math.random() * 5)

          return [...benchHeros, {
            heroName: '/sprites/heros/hero' + random + '.png',
            id: benchHeros.length,
            hero: random

          }]
        })
      }
    }
  }

  return (
    <div>
      <div style={{
        display: 'grid', width: 512, marginTop: 8,
        gridTemplateColumns: 'auto auto auto auto'
      }}>

        <button onClick={() => buyUnit()} style={{ maxWidth: 100 }}>$3 Buy Unit</button>
        <button onClick={() => ugradeCapacity()} style={{ maxWidth: 100 }}>${heroCapacityCost} Upgrade Hero Limit</button>
        <button onClick={() => startRound()} style={{ maxWidth: 100 }}>Start Round</button>
        <img id='trash-can' src='sprites/trash-can/trash-can.png'
          style={{
            width: 50,
            height: 50,
          }}>
        </img>

      </div>
      <p>Round: {round}</p>
      <p>Lives: {lives}</p>
      <p>$: {money}</p>
      <p>Hero Limit: {boardHeros.length}/{maxHeroCapacity}</p>
    </div>
  )
}
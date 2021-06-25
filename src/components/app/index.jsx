import React, { useEffect, useState } from "react";
import UI from "../ui"
import Board from "../board"
import Game from "../game"
import Enemies from "../game/enemies"
import OverHeads from "../ui/unit-overheads"

export default function App() {
  const [benchHeros, setBenchHeros] = useState([])
  const [boardHeros, setBoardHeros] = useState([])
  const [boardEnemies, setBoardEnemies] = useState([])
  const [boardEnemies2, setBoardEnemies2] = useState([])
  const [enemyData, setEnemyData] = useState([])
  const [numBoardEnemies, setNumBoardEnemies] = useState(['2','3'])
  const [money, setMoney] = useState(600)
  const [heroCapacity, setHeroCapacity] = useState(0)
  const [maxHeroCapacity, setMaxHeroCapacity] = useState(3)
  const [heroCapacityCost, setHeroCapacityCost] = useState(5)
  const [lives, setLives] = useState(3)
  const [round, setRound] = useState(1)
  const [liveRound, setLiveRound] = useState(false)
  const [startRoundHealthMana, setStartRoundHealthMana] = useState([]) 
  //enemy set up
  useEffect(() => {
      setBoardEnemies(() => {
       
        return [...boardEnemies, <Enemies  round={round} ></Enemies>]
        
      })  
  }, [round])

  useEffect(() => {
    //change to 1 array 1 for loop change id to unique ids  
    var child = document.createElement("div")
    child.style.width = '32px'
    child.style.height = '32px'
    child.style.marginLeft = '16px'
    child.style.marginTop = '16px'
    child.id = 1
    

    for(let i = 0; i < 16; i++ ){
      if(benchHeros[i] && document.getElementById('bench'+i).childNodes.length < 1){
        child.id += 1
        child.style.background = `url(${benchHeros[i].heroName}) no-repeat`
        return document.getElementById('bench'+i).appendChild(child)
      }
          
    }

    // for (let j = 0; j < verticalAxis.length; j++) {
    //   for (let i = 0; i < horizontalAxis.length; i++) {
    //     if (benchHeros[i]) {
    //       child.id = Object.keys(benchHeros)
    //       child.style.background = `url(${benchHeros[i].heroName}) no-repeat`
    //     }         
    //     if (document.getElementById(verticalAxis[j] + horizontalAxis[i]).childNodes.length < 1) {
    //       if (j === 1) {
    //         if (benchHeros[i + 7]) {
    //           child.id = Object.keys(benchHeros)
    //           child.style.background = `url(${benchHeros[i + 7].heroName}) no-repeat`
    //         }
    //         return document.getElementById(verticalAxis[j] + horizontalAxis[i]).appendChild(child)
    //       } else {
    //         console.log(i, j, 'i j')
    //         return document.getElementById(verticalAxis[j] + horizontalAxis[i]).appendChild(child)

    //       }
    //     }
    //   }
    // }
    console.log(benchHeros, 'bench heros cons')
  }, [benchHeros])


  useEffect(() => {
    var child = document.createElement('div')
    child.style.height = '32px'
    child.style.position = 'absolute'
    child.style.width = '32px'
    child.style.marginLeft = '16px'
    child.style.marginTop = '16px'
    if(boardHeros.length > 0){
      child.id = boardHeros.slice(-1).pop().id
      child.style.background = boardHeros.slice(-1).pop().heroName
      console.log(child, boardHeros, 'child k')
    }

    // container.style.height = '8px'
    // container.style.position = 'absolute'
    // container.style.width = '32px'
    // container.style.background = 'red'
    // container.style.marginLeft = '16px'
    // container.style.marginTop = '16px'
    // container.id = boardHeros.slice(-1).pop().id
    // container.append(child)

    
    boardHeros.forEach(hero => {
      setStartRoundHealthMana(() => {  
        return [...startRoundHealthMana, <OverHeads  boardHeros={boardHeros}></OverHeads>]
        
      })  
    })

    // for(let d = 0; d < boardHeros.length; d++){
    //   if(startRoundHealthMana.length){
    //     console.log(startRoundHealthMana[d].props.boardHeros[d], d)
    //     return document.getElementById('0 0').append(child)
    //   }
    // }
    
    // return startRoundHealthMana.map(elem => {
    //   document.getElementById(elem.props.boardHeros.slice(-1).pop().id).append(<overHeads boardHeros={elem.props.boardHeros.slice(-1)}></overHeads>)
    //   console.log(startRoundHealthMana[].props)
    // })
    

  }, [boardHeros]);

  return (
    <div
      style={{
        position: "relative",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#404040",
        overflow: "hidden",
      }}>
      <Board setMoney={setMoney} money={money} setBoardHeros={setBoardHeros} boardHeros={boardHeros} benchHeros={benchHeros} maxHeroCapacity={maxHeroCapacity} startRoundHealthMana={startRoundHealthMana}></Board>
      {startRoundHealthMana}
      {boardEnemies}
      <UI boardEnemies={boardEnemies} numBoardEnemies={numBoardEnemies} setLiveRound={setLiveRound} Game={Game} setMoney={setMoney} money={money} lives={lives} setLives={setLives} setBenchHeros={setBenchHeros} benchHeros={benchHeros} setBoardHeros={setBoardHeros} boardHeros={boardHeros} heroCapacity={heroCapacity} heroCapacityCost={heroCapacityCost} maxHeroCapacity={maxHeroCapacity} setHeroCapacity={setHeroCapacity} setMaxHeroCapacity={setMaxHeroCapacity} setHeroCapacityCost={setHeroCapacityCost} round={round} setRound={setRound} />
    </div>


  );
}
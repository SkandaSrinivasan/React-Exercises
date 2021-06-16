import React, { useState } from 'react';



const App = () => {

  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(new Array(anecdotes.length).fill(0));


  const getRandomInt =  (max)=> {
    return Math.floor(Math.random() * max);
  }
  const setSelectionValue = () => (setSelected(getRandomInt(anecdotes.length)))

  const setVoteCountValue = () => {
    const copy = [...voteCount]
    copy[selected]+=1
    setVoteCount(copy)
  }
  
  return (
    <div>
      <DisplayAnecdote anecdote={anecdotes[selected]} />
      <br></br>
      <br></br>
      <DisplayVote voteCount={voteCount[selected]} />
      <br></br>
      <br></br>
      <Button handleClick={setSelectionValue} text="Random Anecdote" />

      <VoteButton handleClick={setVoteCountValue} text="Vote" />
      {anecdotes[Math.max(...voteCount)]} {/* //Just to show the quote with the max votes */}
    </div>
  )
}
const DisplayAnecdote = ({anecdote}) => {
  return (<h1>{anecdote}</h1>)
}
const Button = ({handleClick, text}) => ((<button onClick={() => handleClick()}>{text}</button>))
const VoteButton =({handleClick, text}) => ((<button onClick={() => handleClick()}>{text}</button>))
const DisplayVote = ({voteCount}) => (<b>Vote Count for this anecdote is: {voteCount}</b>)

export default App;

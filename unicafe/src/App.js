import React, { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (value) => {
    setGood(value);
  }

  const setNeutralValue = (value) => {
    setNeutral(value);
  }

  const setBadValue = (value) => {
    setBad(value);
  }
  return (
    <div >
      <Header header="Unicafe feedback" />
      <FeedbackButton feedbackCount={good} handleClick={setGoodValue} text="good" />
      <FeedbackButton feedbackCount={bad} handleClick={setBadValue} text="bad" />
      <FeedbackButton feedbackCount={neutral} handleClick={setNeutralValue} text="Neutral" />

      <DisplayCount value={good} feedbackType="good" />
      <DisplayCount value={bad} feedbackType="bad" />
      <DisplayCount value={neutral} feedbackType="neutral" />
      <DisplayTotal goodCount={good} badCount={bad} neutralCount={neutral} />
      <DisplayAverage goodCount={good} badCount={bad} totalCount={good + bad + neutral} />
      <DisplayPositivePercentage goodCount={good} totalCount={good + bad + neutral} />

    </div>
  );
}

const Header = ({ header }) => (<p>{header}</p>)

const FeedbackButton = ({ feedbackCount, handleClick, text }) => {
  console.log(feedbackCount)
  return (<button onClick={() => handleClick(feedbackCount + 1)}>{text}</button>)
}

const DisplayCount = ({ value, feedbackType }) => (<p>{feedbackType}: {value}</p>)

const DisplayTotal = ({ goodCount, badCount, neutralCount }) => (<p>Total feedbackCount is : {goodCount + badCount + neutralCount}</p>);

const DisplayAverage = ({ goodCount, badCount, totalCount }) => (<p>Average Feedback is: {(goodCount - badCount) / totalCount}</p>)

const DisplayPositivePercentage = ({ goodCount, totalCount }) => (<p>Positive Percentage is: {(goodCount / totalCount) * 100} %</p>)
export default App;

import {useState} from 'react'
import axios from 'axios'

function App() {

  const BASE_URL = 'https://api.nasa.gov/planetary/apod?api_key=wB8o5gonNw9eqG8uWomvrJg3BUlOxuVGRid60c6R'

  const [currImage, setCurrImage] = useState({})

  axios.get(BASE_URL).then((response) => {
    setCurrImage(response.data)
  })

  return (
    <div>
      <img src={currImage.hdurl}></img>
    </div>
  );
}

export default App;

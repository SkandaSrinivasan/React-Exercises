import { React, useState } from 'react'
import './App.css'
import { DisplayBlogs } from './components/DisplayBlogs'

function App() {
  const [inputValues, setInputValues] = useState({
    title: "",
    author: "",
    url: ""
  })
  const [blogs, setBlogs] = useState(
    [{
      title:"test",
      author:'test',
      url: 'sdasd'
    }]
)
  const handleInputChanges = (event) => {
    setInputValues({
      ...inputValues, [event.target.name]: event.target.value
    })
  }

  const handleSubmit = ((event)=>{
    event.preventDefault();
    const newBlog = {
      title: inputValues.title,
      author: inputValues.author,
      url: inputValues.url
    }
    console.log(JSON.stringify(newBlog))
    setBlogs([...blogs,newBlog])
    console.log('blogs', blogs)
  })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title : <input
          name="title"
          value={inputValues.title}
          onChange={handleInputChanges} /> <br />
        Author: <input 
          name="author"
          value={inputValues.author}
          onChange={handleInputChanges} /> <br />
        URL: <input 
          name="url"
          value={inputValues.url}
          onChange={handleInputChanges} /> <br />
        <button type="submit" >Add Blog</button>
      </form>
      <DisplayBlogs blogs={blogs} />
    </div>
  );
}

export default App;

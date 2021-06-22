import { React, useState } from 'react'
import './App.css'

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
          onChange={handleInputChanges} />
        Author: <input 
          name="author"
          value={inputValues.author}
          onChange={handleInputChanges} />
        URL: <input 
          name="url"
          value={inputValues.url}
          onChange={handleInputChanges} />
        <button type="submit" >add</button>
      </form>
      <ul>
        {console.log(blogs.length)}
        {blogs.map(blog => <li key={blog.title}>{JSON.stringify(blog)}</li>)}
      </ul>
    </div>
  );
}

export default App;

const DisplayBlogs = ({blogs}) => {
    return(
        <div className="box">
            <ul>
               {blogs.map(blog => <li>
                   Blog Name : {blog.title} <br />
                   Author : {blog.author} <br />
                   URL : {blog.url} <br />
                   </li>)} 
            </ul>
        </div>
    )
}

export {DisplayBlogs}
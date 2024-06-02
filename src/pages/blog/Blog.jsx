import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axiosClient from '../../utils/axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosClient
      .get('/blogs')
      .then(({ data }) => {
        setBlogs(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <h1 className="my-4">Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="card my-4 p-4">
          <h1 className="mb-4">{blog.blogTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: blog.blogDescription }}></p>
        </div>
      ))}
    </Container>
  );
};

export default Blog;

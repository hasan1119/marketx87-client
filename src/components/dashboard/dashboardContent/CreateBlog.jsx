import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axiosClient from '../../../utils/axios';

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    blogTitle: '',
    blogDescription: '',
  });

  const [content, setContent] = useState('');
  // text editor configuration
  const config = {
    placeholder: 'Blog Description',
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => {
      return { ...prevBlog, [name]: value };
    });
  };
  console.log(content);

  // function to submitting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/create-blog', { ...blog, blogDescription: content })
      .then(({ data }) => {
        setBlog({ blogTitle: '', blogDescription: '' });
        setContent('');
      })
      .catch(console.log);
  };

  return (
    <Container className="blog">
      <div className="blog m-5 p-5 shadow">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Blog Title"
            name="blogTitle"
            value={blog.blogTitle}
            onChange={(e) => changeHandler(e)}
            required
          />

          <JoditEditor
            value={content}
            // tabIndex={1}
            onChange={(newContent) => setContent(newContent)}
            // config={config}
            required
          />
          <Button type="submit" variant="dark" className="form-control my-4">
            POST BLOG
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateBlog;

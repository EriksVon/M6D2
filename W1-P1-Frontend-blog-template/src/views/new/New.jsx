import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const NewBlogPost = (props) => {
  const [newPost, setNewPost] = useState({
    category: "",
    title: "",
    cover: "",
    readTime: "",
    content: "",
  });

  const handleChange = useCallback((value, name) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  });

  const emptyPost = () => ({
    category: "",
    title: "",
    cover: "",
    readTime: "",
    content: "",
  });

  const submitPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/blogPosts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (response.ok) {
          alert("post creato con successo");
        } else {
          throw new Error("Bad request");
        }
      })
      .catch((error) => {
        alert("Oops... something went wrong, try again!");
        console.error(error);
      });
    /*       .finally(() => {
      }); */
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={submitPost}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => handleChange(e.target.value, "title")}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={newPost.category}
            onChange={(e) => handleChange(e.target.value, "category")}
          >
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Cover"
            value={newPost.cover}
            onChange={(e) => handleChange(e.target.value, "cover")}
          />
        </Form.Group>
        {/* 
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Read Time (minutes)</Form.Label>
          <Form.Control
            size="lg"
            placeholder="100"
            type="number"
            value={newPost.readTime}
            onChange={(e) => handleChange(e.target.value, "readTime")}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a number.
          </Form.Control.Feedback>
        </Form.Group>
        */}
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill
            value={newPost.content}
            onChange={(value) => handleChange(value, "content")}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button
            type="reset"
            size="lg"
            variant="outline-dark"
            onClick={emptyPost}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;

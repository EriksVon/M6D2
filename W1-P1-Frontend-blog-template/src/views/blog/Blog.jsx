import React, { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";

const Blog = (props) => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/blogPosts/${id}`
        );
        if (response.ok) {
          const post = await response.json();
          setBlog(post);
        } else {
          console.error("Errore nella risposta del server");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={blog.cover} fluid />
        <h1 className="blog-details-title">{blog.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor {...blog.author} />
          </div>
          <div className="blog-details-info">
            <div>{blog.createdAt}</div>
            <div>
              Lettura da:{" "}
              {blog.readTime &&
                blog.readTime.value &&
                blog.readTime.unit &&
                `${blog.readTime.value} ${blog.readTime.unit}`}
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        ></div>
      </Container>
      <Container>
        <h3>Comments:</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "70%" }}>Commenti</th>
              <th style={{ width: "15%" }}>Autore</th>
              <th style={{ width: "15%" }}>Modifica</th>
            </tr>
          </thead>
          <tbody>
            {blog.comments &&
              blog.comments.map((comment) => (
                <tr key={comment._id}>
                  <td>{comment.text}</td>
                  <td>{comment.author}</td>
                  <td>
                    <Button variant="danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}

            <tr>
              <td></td>
              <td></td>
              <td>
                <Button variant="info" className="m-1" onClick={handleShow}>
                  Add Comment
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        {handleShow && (
          <AddComment id={id} show={show} handleClose={handleClose} />
        )}
      </Container>
    </div>
  );
};

export default Blog;

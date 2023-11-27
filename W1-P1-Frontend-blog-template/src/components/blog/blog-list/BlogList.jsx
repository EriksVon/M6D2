import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogPosts`);
        if (response.ok) {
          const postsList = await response.json();
          setPosts(postsList);
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
    <>
      <div className="d-flex justify-content-center mb-3">
        <input
          className="form-control"
          style={{ maxWidth: "450px" }}
          type="search"
          placeholder="Search an article"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </div>
      <Container>
        <Row>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(inputText.toLowerCase())
            )
            .map((post, i) => (
              <Col
                key={`item-${i}`}
                md={4}
                style={{
                  marginBottom: 50,
                }}
              >
                <BlogItem key={post.title} {...post} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogList;

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({ searchResults }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/blogPosts`);
        if (response.ok) {
          const allPosts = await response.json();
          setPosts(allPosts);
        } else {
          console.error("Errore nella risposta del server");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchResults]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
        <Row>
          {searchResults.length > 0
            ? searchResults.map((post, i) => (
                <Col
                  key={`item-${i}`}
                  md={4}
                  style={{
                    marginBottom: 50,
                  }}
                >
                  <BlogItem key={post.title} {...post} />
                </Col>
              ))
            : posts.map((post, i) => (
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

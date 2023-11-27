import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { useParams } from "react-router-dom";

const Blog = (props) => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogPosts/${id}`);
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
            {/*             <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
             */}{" "}
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
    </div>
  );
};

export default Blog;

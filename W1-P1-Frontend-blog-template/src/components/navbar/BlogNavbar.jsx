import React, { useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import Login from "../../views/login/Login";

const NavBar = ({ search }) => {
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/blogPosts?title=${searchText}`
      );
      const searchResults = await response.json();
      search(searchResults);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="blog-navbar d-flex justify-content-between"
      fixed="top"
    >
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="text"
            placeholder="Search an article"
            aria-label="Search"
            value={searchText}
            minLength={3}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </Button>
        </Form>
        <Button
          as={Link}
          to="/new"
          className="blog-navbar-add-button bg-dark"
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Nuovo Articolo
        </Button>
        {/*         <Button to="/login" variant="dark" type="submit" onClick={handleShow}>
          Login
        </Button> */}
      </Container>
      {handleShow && <Login show={show} handleClose={handleClose} />}
    </Navbar>
  );
};

export default NavBar;

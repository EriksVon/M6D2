import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

const AddComment = ({ show, handleClose, id }) => {
  const [addComment, setAddComment] = useState("");

  const submitAdd = () => {
    const newComment = {
      text: addComment,
      blogPost: id,
    };

    fetch(`http://localhost:3001/api/blogPosts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (response.ok) {
          alert("Comment added successfully!");
          handleClose();
        } else {
          throw new Error("Bad request");
        }
      })
      .catch((error) => {
        alert("oooops...something went wrong, try again!");
        console.error(error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add your comment here:</Modal.Title>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Header>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User</Form.Label>
            <Form.Control type="name" placeholder="John Doe" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your comment:</Form.Label>
            <Form.Control
              as="textarea"
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
              rows={3}
              placeholder="Comment..."
            />
          </Form.Group>
        </Form>
      </Container>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitAdd}>
          Send comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddComment;

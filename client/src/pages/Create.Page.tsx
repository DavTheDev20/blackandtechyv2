import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Create = () => {
  return (
    <div className="Create">
      <h1>Create</h1>

      <Form>
        <Form.Row>
          <Form.Control type="text" placeholder="Name" />
        </Form.Row>
        <Form.Row>
          <Form.Control type="text" placeholder="Title" />
        </Form.Row>
        <Form.Row>
          <Form.Control
            as="textarea"
            placeholder="Enter content here..."
            rows={6}
          />
        </Form.Row>
        <Button variant="light" size="lg">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default Create;

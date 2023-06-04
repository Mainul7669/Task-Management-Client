import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://task-server-virid.vercel.app/allTasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error here
      });
  };

  const handleUpdate = (id, updatedTask) => {
    fetch(`https://task-server-virid.vercel.app/allTasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Success!",
          text: "Task Updated Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        fetchTasks(); // Fetch updated tasks after successful update
        handleCloseModal(); // Close the modal after update
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error here
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-server-virid.vercel.app/allTasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Task has been deleted.", "success");
            fetchTasks(); // Fetch updated tasks after successful delete
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle error here
          });
      }
    });
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const handleModalInputChange = (e, fieldName) => {
    setSelectedTask((prevTask) => ({
      ...prevTask,
      [fieldName]: e.target.value,
    }));
  };

  const handleModalSubmit = () => {
    handleUpdate(selectedTask._id, selectedTask);
  };

  return (
    <div className="m-5">
      <h1>All Tasks</h1>
      <Row>
        {tasks.map((task) => (
          <Col key={task._id} md={4}>
            <Card className="my-3 shadow p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>{task.title}</Card.Text>

                <Card.Text>{task.email}</Card.Text>
                <Card.Text>{task.description}</Card.Text>
                <Button
                  className="mx-2"
                  variant="info"
                  onClick={() => handleOpenModal(task)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={selectedTask ? selectedTask.name : ""}
              onChange={(e) => handleModalInputChange(e, "name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={selectedTask ? selectedTask.title : ""}
              onChange={(e) => handleModalInputChange(e, "title")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={selectedTask ? selectedTask.email : ""}
              onChange={(e) => handleModalInputChange(e, "email")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={selectedTask ? selectedTask.description : ""}
              onChange={(e) => handleModalInputChange(e, "description")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllTasks;

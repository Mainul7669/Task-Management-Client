import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function AddTask() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newTask) => {
    console.log(newTask);
    // send data to the server
    fetch("https://task-server-virid.vercel.app/allTasks", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Task Added Successfully",
            icon: "success",
            confirmButtonText: "Cool"
          }).then(() => {
            reset();
          });
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="m-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name")} type="text" placeholder="Jhon Doe" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("title")} type="text" placeholder="Web Developer" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...register("email")} type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control {...register("description")} as="textarea" rows={3} />
        </Form.Group>
        <Button className="btn-danger btn rounded-3" type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default AddTask;

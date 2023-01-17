import { Form, FormGroup, Input, Button, Container, Label } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import { useLogInContext } from "../../context/login";
// import user from "../../Data/data";
const axios = require("axios");
const Profile = ({ user }) => {
  const { setIsLoggedIn } = useLogInContext();
  // console.log(user);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    },
  });

  const onSubmit = (data) => {
    fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));

    alert("Changes Saved. You need to login again.");

    setTimeout(() => {
      setIsLoggedIn(false);
      navigate("/");
    }, 1000);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/products");
  };
  return (
    <Container fluid="sm" className="mt-2">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="firstName">First Name:</Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name:</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pass">Password:</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormGroup>
        <Button type="submit" className="me-2">
          Edit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form>
    </Container>
  );
};

export default Profile;

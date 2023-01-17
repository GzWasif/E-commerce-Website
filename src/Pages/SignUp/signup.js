import { FormGroup, form, Input, Label, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
// import user from "../../Data/data";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Custom Hooks/useFetch";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data: users, error: bhul } = useFetch("http://localhost:8000/users");

  let flag = 0;

  const onBlur = (e) => {
    flag = users.findIndex((user) => user.email === e.target.value);
    console.log(-1);
  };

  const onSubmit = (data) => {
    // console.log(data);
    if (flag === -1) {
      const id = users.length + 1;
      const user = { id: id, ...data };
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => {
        navigate("/");
      });
    } else {
      alert("Email already exists");
    }
    // const id = users.length;
    // const demoUser = user;
    // demoUser.push({ id: id, ...data });
    // setUsers(demoUser);
    // console.log(users);
    // navigate("/");
  };

  return (
    // <div>
    //   <form className="signupform">
    //
    //       <Label for="user firstname">Enter First Name:</Label>
    //       <Input id="user firstname" placeholder="First Name" />
    //     </FormGroup>
    //
    //       <Label for="user lastname">Enter Last Name:</Label>
    //       <Input id="user lastname" placeholder="Last Name" />
    //     </FormGroup>
    //
    //       <Label for="user mail">Enter a valid mail:</Label>
    //       <Input id="user mail" type="email" placeholder="@example.com" />
    //     </FormGroup>
    //
    //       <Label for="user pass">Enter password:</Label>
    //       <Input id="user pass" type="password" placeholder="******" />
    //     </FormGroup>
    //     <Input type="submit" />
    //   </form>
    // </div>

    // <div className="signupformcontainer">
    //   <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
    //
    //       <Label for="firstName" className="d-block">
    //         <h4 className="labeltitle">Enter First Name:</h4>
    //       </Label>
    //       <Input
    //         {...register("firstName")}
    //         placeholder="First Name"
    //         bsSize="sm"
    //       />
    //     </FormGroup>
    //
    //       <Label for="lastName" className="d-block">
    //         <h4 className="labeltitle">Enter Last Name:</h4>
    //       </Label>
    //       <Input
    //         {...register("lastName")}
    //         placeholder="Last Name"
    //         bsSize="sm"
    //       />
    //     </FormGroup>
    //
    //       <Label for="mail" className="d-block">
    //         <h4 className="labeltitle">Enter Email Address:</h4>
    //       </Label>
    //       <Input
    //         {...register("mail")}
    //         type="email"
    //         placeholder="@example.com"
    //         bsSize="sm"
    //       />
    //     </FormGroup>
    //
    //       <Label for="password" className="d-block">
    //         <h4 className="labeltitle">Enter Password:</h4>
    //       </Label>
    //       <Input
    //         {...register("password")}
    //         type="password"
    //         placeholder="*******"
    //         bsSize="sm"
    //       />
    //     </FormGroup>
    //     <Input
    //       color="secondary"
    //       outline
    //       // className="d-block mx-auto"
    //       className="me-6"
    //       value="Sign Up"
    //       type="submit"
    //     />
    //     {/* <Link to="/products">
    //       <p className="mt-2">Continue as a guest</p>
    //     </Link> */}
    //   </form>
    // </div>

    <div className="signupformcontainer">
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        {/* <Label for="firstName" className="d-block">
          <h4 className="labeltitle text-light">Enter First Name:</h4>
        </Label> */}
        <input
          {...register("firstName", {
            required: "This is a required field",
            maxLength: {
              value: 15,
              message: "Can't exceed 15 characters",
            },
          })}
          placeholder="First Name"
          className="form-control rounded-pill mb-2"
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">{errors.firstName?.message}</p>
        )}
        {errors.firstName?.type === "maxLength" && (
          <p role="alert">{errors.firstName?.message}</p>
        )}
        {/* <Controller
          name="firstName"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              placeholder="First Name"
              className="form-control"
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              innerRef={field.ref}
              value={field.value}
            />
          )}
        /> */}
        {/* <Input
          {...register("firstName")}
          innerRef={register("firstName").ref}
          placeholder="First Name"
          className="form-control"
        /> */}

        {/* <Label for="lastName" className="d-block">
          <h4 className="labeltitle text-light">Enter Last Name:</h4>
        </Label> */}
        <input
          {...register("lastName", {
            required: "This is a required field",
            maxLength: {
              value: 15,
              message: "Can't exceed 15 characters",
            },
          })}
          placeholder="Last Name"
          className="form-control rounded-pill mb-2"
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">{errors.lastName?.message}</p>
        )}
        {errors.firstName?.type === "maxLength" && (
          <p role="alert">{errors.lastName?.message}</p>
        )}

        {/* <Label for="email" className="d-block">
          <h4 className="labeltitle text-light">Enter Email Address:</h4>
        </Label> */}
        <input
          {...register("email", { required: "This is a required field" })}
          type="email"
          placeholder="Email"
          className="form-control rounded-pill mb-2"
          onBlur={onBlur}
        />
        {errors.email?.type === "required" && (
          <p role="alert">{errors.email?.message}</p>
        )}

        {/* <Label for="password" className="d-block">
          <h4 className="labeltitle text-light">Enter Password:</h4>
        </Label> */}
        <input
          {...register("password", {
            required: "This is a required field",
            minLength: {
              value: 6,
              message: "Password must be at leat 6 characters long",
            },
          })}
          type="password"
          placeholder="Password"
          className="form-control rounded-pill"
        />
        {errors.password?.type === "minLength" && (
          <p role="alert">{errors.password?.message}</p>
        )}
        {errors.password?.type === "required" && (
          <p role="alert">{errors.password?.message}</p>
        )}
        <button type="submit" className="btn mt-2 btn-outline-light">
          Sign Up
        </button>

        <Link to="/" className="ms-2 text-white">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;

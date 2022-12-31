import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";

// ✔ less code
// better validation
// better errors (set, clear, display)
// have control over inputs
// ✔ don't deal with event
// ✔ easier inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const Forms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onBlur" });
  const onValid = (data: LoginForm) => {};
  const OnInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid, OnInvalid)}>
      <input
        {...register("username", {
          required: "Username is Required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is Required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "error" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is Required",
        })}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      <style jsx>{`
        .error {
          border: 3px solid red;
        }
      `}</style>
    </form>
  );
};

export default Forms;

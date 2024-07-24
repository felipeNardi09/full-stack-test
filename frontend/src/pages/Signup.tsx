import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useSignup } from "../hooks/useSignup";
import { ISignup } from "../services/apiUsers";
import { Link } from "react-router-dom";

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email address",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
  }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: joiResolver(signUpSchema),
  });

  const { signup, isPending } = useSignup();

  return (
    <>
      <div className="mx-auto min-w-[10rem] max-w-sm rounded-lg shadow-lg transition-all duration-200 sm:min-w-[24rem] md:min-w-[32rem] md:max-w-md">
        <h1 className="text-center text-2xl">Sign up</h1>
        <form
          onSubmit={handleSubmit((data) => signup(data))}
          className="space-y-2 p-5 text-center"
        >
          <InputField
            name="name"
            labelText="Name"
            type="text"
            register={register}
            error={errors?.name?.message}
          />
          <InputField
            name="email"
            labelText="E-mail"
            type="email"
            register={register}
            error={errors?.email?.message}
          />
          <InputField
            name="password"
            labelText="Password"
            type="password"
            register={register}
            error={errors?.password?.message}
          />
          <InputField
            name="confirmPassword"
            labelText="Confirm password"
            type="password"
            register={register}
            error={errors?.confirmPassword?.message}
          />
          <Button disabled={isPending}>
            {!isPending ? "Sign up" : "Signing up"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2">
          <p>Alreay has an account?</p>
          <Link
            className="my-1 rounded border bg-green-300 px-5 py-2 text-xl font-semibold transition-all duration-200 hover:bg-green-400"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;

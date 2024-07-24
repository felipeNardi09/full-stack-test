import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useLogin } from "../hooks/useLogin";
import { ILogin } from "../services/apiUsers";

const Login = () => {
  const { register, handleSubmit } = useForm<ILogin>();

  const { login, isPending } = useLogin();

  return (
    <>
      <div className="mx-auto min-w-[10rem] max-w-sm rounded-lg shadow-lg transition-all duration-200 sm:min-w-[24rem] md:min-w-[32rem] md:max-w-md">
        <h1 className="text-center text-2xl">Sign up</h1>
        <form
          onSubmit={handleSubmit((data) => login(data))}
          className="space-y-2 p-5 text-center"
        >
          <InputField
            name="email"
            labelText="E-mail"
            type="email"
            register={register}
          />
          <InputField
            name="password"
            labelText="Password"
            type="password"
            register={register}
          />

          <Button disabled={isPending}>
            {!isPending ? "Log in" : "Logging in"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2">
          <p>Don't have an account?</p>
          <Link
            className="my-1 rounded border bg-green-300 px-5 py-2 text-xl font-semibold transition-all duration-200 hover:bg-green-400"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;

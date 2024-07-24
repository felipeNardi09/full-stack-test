export interface ISignup {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export async function signup({
  name,
  email,
  password,
  confirmPassword,
}: ISignup) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/signup`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function login({ email, password }: ILogin) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function getLoggedUser(token: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/user/logged-user`,
    {
      mode: "cors",
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return data;
}

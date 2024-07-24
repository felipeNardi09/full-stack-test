import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContext {
  children: ReactNode;
}

interface IContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IContext | undefined>(undefined);

function AuthProvider({ children }: IAuthContext) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
export { AuthProvider, useAuth };

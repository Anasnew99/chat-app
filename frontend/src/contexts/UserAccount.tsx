import React, { useEffect, useState } from "react";
import { DATA_VALIDATION_ERROR, HTTP_Status } from "../config/http-status";
interface IUserContext {
  user?: string;
  password?: string;
  isUserLoggedIn: boolean;
  logIn(user: string, password?: string): Promise<HTTP_Status>;
}
const UserContext = React.createContext<IUserContext>({
  user: "",
  password: "",
  isUserLoggedIn: false,
  logIn: () =>
    new Promise(
      (
        resolve: (value: HTTP_Status) => void,
        reject: (error: any) => void
      ) => {}
    ),
});

interface IUserState {
  user?: string;
  password?: string;
  isUserLoggedIn: boolean;
}

const UserProvider = () => {
  const [state, setState] = useState<IUserState>({ isUserLoggedIn: false });
  useEffect(() => {
    if (state.user) {
      setState({ isUserLoggedIn: true });
    }
    // setState({user})
  }, [state.user, state.password]);
};

export { UserContext };

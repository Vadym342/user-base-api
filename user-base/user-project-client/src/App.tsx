import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { AuthService } from "./services/auth.service";
import { logOut, login } from "./store/user/user.slice";

function App() {
  const dispatch = useAppDispatch();

  const checkIsUserAuthorized = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (token) {
        const data = await AuthService.isAuthorizedUser();

        data ? dispatch(login(data)) : dispatch(logOut());
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIsUserAuthorized();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

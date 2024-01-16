import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import Typography from "@mui/material/Typography";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div>
          <Typography variant="h3" textAlign="center">
            You should login to see this page
          </Typography>
        </div>
      )}
    </>
  );
};

import { FC, useState } from "react";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { Login } from "../components/AuthForms/Login";
import { SignUp } from "../components/AuthForms/SignUp";
import Container from "@mui/material/Container";

export const Auth: FC = () => {
  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <Container sx={{ marginTop: "3%" }} maxWidth="sm">
      <Paper
        elevation={3}
        style={{ padding: "10px", paddingBottom: "20px", marginBottom: "25px" }}
      >
        <div>
          {checked ? (
            <Chip
              icon={<LockIcon />}
              label="Log In"
              variant="outlined"
              color="info"
            />
          ) : (
            <Chip
              icon={<FaceIcon />}
              label="Sign Up"
              variant="outlined"
              color="info"
            />
          )}
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        {checked ? <Login /> : <SignUp />}
      </Paper>
    </Container>
  );
};

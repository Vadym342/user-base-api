import { FC, useState } from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/user.slice";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../constants/reges";

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //! need to add library "react-hook-form" )))
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [formValid, setFormValid] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleSubmit = async () => {
    setSuccess(null);

    if (emailError || !email) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !password) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form Submitted Successfully");

    try {
      const data = await AuthService.login({
        email,
        password,
      });

      if (data) {
        setTokenToLocalStorage("token", data.token);
        dispatch(login(data));
        navigate("/");
        toast.success("Logged in.");
      }
    } catch (error: any) {
      const err = error.response?.data.message.toString();
      toast.error(err);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={email}
          InputProps={{}}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel
            error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>

      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error">{formValid}</Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success">{success}</Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px" }}>
        Do you have an account ?
        <small style={{ textDecoration: "underline", color: "blue" }}>
          Sign Up
        </small>
      </div>
    </div>
  );
};

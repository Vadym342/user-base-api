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
import { emailRegex } from "../../constants/reges";

export const SignUp: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //! need to add "react-hook-form" )))
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [formValid, setFormValid] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleFirstName = () => {
    if (!firstName || firstName.length > 100) {
      setFirstNameError(true);
      return;
    }

    setFirstNameError(false);
  };

  const handleLastName = () => {
    if (!lastName || lastName.length > 100) {
      setLastNameError(true);
      return;
    }

    setLastNameError(false);
  };

  const handleAge = () => {
    console.log("age");
    if (!age || age < 18 || age > 100) {
      setAgeError(true);
      return;
    }

    setAgeError(false);
  };

  const handleEmail = () => {
    if (!emailRegex.test(email) || email.length > 96) {
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

    if (firstNameError || !firstName) {
      setFormValid(
        "First name is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

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
      console.log({
        email,
        firstName,
        lastName,
        age,
        password,
      });
      const data = await AuthService.registration({
        email,
        firstName,
        lastName,
        age,
        password,
      });

      if (data) {
        toast.success("User has been created");
      }
    } catch (error: any) {
      const err = error.response?.data?.message?.toString();
      toast.error(err);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
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
        <TextField
          error={firstNameError}
          label="First name"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={firstName}
          InputProps={{}}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          onBlur={handleFirstName}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          error={lastNameError}
          label="Last name"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={lastName}
          InputProps={{}}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          onBlur={handleLastName}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          error={ageError}
          label="Age"
          type="number"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={age}
          InputProps={{}}
          onChange={(event) => {
            setAge(+event.target.value);
          }}
          onBlur={handleAge}
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
          Sign Up
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
        <a>Forgot Password</a>
        <br />
        Do you have an account ?{" "}
        <small style={{ textDecoration: "underline", color: "blue" }}>
          Sign Up
        </small>
      </div>
    </div>
  );
};

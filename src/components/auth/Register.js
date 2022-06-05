import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as LinkRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startRegister } from "../../actions/authActions";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.instagram.com/emanuel.hardwell">
        Emanuel Hardwell
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const initialState = {
  name: "ema",
  lastname: "lopez",
  lastname2: "sanchez",
  email: "ema@gmail.com",
  password: "emanuel100",
  password2: "emanuel100",
};

export const Register = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const { name, lastname, lastname2, email, password, password2 } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      lastname.trim() === "" ||
      lastname2.trim() === "" ||
      email.trim() === ""
    ) {
      return Swal.fire("Error", "Ingresa todos los datos", "error");
    }

    if (password !== password2) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }
    dispatch(startRegister(formValues));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Apellido paterno"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Apellido materno"
              name="lastname2"
              value={lastname2}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <FormControl
              sx={{ width: "fullWidth" }}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl
              sx={{ width: "fullWidth" }}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password2">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password2"
                type={showPassword ? "text" : "password"}
                name="password2"
                value={password2}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={LinkRouter} to="/login" variant="body2">
                  {"¿Ya tienes una cuenta? Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

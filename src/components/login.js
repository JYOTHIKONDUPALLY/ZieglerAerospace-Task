import { Box, CircularProgress, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData((nextformdata) => ({ ...nextformdata, [key]: value }));
  };

  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { varient: "warning" });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is required field", { varient: "warning" });
      return false;
    }
    return true;
  };
  const persistLogin = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
  const loginData = async (formData) => {
    if (!validateInput) return;
    try {
      setLoading(true);
      const response = await axios.post("http://", {
        username: formData.username,
        password: formData.password
      });
      persistLogin(
        response.data.token,
        response.data.username,
        response.data.balance
      );
      setLoading({ username: "", password: "" });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { varient: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2>Login</h2>
          <TextField
            id="username"
            varient="outlined"
            name="username"
            label="Username"
            title="Username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            varient="outlined"
            name="password"
            label="Password"
            title="Password"
            placeholder="Enter Password"
            fullWidth
            value={formData.password}
            onChange={handleInput}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              varient="contained"
              onClick={() => loginData(formData)}
            >
              Login
            </Button>
          )}
          <p className="secondary-action">
            Don't have an account?
            <TextField onClick={() => navigate("/Register")}>
              Login here
            </TextField>
          </p>
        </Stack>
      </Box>
    </Box>
  );
}

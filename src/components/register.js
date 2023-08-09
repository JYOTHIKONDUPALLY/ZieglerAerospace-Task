import { Button, CircularProgress, Stack, Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData((nextFormData) => ({
      ...nextFormData,
      [key]: value
    }));
  };
  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { varient: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Isername length must be at least 6 characters", {
        varient: "warning"
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required feild", { varient: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be atleast 6 characters", {
        varient: "warning"
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { varient: "warning" });
      return false;
    }
    return true;
  };

  const registerData = async (formData) => {
    if (!validateInput(formData)) return;
    try {
      setLoading(true);
      await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password
      });
      setFormData({
        username: "",
        password: "",
        confirmPassword: ""
      });
      setLoading(false);
      enqueueSnackbar("Register successfully", { varient: "success" });
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { varient: "error" });
      } else {
        enqueueSnackbar("Something went wrong, Sorry for the inconveince", {
          varient: "error"
        });
      }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-Between"
      p={2}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" }
        }}
      >
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            varient="outlined"
            placeholder="Enter username"
            fullWidth
            title="username"
            name="username"
            value={formData.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            label="Password"
            varient="outlined"
            placeholder="Enter Password"
            fullWidth
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            onChange={handleInput}
            value={formData.password}
          />
          <TextField
            id="confirmPassword"
            varient="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInput}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => registerData(formData)}
            >
              Register Now
            </Button>
          )}
          <p ClassName="secondary-action">
            Already have an account?{"   "}
            <TextField onClick={() => navigate("/Login")}>Login here</TextField>
          </p>
        </Stack>
      </Box>
    </Box>
  );
}

// src/pages/Login.tsx
import { useEffect, useState } from "react";
import { Avatar, Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { LockOutlined, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import UserService, { LoginRequest } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data: LoginRequest = { username, password };

    try {
      const result = await UserService.login(data);

      localStorage.setItem("token", JSON.stringify({ token: result.token }));

      navigate("/household");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/household", { replace: true });
    }
  }, [navigate]);


  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh", p: 3 }}>
      <Paper sx={{ width: { xs: "100%", sm: 380 }, p: 4 }}>
        <Stack alignItems="center" mb={3}>
          <Avatar sx={{ width: 50, height: 50 }} />
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Username */}
            <Box>
              <Typography variant="body2" gutterBottom>
                Username
              </Typography>
              <TextField
                placeholder="Username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Password */}
            <Box>
              <Typography variant="body2" gutterBottom>
                Password
              </Typography>
              <TextField
                placeholder="Password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Error message */}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ borderRadius: 5 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default Login;

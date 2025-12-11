"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Container,
} from "@mui/material";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
      return;
    }

    setUsername("");
    setPassword("");

    router.push("/dashboard");
  };

  return (
    <Container 
     sx={{display:"flex",gap:0,justifyContent:"center",alignItems:"center",height:"100vh"}}
      >

      <Paper
        sx={{
          padding: { xs: 3, sm: 5 }, 
          width: "100%",
          maxWidth: 400,           
        }}
        elevation={3}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Paper>
   
    </Container>
  );
}


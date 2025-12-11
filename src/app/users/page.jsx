"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Grid,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import { useUsersStore } from "@/stores/useUsersStore";
import UserCard from "@/components/UserCard";

export default function UsersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const { users, total, loading, fetchUsers } = useUsersStore();

  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const limit = 10;

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers(limit, (page - 1) * limit, q);
    }
  }, [page, q, fetchUsers, status]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <Container >
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search users"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1); 
          }}
          fullWidth
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} sm={6} md={4} key={u.id}>
              <UserCard user={u} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil((total || 0) / limit)}
          page={page}
          onChange={(e, p) => setPage(p)}
        />
      </Box>
    </Container>
  );
}

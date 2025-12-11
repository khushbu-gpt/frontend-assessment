"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useUsersStore } from "../../../stores/useUsersStore";

export default function SingleUserPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: session, status } = useSession();

  const { fetchUserById } = useUsersStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (id) {
      fetchUserById(id).then((data) => setUser(data));
    }
  }, [id, fetchUserById]);

  if (!user || status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Button variant="outlined" onClick={() => router.back()} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Card sx={{ maxWidth: 700, margin: "0 auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar
              src={user.image}
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body2">Username: {user.username}</Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Phone: {user.phone}</Typography>

            <Typography sx={{ mt: 2 }} variant="h6">
              Address
            </Typography>
            <Typography>
              {user.address?.address}, {user.address?.city},{" "}
              {user.address?.state}
            </Typography>

            <Typography sx={{ mt: 2 }} variant="h6">
              Company
            </Typography>
            <Typography>Company: {user.company?.name}</Typography>
            <Typography>Title: {user.company?.title}</Typography>
            <Typography>Department: {user.company?.department}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

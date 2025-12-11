"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function UserCard({ user }) {
  return (
    <Card sx={{
        height: "100%",      
        width: "350px",        
        display: "flex",
        flexDirection: "column",
      }}>
      <CardContent>
        <Typography variant="h6">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
      </CardContent>

      <CardActions>
        <Link href={`/users/${user.id}`}>
          <Button size="small" variant="outlined">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

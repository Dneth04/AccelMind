"use client"
import { SignIn } from "@clerk/clerk-react";
import { Toolbar, Typography,Button, Link, AppBar, Container,Box } from "@mui/material";
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function SignUpPage( ){
    return <Container maxWidth="100vw">
       <AppBar position="static" sx={{ backgroundColor: 'black', boxShadow: 'none' }}>
  <Toolbar>
  <BoltSharpIcon></BoltSharpIcon>
    <Typography variant="h6" style={{ flexGrow: 1 }}>
      AccelMind
    </Typography>
    <SignedOut>
      <Button color="inherit" href="/sign-in">Login</Button>
      <Button color="inherit" href="/sign-up">Sign Up</Button>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </Toolbar>
</AppBar>

        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
            <Typography variant="h5" >
                Sign In
            </Typography>
            <SignIn />
        </Box>
    </Container>
}

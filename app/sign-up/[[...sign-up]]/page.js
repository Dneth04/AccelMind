"use client"
import { SignUp } from "@clerk/nextjs";
import { Toolbar, Typography,Button, Link, AppBar, Container,Box } from "@mui/material";

export default function SignUpPage( ){
    return <Container maxWidth="100vw">
        <AppBar position="static" sx={{backgroundColor: '#3f51b3'}}>
            <Toolbar>
                <Typography variant = "h6"
                sx={{
                    flexGrow: 1,
                }}>
                    FlashLearn
                </Typography>
                <Button color="inherit">
                    <Link href="/sign-in" passHref>
                    Login
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link href="/sign-up" passHref>
                    Sign Up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
            <Typography variant="h5" >
                Sign Up
            </Typography>
            <SignUp />
        </Box>
    </Container>
}
'use client'
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { useRouter } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Flashcards() {

    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color for default background
                paper: 'linear-gradient(to right, #1d1160, #D8BFD8)',   // Gradient color for paper background
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color for body background
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                    },
                },
            },
        },
    });
    
    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;

            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                console.log(collections);
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }

        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    const handleCardClick = (name) => {
        if (name) {
            router.push(`/flashcard?id=${name}`);
        } else {
            console.error("Flashcard ID is undefined.");
        }
    };

    return (
        <Box 
  sx={{
    position: 'relative',  // Make the container position relative
    overflow: 'hidden',  // Ensure the pseudo-element stays within the container
    padding: 0,  // Remove any default padding
    width: '100vw',  // Full width of the viewport
    height: '100vh',  // Full height of the viewport
    '&::before': {
      content: '""',  // Create the pseudo-element
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/T2.jpeg")',  // Set the background image
      backgroundSize: 'cover',  // Cover the entire container
      backgroundPosition: 'center',  // Center the image
      opacity: 0.4,  // Set the opacity for the background image
      zIndex: -1,  // Ensure the pseudo-element is behind the content
    },
  }}
>
        <Container maxWidth="md">
        <ThemeProvider theme={darkTheme} >
      <CssBaseline />
    </ThemeProvider>
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
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
           variant="h5"
           sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center', 
               margin: '0 auto',  
               borderRadius: '8px', 
               backgroundColor: 'indigo', 
               padding: '0.75rem 2rem',
               color: '#fff', 
               textTransform: 'none', 
               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
               fontWeight: '800',
               fontSize: '1.4rem',
               fontFamily: 'sans-serif',
               '&:hover': {
                   backgroundColor: 'indigo', 
               }
           }}>Your Flashcard collections
           </Box>           
            <Grid container spacing={3} sx={{ mt: 4 , backgroundColor: 'linear-gradient(to right, #1d1160, #D8BFD8)'}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}  sx={{   backgroundColor: 'linear-gradient(to right, #1d1160, #D8BFD8)'}}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent >
                                    <Typography variant="h5" sx={{ color:'indigo' , fontWeight: '700', fontFamily: 'monospace'}}>{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <br></br>
                    <Link href="/" passHref>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    
                    '&:hover': {
                        color: 'white',
                    },
                }}
            >
                <ArrowBackIcon sx={{ mr: 2 }} />
                Back to Home
            </Typography>
        </Link>
                
        </Container></Box>
        
    );
}

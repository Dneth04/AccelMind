"use client"
import { useUser } from '@clerk/nextjs';
import { AppBar, Toolbar, Container, Typography, Paper, Button, Box, TextField, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useRouter } from 'next/navigation';
import { writeBatch, doc, collection, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { useState } from 'react';
import { db } from '../../firebase'; 
import axios from 'axios';
import { NextResponse } from "next/server";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BoltSharpIcon from '@mui/icons-material/BoltSharp';


export default function Generate() {
    const darkTheme = createTheme({
       
        palette: {
            mode: 'dark',
            background: {
                default: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color
                paper: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color for paper background
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                    },
                },
            },
        },
    });
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false); // Add state for Dialog open/close
    const router = useRouter();

    const handleSubmit = async () => {

        console.log(text);
        const response = await fetch("api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the Content-Type to text/plain
            },
            body: JSON.stringify({'text': text}), 
        }).then(res => res.json());
        
        let repo = response.passer;
        await setFlashcards(Array(JSON.parse(repo).flashcards));
        console.log(response.passer);
        console.log(flashcards);
    };
    
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const openFlashcards = async () => {
    
        if (!isSignedIn) {
            alert('You need to be signed in to save flashcards.');
            return;
        }
    
        try {
            const batch = writeBatch(db);
            const userDocRef = doc(db, 'users', user.id);
            const docSnap = await getDoc(userDocRef);
    
            let collections = [];
    
            if (docSnap.exists()) {
                collections = docSnap.data().flashcards || [];
    
                // if (collections.find((f) => f.name === name)) {
                //     alert('Flashcard collection with the same name already exists.');
                //     return;
                // }
            }
    
            // collections.push({ name });
            // batch.set(userDocRef, { flashcards: collections }, { merge: true });
    
            // const colRef = collection(userDocRef, name);
    
            // Iterate over the flashcards array and save each flashcard individually
            // flashcards[0].forEach((flashcard) => {
            //     const cardDocRef = doc(colRef);
            //     batch.set(cardDocRef, flashcard);  // Ensure flashcard is an object, not an array
            // });
    
            // await batch.commit();
            // handleClose();
            router.push('/flashcards');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('An error occurred while saving the flashcards. Please try again.');
        }
    };
    

    const saveFlashcards = async () => {
        if (!isLoaded) {
            alert('User information is still loading. Please wait.');
            return;
        }
    
        if (!isSignedIn) {
            alert('You need to be signed in to save flashcards.');
            return;
        }
    
        if (!name) {
            alert('Please enter a name for your flashcard collection.');
            return;
        }
    
        try {
            const batch = writeBatch(db);
            const userDocRef = doc(db, 'users', user.id);
            const docSnap = await getDoc(userDocRef);
    
            let collections = [];
    
            if (docSnap.exists()) {
                collections = docSnap.data().flashcards || [];
    
                if (collections.find((f) => f.name === name)) {
                    alert('Flashcard collection with the same name already exists.');
                    return;
                }
            }
    
            collections.push({ name });
            batch.set(userDocRef, { flashcards: collections }, { merge: true });
    
            const colRef = collection(userDocRef, name);
    
            // Iterate over the flashcards array and save each flashcard individually
            flashcards[0].forEach((flashcard) => {
                const cardDocRef = doc(colRef);
                batch.set(cardDocRef, flashcard);  // Ensure flashcard is an object, not an array
            });
    
            await batch.commit();
            handleClose();
            router.push('/flashcards');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('An error occurred while saving the flashcards. Please try again.');
        }
    };
    

    return (
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


            <Box sx={{ mt: 4, md: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
                        variant='h5'
                        sx={{
                            textAlign: 'center', 
                            marginBottom: '1.5rem', 
                            fontWeight: 'bold', 
                            color: '#1d1160', 
                            letterSpacing: '0.07em', 
                        
                        }}
                    >
                       Enjoy the Learning process through our Flashcards!
                    </Typography>
            <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'center', 
                            marginBottom: '1.5rem', 
                            fontWeight: '500', 
                            color: '#E6E6FA', 
                            letterSpacing: '0.07em',
                            fontFamily: 'veranda'
                        }}
                    >
                        Input your query to get concise answers. 
                        Quickly grasp and review key concepts with ease.
                    </Typography>

                <Paper sx={{ p: 4, width: '100%', alignContent: 'center', color: 'white', backgroundColor: 'transparent' }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter your input prompt here"
                        fullWidth
                        multiline
                        rows={4}
                        variant='outlined'
                        sx={{ md: 2 }}
                    />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            margin: '0 auto',  
                            borderRadius: '8px', 
                            backgroundColor: '#3f51b5', 
                            padding: '0.75rem 2rem',
                            color: '#fff', 
                            textTransform: 'none', 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                            '&:hover': {
                                backgroundColor: '#303f9f', 
                            }
                        }}
                    >
                        Generate Flashcards
                    </Button>
                </Paper>
                <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'center', 
                            marginBottom: '1.5rem', 
                            fontWeight: '600', 
                            color: '#000', 
                            letterSpacing: '0.07em',
                            fontFamily: 'veranda'
                        }}
                    >
                        Please sign in to save your flashcards. After Generating, Scroll down to proceed with saving!
                    </Typography>

            </Box>
            <br></br>
            <Button onClick={openFlashcards}
           variant="contained"
           color="primary"
           sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center', 
               margin: '0 auto',  
               borderRadius: '8px', 
               backgroundColor: 'transparent', 
               padding: '0.75rem 2rem',
               color: '#fff', 
               textTransform: 'none', 
               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
               fontWeight: '800',
               '&:hover': {
                   backgroundColor: 'indigo', 
               }
           }}>Your Flashcard collections</Button>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant='h5'
                        sx={{
                            textAlign: 'center', 
                            marginBottom: '1.5rem', 
                            fontWeight: 'bold', 
                            color: '#333', 
                            letterSpacing: '0.05em', 
                        }}
                    >
                        Flashcard Preview
                    </Typography>
                    <Grid container spacing={3}>  
                        {flashcards[0].map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        backgroundColor: 'rgba(90,120,500, 0.1)', // Softer background color
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                        transform: flipped[index]
                                                            ? 'rotateY(180deg)'
                                                            : 'rotateY(0deg)',
                                                    },
                                                    '& > div > div:nth-of-type(1)': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                        backgroundColor: 'rgba(90,120,500, 0.2)', // Uniform background color
                                                        color: '#333', // Text color
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                        backgroundColor: 'rgba(90,120,500, 0.2)', // Uniform background color
                                                        backfaceVisibility: 'hidden',
                                                        textAlign: 'center',
                                                        padding: '1rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: '#333', // Text color
                                                    },
                                                }}
                                            >
                                                <div>
                                                    <div>
                                                        <Typography
                                                            variant='h6' // Smaller font size
                                                            component="div"
                                                            sx={{ 
                                                                fontSize: '1rem', 
                                                                textAlign: 'center',
                                                                padding: '0.5rem',
                                                                color: '#1d1160',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography
                                                            variant='body1' // Smaller font size for the back
                                                            component="div"
                                                            sx={{ 
                                                                fontSize: '0.67rem',
                                                                fontWeight: 'bold', 
                                                                textAlign: 'center',
                                                                padding: '0.5rem',
                                                                lineHeight: '2',
                                                            }}
                                                        >
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid> 
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            sx={{
                                borderRadius: '10%'
                            }}
                            variant='contained' color='secondary' onClick={handleOpen}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcard</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcard collection.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

"use client"
import {useUser} from '@clerk/nextjs'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { useSearchParams } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

export default function Flashcard(){
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
            if ( !search || !user) return;
            const colRef = collection(db, 'users', user.id, search);  // Correct reference to 'colRef'
            const docs = await getDocs(colRef);  // Use 'colRef' here

            const flashcards = [];
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
        }

        getFlashcard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{mt: 4}}>
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
                            {flashcards.map((flashcard, index) => (
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
                                                                    fontSize: '0.875rem',
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
                    </Box>
                )}
            </Grid>
        </Container>
    )
}

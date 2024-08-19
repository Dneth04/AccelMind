'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from "next/navigation"
import { CircularProgress} from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, Container, Box, Button } from "@mui/material";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

      useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                return
            }
            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error occurred while retrieving the session.')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    const back = () => {
        router.push('/');
      }


    if (error){
        return (
            <Container 
            maxWidth="lg"
            sx={{
                textAlign: "center",
                mt: 4,
            }}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        )
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: 'linear-gradient(to right, #1d1160, #D8BFD8)', // Gradient color
                paper: 'linear-gradient(to right, #1d1160, #D8BFD8)' // Gradient color for paper background
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
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <ThemeProvider theme={darkTheme} >
      <CssBaseline />
    </ThemeProvider>
            {loading ? (
                <CircularProgress color="primary" />
            ) : error ? (
                <Typography variant="h6" color="error">{error}</Typography>
            ) : session && session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4" sx={{
                        background: 'linear-gradient(45deg, #00000, #ff4081)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2
                    }}>
                        Thank you for your purchase!
                    </Typography>
                    <Box sx={{ mt: 2, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary">Session ID: {session_id}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            We have received your payment. You will receive an email with the order details.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4" sx={{
                     
                    }}>
                        Payment failed
                    </Typography>
                    <Box sx={{ mt: 2, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 , color: 'linear-gradient(45deg, #FE6B8B, #FF8E53)'}}>
                        <Typography variant="body1" color="text.secondary">
                            Your payment was not successful. Please try again!
                        </Typography>
                    </Box>
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
                </>
            )}
  
        </Container>
    )
}

export default ResultPage

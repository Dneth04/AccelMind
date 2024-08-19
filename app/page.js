 "use client";

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Grid, Typography, Container, Box, Button } from "@mui/material";
import Head from "next/head";  // Importing Head from next/head
import { handleClientScriptLoad } from "next/script";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from 'next/navigation';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import Hotjar from '@hotjar/browser';

const siteId = 5100229;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);
export default function Home() {
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
  const router = useRouter(); // Initialize the router
  const handleClick = () => {
    router.push('/generate'); // Navigate to the /generate page
};
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
    
    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id, 
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>AccelMind</title>

        <meta name="description" content="Create flashcards from your text" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
   
      </Head>

      <Container maxWidth={false}
      sx={{
        position: 'relative',  // Make the container position relative
        overflow: 'hidden',  // Ensure the pseudo-element stays within the container
        padding: '0',  // Remove any default padding
        '&::before': {
          content: '""',  // Create the pseudo-element
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/Final.jpeg")',  // Set the background image
          backgroundSize: 'cover',  // Cover the entire container
          backgroundPosition: 'center',  // Center the image
          opacity: 0.3,  // Set the opacity for the background image
          zIndex: -1,  // Ensure the pseudo-element is behind the content
        },
      }}>
      <ThemeProvider theme={darkTheme} >
      <CssBaseline />
    </ThemeProvider>
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
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
          sx={{
            textAlign: "center",
            my: 4,
          }}
        >
          {/* <Typography variant="h2" gutterBottom>
            Get started with AccelMind
          </Typography> */}
<Typography 
  variant="h5" 
  sx={{ 
    fontSize: { xs: '2rem', sm: '3rem' },  // Responsive font size for different screens
    fontWeight: '800',  // Extra bold font weight
    textAlign: 'center',  
    margin: '0 auto', // Center the text block horizontally
    background: 'linear-gradient(to right, indigo, black)',  // Gradient color from #4B0082 to white
    WebkitBackgroundClip: 'text',  // Ensures the background is clipped to the text
    WebkitTextFillColor: 'transparent',  // Makes the text itself transparent, allowing the gradient to show
    display: 'inline-flex',  // Inline flex to align the items properly
  }}
>
  Excel with AccelMind
</Typography>
<Typography 
  variant="body1" 
  sx={{ 
    fontSize: { xs: '2.5rem', sm: '2rem' },  // Responsive font size for different screens
    fontWeight: '800',  // Extra bold font weight
    textAlign: 'center',  // Center alignment
    margin: '0 auto',  // Center the text block horizontally
    background: 'white',  // Gradient color from black to white
    WebkitBackgroundClip: 'text',  // Ensures the background is clipped to the text
    WebkitTextFillColor: 'transparent',  // Makes the text itself transparent, allowing the gradient to show
  }}
>
  Smarter Way to Study
</Typography>



 <Button 
  variant="contained" 
  color="primary" 
  sx={{ 
    fontSize: { xs: '1rem', sm: '1rem' },  // Responsive font size for different screens
    mt: 2,  // Margin top
    background: 'transparent',  // Gradient background
    borderRadius: '10px',  // Rounded corners
    padding: '10px 20px',  // Padding inside the button
    fontWeight: 'bold',  // Bold text
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',  // Box shadow for depth
    transition: 'background 0.3s ease, transform 0.3s ease',  // Smooth transition for hover effects
    '&:hover': {  // Hover effects
      background: 'linear-gradient(to right, #8A2BE2, #4B0082)',  // Inverted gradient background on hover
      transform: 'scale(1.05)',  // Slightly increase the size on hover
    }
  }} 
  onClick={handleClick}
>
  Start Learning
</Button>

        </Box>
        <Box sx={{my: 6}}>
          <Typography variant="body1" 
  sx={{ 
    fontSize: { xs: '2.5rem', sm: '2rem' },  // Responsive font size for different screens
    fontWeight: '800',  // Extra bold font weight
    textAlign: 'center',  // Center alignment
    margin: '0 auto',  // Center the text block horizontally
    background: 'white',  // Gradient color from black to white
    WebkitBackgroundClip: 'text',  // Ensures the background is clipped to the text
    WebkitTextFillColor: 'transparent',  // Makes the text itself transparent, allowing the gradient to show
  }}>
            Features
          </Typography>
          <br></br>
<Grid container spacing={4}>
  <Grid item xs={12} md={4}>
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        maxWidth: '700px',
        position: 'relative',  // Make the box position relative
        overflow: 'hidden',  // Ensure the pseudo-element stays within the box
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #4B0082, white)', 
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          opacity: 0.4,  // Set the opacity for the background image
          zIndex: -1,  // Ensure the pseudo-element is behind the content
          borderRadius: 'inherit',  // Inherit the border radius of the Box
        },
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.3)',
          fontWeight: '800'
        },
      }}
    > 
          {/* <img src="/Feature2.png" alt="Feature 1" style={{ width: '50px', height: '50px', marginBottom: '16px', borderRadius: '5%', boxShadow: 'indigo'}} /> */}

      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.2rem' },  
          fontWeight: '800',  
          color: 'transparent',  
          background: 'linear-gradient(to right, #4B0082, #452c63)', 
          WebkitBackgroundClip: 'text',  
          WebkitTextFillColor: 'transparent',  
          marginBottom: '8px',
        }}
      >
        Instant Flashcard Generation
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}
      >
You can instantly convert any text input into detailed flashcards. This feature is perfect for student, offering a  efficient way to break down complex information into pieces for better learning and recall.      </Typography>
    </Box>
  </Grid>

  <Grid item xs={12} md={4}>
    <Box 
     sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'transparent',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '16px',
      padding: '20px',
      maxWidth: '700px',
      position: 'relative',  // Make the box position relative
      overflow: 'hidden',  // Ensure the pseudo-element stays within the box
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      
      '&:hover': {
        '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, #4B0082, white)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,  // Set the opacity for the background image
        zIndex: -1,  // Ensure the pseudo-element is behind the content
        borderRadius: 'inherit',  // Inherit the border radius of the Box
      },
        transform: 'scale(1.05)',
        boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.3)',
        fontWeight: '800',
      },
    }}
    >
      {/* <img src="/path-to-your-image2.png" alt="Feature 2" style={{ width: '100px', height: 'auto', marginBottom: '16px' }} /> */}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.2rem' },  
          fontWeight: '800',  
          color: 'transparent',  
          background: 'linear-gradient(to right, #4B0082, #452c63)', 
          WebkitBackgroundClip: 'text',  
          WebkitTextFillColor: 'transparent',  
          marginBottom: '8px',
        }}
      >
        AI-Powered Content Analysis
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}
      >
It leverages Gemini to analyze your text and extract the most critical information. This ensures that your flashcards focus on the key points, helping you study smarter, not harder. </Typography>
    </Box>
  </Grid>

  <Grid item xs={12} md={4}>
    <Box 
       sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        maxWidth: '700px',
        position: 'relative',  // Make the box position relative
        overflow: 'hidden',  // Ensure the pseudo-element stays within the box
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        
        '&:hover': {
          '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #4B0082, white)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,  // Set the opacity for the background image
          zIndex: -1,  // Ensure the pseudo-element is behind the content
          borderRadius: 'inherit',  // Inherit the border radius of the Box
        },
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.3)',
          fontWeight: '800'
        },
      }}
    >      

<Typography 
        variant="body2" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.2rem' },  
          fontWeight: '800',  
          color: 'transparent',  
          background: 'linear-gradient(to right, #4B0082, #452c63)', 
          WebkitBackgroundClip: 'text',  
          WebkitTextFillColor: 'transparent',  
          marginBottom: '8px',
        }}
      >
        
        Accessible Anytime, Anywhere
      </Typography>
    
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}
      >
Never worry about losing your study materials again. FlashLearn allows you to access your flashcards from any device, whether you’re online or offline. This flexibility ensures that you can study whenever and wherever you need to, without the limitations of connectivity.      </Typography>
    </Box>
  </Grid>
</Grid>
</Box>
        <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="body1" 
  sx={{ 
    fontSize: { xs: '2.5rem', sm: '2rem' },  // Responsive font size for different screens
    fontWeight: '800',  // Extra bold font weight
    textAlign: 'center',  // Center alignment
    margin: '0 auto',  // Center the text block horizontally
    background: 'white',  // Gradient color from black to white
    WebkitBackgroundClip: 'text',  // Ensures the background is clipped to the text
    WebkitTextFillColor: 'transparent',  // Makes the text itself transparent, allowing the gradient to show
  }}>
            Pricing
          </Typography>
          <br></br>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: 'grey.300',
                borderRadius: 2,
              }}>
              <Typography variant="h5" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '2rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}>
              Basic
              </Typography>
              <Typography variant="h5" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.5rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}>
              $0 / month
              </Typography>
              <Typography variant="body1" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1rem' },  
          fontWeight: '600',
          color: 'gray.800',  
          fontFamily: 'sans-serif'
        }}>
                {' '}
                Access to flashcard features but with limited storage.
              </Typography>
            
 <Button 
  variant="contained" 
  color="primary" 
  sx={{ 
    fontSize: { xs: '1rem', sm: '1rem' },  // Responsive font size for different screens
    mt: 2,  // Margin top
    background: 'transparent',  // Gradient background
    borderRadius: '10px',  // Rounded corners
    padding: '10px 20px',  // Padding inside the button
    fontWeight: 'bold',  // Bold text
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',  // Box shadow for depth
    transition: 'background 0.3s ease, transform 0.3s ease',  // Smooth transition for hover effects
    '&:hover': {  // Hover effects
      background: 'linear-gradient(to right, #8A2BE2, #4B0082)',  // Inverted gradient background on hover
      transform: 'scale(1.05)',  // Slightly increase the size on hover
    }
  }} 
  onClick={handleClick}
>
  Get Started
</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: 'grey.300',
                borderRadius: 2,
              }}>
              <Typography variant="h5" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '2rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}>
              Pro
              </Typography>
              <Typography variant="h5" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.5rem' },  
          fontWeight: '500',
          color: 'gray.800',  
          fontFamily: 'veranda'
        }}>
              $10 / month
              </Typography>
              <Typography variant="h5" 
        sx={{ 
          fontSize: { xs: '1rem', sm: '1rem' },  
          fontWeight: '600',
          color: 'gray.800',  
          fontFamily: 'sans-serif'
        }}>
                {' '}
                Access to unlimited flashcards and storage.
              </Typography>

              <Button 
  variant="contained" 
  color="primary" 
  sx={{ 
    fontSize: { xs: '1rem', sm: '1rem' },  // Responsive font size for different screens
    mt: 2,  // Margin top
    background: 'transparent',  // Gradient background
    borderRadius: '10px',  // Rounded corners
    padding: '10px 20px',  // Padding inside the button
    fontWeight: 'bold',  // Bold text
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',  // Box shadow for depth
    transition: 'background 0.3s ease, transform 0.3s ease',  // Smooth transition for hover effects
    '&:hover': {  // Hover effects
      background: 'linear-gradient(to right, #8A2BE2, #4B0082)',  // Inverted gradient background on hover
      transform: 'scale(1.05)',  // Slightly increase the size on hover
    }
  }} 
  onClick={handleSubmit}
>
  Choose Pro
</Button>
              </Box>
            </Grid>
            
          </Grid>
        </Box>

      </Container>
    </>
  );
}

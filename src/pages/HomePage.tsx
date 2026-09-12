import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkoutSection from "../components/WorkoutSection"
import LogScore from "../components/LogScore";
import ScoreHistory from "../components/ScoreHistory";
import QuoteOfTheDay from "../components/Quote";

function HomePage() {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mb: { xs: 1, md: 3 } }}>
        <Typography variant="h3" component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '3rem' },
            textAlign: 'center'
          }}
        >
          Today's Workout
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '6fr 4fr' }, gap: 3 }}>


        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                minWidth: { xs: 'auto' },
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
                '& .MuiButton-label': { display: { xs: 'none', sm: 'inline' } },
                '& .MuiButton-text': { display: { xs: 'none', sm: 'inline' } }
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Prev</Box>
            </Button>
            <Typography variant="h6">Sep 11, 2026</Typography>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                minWidth: { xs: 'auto' },
                '& .MuiButton-endIcon': { ml: { xs: 0, sm: 1 } },
                '& .MuiButton-label': { display: { xs: 'none', sm: 'inline' } },
                '& .MuiButton-text': { display: { xs: 'none', sm: 'inline' } }
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Next</Box>
            </Button>
          </Box>

          <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>

            <WorkoutSection />

          </Paper>

        </Box>



        <Stack spacing={2}>

          <QuoteOfTheDay />

          <LogScore />

          <ScoreHistory />

        </Stack>


      </Box>
    </>
  )
}

export default HomePage

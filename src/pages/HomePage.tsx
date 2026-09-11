import { Box, Paper, Stack, Typography } from "@mui/material"

function HomePage() {

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 2, px: { xs: 2, md: 0 } }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}> Workout Name </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' }, gap: 3 }}>


        <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Typography variant="h2" color="secondary"> Welcome to the WOD App! </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This application is designed to help you track your workouts, monitor your progress, and analyze your performance over time. Whether you're a beginner or an experienced athlete, the WOD App provides you with the tools you need to achieve your fitness goals.
          </Typography>
        </Paper>

        <Stack spacing={2}>
          <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="h2" color="secondary"> Quick Links </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                - <a href="/programs">Programs</a>
              </Typography>
              <Typography variant="body1">
                - <a href="/history">History</a>
              </Typography>
              <Typography variant="body1">
                - <a href="/results">Results</a>
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="h2" color="secondary"> About </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              The WOD App is built using React and Material-UI, providing a responsive and user-friendly interface. It leverages modern web technologies to ensure a seamless experience across devices.
            </Typography>
          </Paper>
        </Stack>



      </Box>
    </Box>
  )
}

export default HomePage

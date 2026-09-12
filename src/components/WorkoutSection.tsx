import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function WorkoutSection() {
    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h4" color="secondary" gutterBottom sx={{ fontWeight: 'bold', mb: 2, pl: 1 }}>
                Four Ton Mayhem
            </Typography>

            <Accordion
                defaultExpanded
                sx={{
                    // maxWidth: 600, 
                    pl: 1,
                    borderRadius: '12px !important',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:before': { display: 'none' }, // Removes the default MUI accordion line
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 2
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`accordion1-panel`}
                    id={`accordion1-header`}
                    sx={{ px: 2 }}
                >
                    <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontSize: 17, fontWeight: 700 }}>
                        Warm Up
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                General Warm Up:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, fontWeight: 500 }}>
                                5 Minute Easy Row or Jog<br />
                                2 Rounds of:<br />
                                - 10 Scapular Pull-ups<br />
                                - 10 Air Squats<br />
                                - 10 Push-ups<br />
                                - 20 Seconds Plank
                            </Typography>
                        </Box>

                        <Divider />

                        <Accordion
                            sx={{
                                bgcolor: 'action.hover',
                                borderRadius: '8px !important',
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:before': { display: 'none' }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 1 }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    💡 Coach's Tip & Strategy
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 1 }}>
                                <Typography variant="body2" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 500, fontSize: 13 }}>
                                    Remember to warm up before starting your workout to prevent injuries and improve performance.
                                </Typography>

                                <Stack spacing={1.2}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', mb: 0.2 }}>
                                            Stimulus and Strategy:
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                            Today's workout is the CrossFit benchmark Andi. We last completed this workout in April, so you have an opportunity see if you can improve your time.
                                        </Typography>
                                    </Box>

                                    <Typography variant="caption" sx={{ color: 'text.primary', fontStyle: 'italic', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                        Go for large sets from start to finish — ideally opening with at least 20 reps, then several sets of 15, never dropping below 10. If you're unable to hit that stimulus, reduce load or volume as needed.
                                    </Typography>

                                    <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                        In the warm-up, expect to demonstrate 15 sound, unbroken reps of each movement to earn that load for the workout. Don't mistake the light loads as an invitation to go as prescribed when that's not normally your approach — choose an easy load and move faster instead.
                                    </Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded
                sx={{
                    // maxWidth: 600, 
                    pl: 1,
                    borderRadius: '12px !important',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:before': { display: 'none' }, // Removes the default MUI accordion line
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 2
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`accordion1-panel`}
                    id={`accordion1-header`}
                    sx={{ px: 2 }}
                >
                    <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontSize: 17, fontWeight: 700 }}>
                        Metcon
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                For time:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, fontWeight: 500 }}>
                                100 hang power snatches<br />
                                100 push presses<br />
                                100 sumo deadlift high pulls<br />
                                100 front squats
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, pb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                ♀ 45-lb barbell
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                ♂ 65-lb barbell
                            </Typography>
                        </Box>

                        <Divider />

                        <Accordion
                            sx={{
                                bgcolor: 'action.hover',
                                borderRadius: '8px !important',
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:before': { display: 'none' }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 1 }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    💡 Coach's Tip & Strategy
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 1 }}>
                                <Typography variant="body2" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 500, fontSize: 13 }}>
                                    Remember to warm up before starting your workout to prevent injuries and improve performance.
                                </Typography>

                                <Stack spacing={1.2}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', mb: 0.2 }}>
                                            Stimulus and Strategy:
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                            Today's workout is the CrossFit benchmark Andi. We last completed this workout in April, so you have an opportunity see if you can improve your time.
                                        </Typography>
                                    </Box>

                                    <Typography variant="caption" sx={{ color: 'text.primary', fontStyle: 'italic', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                        Go for large sets from start to finish — ideally opening with at least 20 reps, then several sets of 15, never dropping below 10. If you're unable to hit that stimulus, reduce load or volume as needed.
                                    </Typography>

                                    <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                        In the warm-up, expect to demonstrate 15 sound, unbroken reps of each movement to earn that load for the workout. Don't mistake the light loads as an invitation to go as prescribed when that's not normally your approach — choose an easy load and move faster instead.
                                    </Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            <Accordion
                defaultExpanded
                sx={{
                    // maxWidth: 600, 
                    pl: 1,
                    borderRadius: '12px !important',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:before': { display: 'none' }, // Removes the default MUI accordion line
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 2
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`accordion3-panel`}
                    id={`accordion3-header`}
                    sx={{ px: 2 }}
                >
                    <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontSize: 17, fontWeight: 700 }}>
                        Accessory / Cooldown
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Strength & Stability:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, fontWeight: 500 }}>
                                3 Sets of:<br />
                                - 12 Bulgarian Split Squats (per leg)<br />
                                - 15 Weighted Russian Twists<br />
                                - 12 Dumbbell Rows (per arm)
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, pb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                💡 Moderate Weight
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                ⏱ 60s Rest between sets
                            </Typography>
                        </Box>
                    </Stack>
                </AccordionDetails>
            </Accordion>

        </Box>
    )
}

export default WorkoutSection
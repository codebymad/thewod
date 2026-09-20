import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Divider, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReactMarkdown from 'react-markdown'

interface WorkoutSection {
    section_name: string;
    section_content: string;
    section_notes?: string[];
}

interface WorkoutObject {
    workout_id: string;
    workout_name: string;
    sections: WorkoutSection[];
    metadata?: Record<string, any>;
}

interface Props {
    workout: WorkoutObject | null;
}

function WorkoutSection({ workout }: Props) {

    const toTitleCase = (str: string) =>
        str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h4" color="secondary" gutterBottom sx={{
                fontWeight: 'bold', mb: 2, pl: 1,
                fontSize: { xs: '1.1rem', md: '2rem' }
            }}>
                {workout?.workout_name}
            </Typography>

            {workout?.sections.map((section, index) => (
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
                            <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<TaskAltIcon />} /> {toTitleCase(section.section_name)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 2 }}>
                        <Stack spacing={2}>
                            <Box>
                                {/* <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    General Warm Up:
                                </Typography> */}
                                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                    <ReactMarkdown>{section.section_content}</ReactMarkdown>
                                </Typography>
                            </Box>

                            {/* <Box sx={{ display: 'flex', gap: 3, pb: 1 }}>
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                    Take your time
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                                    Prepare of Metcon
                                </Typography>
                            </Box> */}

                            <Divider />


                            {section.section_notes && (
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
                                            💡 Note
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 1 }}>
                                        {/* <Typography variant="body2" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 500, fontSize: 13 }}>
                                            Remember to warm up before starting your workout to prevent injuries and improve performance.
                                        </Typography> */}

                                        <Stack spacing={1.2}>
                                            {/* <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', mb: 0.2 }}>
                                                    Stimulus and Strategy:
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                                    Today's workout is the CrossFit benchmark Andi. We last completed this workout in April, so you have an opportunity see if you can improve your time.
                                                </Typography>
                                            </Box> */}

                                            <Stack spacing={1.2}>
                                                {section.section_notes?.map((note, idx) => (
                                                    <Typography
                                                        key={idx}
                                                        variant="caption"
                                                        sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}
                                                    >
                                                        <ReactMarkdown>{note}</ReactMarkdown>
                                                    </Typography>
                                                ))}
                                            </Stack>

                                        </Stack>


                                    </AccordionDetails>
                                </Accordion>
                            )}

                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}




        </Box>
    )
}

export default WorkoutSection
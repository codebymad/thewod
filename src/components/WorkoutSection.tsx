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

    console.log(workout)

    const toTitleCase = (str: string) =>
        str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());


    function normalizeMarkdown(input: string): string {
        if (!input || typeof input !== "string") return "";

        let text = input.trim();

        // 1. Normalize line endings
        text = text.replace(/\r\n/g, "\n");

        // 2. Convert HTML tags to plain text (basic)
        text = text
            .replace(/<\/?p>/gi, "\n\n")
            .replace(/<\/?br\s*\/?>/gi, "\n")
            .replace(/<\/?strong>/gi, "**")
            .replace(/<\/?em>/gi, "*")
            .replace(/<\/?b>/gi, "**")
            .replace(/<\/?i>/gi, "*")
            .replace(/<\/?h[1-6]>/gi, "\n\n");

        // 3. Normalize separators (----- or ==== → ---)
        text = text.replace(/[-=]{3,}/g, "\n---\n");

        // 4. Convert "NOTES:" to markdown heading
        text = text.replace(/^NOTES:?/gim, "### Notes");

        // 5. Ensure bullet points are markdown-friendly
        text = text.replace(/^\s*[-•]\s*/gm, "- ");

        // 6. Convert single line breaks into paragraphs
        // (but keep existing markdown lists, headings, and code blocks intact)
        text = text
            .split("\n")
            .map((line) => {
                if (
                    line.match(/^\s*[-*+]\s+/) || // list
                    line.match(/^#{1,6}\s+/) || // heading
                    line.match(/^>\s+/) || // blockquote
                    line.match(/^```/) || // code fence
                    line.trim() === "" // empty line
                ) {
                    return line;
                }
                return line + "\n";
            })
            .join("\n");

        // 7. Collapse excessive blank lines
        text = text.replace(/\n{3,}/g, "\n\n");

        return text.trim();
    }


    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h4" color="secondary" gutterBottom sx={{
                fontWeight: 'bold', mb: 2, pl: 1,
                fontSize: { xs: '1.1rem', md: '2rem' }
            }}>
                {workout?.workout_name}
            </Typography>


            <Box sx={{ display: 'flex', gap: 3, pb: 1 }}>
                {workout?.metadata?.tags?.map((tag: string, _: number) => (
                    <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
                        {tag}
                    </Typography>
                ))}
            </Box>


            {(!workout?.sections || workout.sections.length === 0) ? (
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        py: 4,
                        fontWeight: 700,
                        color: 'text.primary'
                    }}
                >
                    Rest Day
                </Typography>
            ) : (
                workout?.sections.map((section, idx) => (
                    <Accordion
                        key={section.section_name || idx}
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
                                <Box
                                    sx={{
                                        color: 'text.primary',
                                        lineHeight: 1.6,
                                        fontSize: '0.875rem', // matches body2
                                        // Prevent any child from overflowing
                                        overflowX: 'hidden',
                                        wordBreak: 'break-word',
                                        '& pre': {
                                            overflowX: 'auto',
                                            maxWidth: '100%',
                                            whiteSpace: 'pre-wrap',
                                        },
                                        '& code': {
                                            wordBreak: 'break-all',
                                        },
                                        '& table': {
                                            display: 'block',
                                            overflowX: 'auto',
                                            maxWidth: '100%',
                                        },
                                        '& img': {
                                            maxWidth: '100%',
                                            height: 'auto',
                                        },
                                        '& p': { margin: '0 0 8px 0' },
                                    }}
                                >
                                    <ReactMarkdown>{normalizeMarkdown(section.section_content)}</ReactMarkdown>
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
                                    // <Accordion
                                    //     sx={{
                                    //         bgcolor: 'action.hover',
                                    //         borderRadius: '8px !important',
                                    //         border: '1px solid',
                                    //         borderColor: 'divider',
                                    //         '&:before': { display: 'none' }
                                    //     }}
                                    // >
                                    //     <AccordionSummary
                                    //         expandIcon={<ExpandMoreIcon />}
                                    //         sx={{ px: 1 }}
                                    //     >
                                    //         <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    //             💡 Note
                                    //         </Typography>
                                    //     </AccordionSummary>
                                    //     <AccordionDetails sx={{ p: 1 }}>
                                    //         {/* <Typography variant="body2" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 500, fontSize: 13 }}>
                                    //             Remember to warm up before starting your workout to prevent injuries and improve performance.
                                    //         </Typography> */}

                                    //         <Stack spacing={1.2}>
                                    //             {/* <Box>
                                    //                 <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', display: 'block', mb: 0.2 }}>
                                    //                     Stimulus and Strategy:
                                    //                 </Typography>
                                    //                 <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}>
                                    //                     Today's workout is the CrossFit benchmark Andi. We last completed this workout in April, so you have an opportunity see if you can improve your time.
                                    //                 </Typography>
                                    //             </Box> */}

                                    //             <Stack spacing={1.2}>
                                    //                 {section.section_notes?.map((note, idx) => (
                                    //                     <Typography
                                    //                         key={idx}
                                    //                         variant="caption"
                                    //                         sx={{ color: 'text.primary', fontWeight: 500, display: 'block', lineHeight: 1.4 }}
                                    //                     >
                                    //                         <ReactMarkdown>{note}</ReactMarkdown>
                                    //                     </Typography>
                                    //                 ))}
                                    //             </Stack>

                                    //         </Stack>


                                    //     </AccordionDetails>
                                    // </Accordion>
                                )}

                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                )))
            }



        </Box>
    )
}

export default WorkoutSection
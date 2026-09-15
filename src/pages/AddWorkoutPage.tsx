import { Box, Button, TextField, Typography, Stack, Divider, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Edit, Check, ExpandMore, Add, Delete } from "@mui/icons-material";
import { useState } from "react";
import RichTextEditorComponent from "../components/RichTextEditorComponent";
import ReactMarkdown from "react-markdown";


const PREDEFINED_SECTIONS = [
    "Warm Up",
    "Strength",
    "Metcon",
    "Cool Down",
    "Mobility",
    "Core"
];

interface WorkoutSection {
    id: number;
    name: string;
    content: string;
    content2: string[];
    isEditingContent?: boolean;
    isEditingContent2?: boolean;
}

function AddWorkoutPage() {
    const [workoutName, setWorkoutName] = useState("");
    const [isEditingWorkoutName, setIsEditingWorkoutName] = useState(false);
    const [sections, setSections] = useState<WorkoutSection[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsEditingWorkoutName(false);
        setIsDialogOpen(true);
    };
    const closeDialog = () => setIsDialogOpen(false);

    const addSection = (sectionName: string) => {
        setIsEditingWorkoutName(false);
        setSections([...sections, { id: Date.now(), name: sectionName, content: "", content2: [] }]);
        closeDialog();
    };

    const updateSection = (id: number, field: keyof WorkoutSection, value: any) => {
        setSections(sections.map(s => {
            if (s.id === id) {
                if (field === 'isEditingContent' && value === true) {
                    setIsEditingWorkoutName(false);
                    return { ...s, isEditingContent: true, isEditingContent2: false };
                }
                if (field === 'isEditingContent2' && value === true) {
                    setIsEditingWorkoutName(false);
                    return { ...s, isEditingContent: false, isEditingContent2: true };
                }
                return { ...s, [field]: value };
            }
            return s;
        }));
    };

    const removeSection = (id: number) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const handleSaveWorkout = () => {
        const workoutData = {
            name: workoutName,
            date: "2026-09-12", // Using current date from context
            sections: sections.map(({ id, isEditingContent, isEditingContent2, ...rest }) => rest)
        };
        console.log("Saving Workout JSON:", JSON.stringify(workoutData, null, 2));
        alert("Workout JSON printed to console!");
    };

    return (

        <Box sx={{
            p: 3,
            //maxWidth: '',
            mx: "auto",
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 64px)' // Adjusted for typical app bar height
        }}>
            <Typography variant="h5" color="text.secondary" align="right"> Sep 12, 2026 </Typography>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>Create Workout</Typography>

            <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isEditingWorkoutName ? (
                        <TextField
                            fullWidth
                            label="Workout Name"
                            variant="outlined"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            size="small"
                        />

                    ) : (
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'medium' }}>
                            {workoutName || "Untitled Workout"}
                        </Typography>
                    )}
                    <IconButton onClick={() => {
                        // Close all section edits when editing workout name
                        setSections(sections.map(s => ({ ...s, isEditingContent: false, isEditingContent2: false })));
                        setIsEditingWorkoutName(!isEditingWorkoutName);
                    }}>
                        {isEditingWorkoutName ? <Check color="primary" /> : <Edit />}
                    </IconButton>
                </Box>

                <Divider />

                {sections.map((section, _) => (
                    <Accordion
                        key={section.id}
                        sx={{
                            borderRadius: '12px !important',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:before': { display: 'none' },
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 2
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            sx={{ px: 2 }}
                        >
                            <Typography variant="h6" component="div" sx={{ color: 'text.primary', fontSize: 17, fontWeight: 700 }}>
                                {section.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 2 }}>
                            <Stack spacing={2}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 'bold' }}>
                                            Workout:
                                        </Typography>
                                        <IconButton size="small" onClick={() => updateSection(section.id, 'isEditingContent', !section.isEditingContent)}>
                                            {section.isEditingContent ? <Check color="primary" fontSize="small" /> : <Edit fontSize="small" />}
                                        </IconButton>
                                    </Box>
                                    {section.isEditingContent ? (
                                        <RichTextEditorComponent
                                            value={section.content}
                                            onChange={(val) => updateSection(section.id, 'content', val.trimEnd())}
                                        />
                                    ) : (
                                        <Box sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                            {section.content ? (
                                                <ReactMarkdown>{section.content.trim()}</ReactMarkdown>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic' }}>
                                                    No content added
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Box>

                                <Divider />

                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 'bold' }}>
                                            Notes:
                                        </Typography>
                                        <IconButton size="small" onClick={() => updateSection(section.id, 'isEditingContent2', !section.isEditingContent2)}>
                                            {section.isEditingContent2 ? <Check color="primary" fontSize="small" /> : <Edit fontSize="small" />}
                                        </IconButton>
                                    </Box>

                                    {section.isEditingContent2 ? (
                                        <Stack spacing={2}>
                                            {section.content2.map((item, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {/* <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={2}
                                                        size="small"
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newContent2 = [...section.content2];
                                                            newContent2[idx] = e.target.value;
                                                            updateSection(section.id, 'content2', newContent2);
                                                        }}
                                                        
                                                    /> */}
                                                    <RichTextEditorComponent
                                                        value={item}
                                                        onChange={(val) => {
                                                            const newContent2 = [...section.content2];
                                                            newContent2[idx] = val;
                                                            updateSection(section.id, 'content2', newContent2);
                                                        }}
                                                    />
                                                    <IconButton color="error" onClick={() => {
                                                        const newContent2 = section.content2.filter((_, i) => i !== idx);
                                                        updateSection(section.id, 'content2', newContent2);
                                                    }}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                            <Button
                                                startIcon={<Add />}
                                                size="small"
                                                onClick={() => {
                                                    updateSection(section.id, 'content2', [...section.content2, ""]);
                                                }}
                                            >
                                                Add Line
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <Stack spacing={1}>
                                            {section.content2.length > 0 ? (
                                                section.content2.map((item, idx) => (
                                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                                                        <Box sx={{ color: 'text.primary', pl: 1 }}>
                                                            <ReactMarkdown>{item}</ReactMarkdown>
                                                        </Box>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic', pl: 1 }}>
                                                    No list items added
                                                </Typography>
                                            )}
                                        </Stack>
                                    )}
                                </Box>
                                <Button color="error" size="small" onClick={() => removeSection(section.id)} sx={{ alignSelf: 'flex-end' }}>Remove Section</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Button variant="outlined" onClick={openDialog} sx={{ py: 1 }}>
                    + Add Workout Section
                </Button>

                <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }} onClick={handleSaveWorkout}>
                    Save Workout
                </Button>
            </Stack>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Select Section Type</DialogTitle>
                <DialogContent dividers>
                    <List>
                        {PREDEFINED_SECTIONS.map((name) => (
                            <ListItem disablePadding key={name}>
                                <ListItemButton onClick={() => addSection(name)}>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default AddWorkoutPage;
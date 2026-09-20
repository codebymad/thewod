import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/en';
import 'dayjs/locale/en-gb';
import WorkoutSection from "../components/WorkoutSection";
dayjs.locale('en-gb');


const WEEK_START_DAY = 'mon' as const;
const CALENDAR_LOCALE = WEEK_START_DAY === 'mon' ? 'en-gb' : 'en';

function AddWodPage() {
    const [addNewProgramDialogOpen, setAddNewProgramDialogOpen] = useState(false);
    const [editDayWorkoutDialogOpen, setEditDayWorkoutDialogOpen] = useState(false);
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [currentDayOfWeek, setCurrentDayOfWeek] = useState(() => {
        const today = dayjs();
        const start = today.startOf('week');
        return today.diff(start, 'day') + 1; // 1-indexed
    });
    const [weekDates, setWeekDates] = useState<Dayjs[]>([]);

    const getWeekFromDate = (date: Dayjs) => {
        const start = date.startOf("week");
        return Array.from({ length: 7 }).map((_, i) => start.add(i, "day"));
    };

    useEffect(() => {
        if (!selectedDate) return;
        setWeekDates(getWeekFromDate(selectedDate));
    }, [selectedDate]);

    const isToday = (date: Dayjs) => date.isSame(dayjs(), 'day');

    return (
        <>
            <Box sx={{ mx: 'auto' }}>

                <Stack spacing={3}>

                    {/* ── ORIGINAL HEADER (unchanged) ── */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '2',
                            alignItems: { xs: 'stretch', lg: 'center' },
                            flexDirection: { xs: 'column', lg: 'row' }
                        }}
                    >
                        <Box>
                            <Typography variant="h4" component="h1"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '1.5rem', md: '3rem' },
                                }}
                            >
                                Create Workout
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create/Edit Workouts and Program
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: 'column', lg: 'row' },
                                gap: 1.5,
                                ml: { lg: 'auto' },
                                width: { xs: '100%', lg: 'auto' },
                                justifyContent: 'flex-end',
                                alignItems: { xs: 'stretch', lg: 'center' },
                                mt: { xs: 1.5, md: 2 }
                            }}
                        >
                            <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 320 } }}>
                                <InputLabel id="demo-simple-select-label">Program</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={10}
                                    label="Program"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="outlined" size="small"
                                onClick={() => setAddNewProgramDialogOpen(true)}
                                startIcon={<AddIcon />}>Create Program</Button>
                        </Box>
                    </Box>

                    {/* ── UPDATED WEEK CARD ── */}
                    <Card
                        sx={{
                            borderRadius: '5px !important',
                            bgcolor: 'background.paper',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        }}
                    >
                        <CardContent sx={{ p: { xs: 1, md: 2 } }} >
                            <Stack spacing={3}>

                                {/* Calendar toggle row */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="overline" color="text.disabled" sx={{ letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                                            Week of
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                            {weekDates[0]?.format('MMM D')} – {weekDates[6]?.format('MMM D, YYYY')}
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        endIcon={isCalendarExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        onClick={() => setIsCalendarExpanded((c) => !c)}
                                        sx={{ borderRadius: 2, px: 1 }}
                                    >
                                        {isCalendarExpanded ? 'Hide Calendar' : 'Show Calendar'}
                                    </Button>
                                </Box>

                                {/* Inline calendar */}
                                {isCalendarExpanded && (
                                    <Box
                                        sx={{
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            overflow: 'hidden',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={CALENDAR_LOCALE}>
                                            <DateCalendar
                                                value={selectedDate}
                                                displayWeekNumber
                                                onChange={(newValue) => {
                                                    if (!newValue) return;
                                                    setSelectedDate(newValue);
                                                    setWeekDates(getWeekFromDate(newValue));
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                )}

                                {/* ── DAY SELECTOR STRIP ── */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: 1,
                                    }}
                                >
                                    {weekDates.map((date, i) => {
                                        const selected = currentDayOfWeek === i + 1;
                                        const today = isToday(date);
                                        return (
                                            <Button
                                                key={i}
                                                variant={selected ? 'contained' : 'outlined'}
                                                disableElevation
                                                onClick={() => setCurrentDayOfWeek(i + 1)}
                                                sx={{
                                                    minWidth: 0,
                                                    px: 0.5,
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    flexDirection: 'column',
                                                    gap: 0.25,
                                                    borderColor: selected ? undefined : today ? 'primary.light' : 'divider',
                                                    transition: 'all 0.18s ease',
                                                }}
                                            >
                                                <Typography variant="caption" sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.65rem',
                                                    color: selected ? 'primary.contrastText' : 'text.secondary',
                                                    lineHeight: 1,
                                                }}>
                                                    {date.format('ddd').toUpperCase()}
                                                </Typography>
                                                <Typography variant="body1" sx={{
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    color: selected ? 'primary.contrastText' : 'text.primary',
                                                    lineHeight: 1.1,
                                                }}>
                                                    {date.format('D')}
                                                </Typography>
                                                <Typography variant="caption" sx={{
                                                    fontSize: '0.6rem',
                                                    color: selected ? 'primary.contrastText' : 'text.disabled',
                                                    lineHeight: 1,
                                                }}>
                                                    {date.format('MMM')}
                                                </Typography>
                                                {/* {today && !selected && (
                                                    <Box sx={{
                                                        width: 4, height: 4,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        mt: 0.25,
                                                    }} />
                                                )} */}

                                                {today && (
                                                    <Chip
                                                        label="Today"
                                                        size="small"
                                                        color="primary"
                                                        variant={selected ? 'filled' : 'outlined'}
                                                        sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }}
                                                    />
                                                )}
                                            </Button>
                                        );
                                    })}
                                </Box>

                                <Divider />

                                {/* ── DAY CONTENT CARDS ── */}
                                <Box
                                    sx={{
                                        display: { xs: 'block', md: 'grid' },
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: 1.5,
                                        alignItems: 'stretch',
                                    }}
                                >
                                    {weekDates.map((date, i) => {
                                        const selected = currentDayOfWeek === i + 1;
                                        const today = isToday(date);
                                        return (
                                            <Card
                                                key={i}
                                                variant="outlined"
                                                onClick={() => setCurrentDayOfWeek(i + 1)}
                                                sx={{
                                                    minHeight: { xs: 420, md: 480 },
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    display: {
                                                        xs: selected ? 'flex' : 'none',
                                                        md: 'flex',
                                                    },
                                                    flexDirection: 'column',
                                                    borderColor: selected ? 'primary.main' : 'divider',
                                                    borderWidth: selected ? 2 : 1,
                                                    bgcolor: selected ? 'primary.50' : 'background.paper',
                                                    transition: 'all 0.18s ease',
                                                    '&:hover': {
                                                        borderColor: 'primary.light',
                                                        bgcolor: 'action.hover',
                                                    },
                                                }}
                                            >
                                                <CardContent sx={{
                                                    p: 1.5,
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                    '&:last-child': { pb: 1.5 },
                                                }}>
                                                    {/* Day card header */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box>
                                                            <Typography variant="caption" sx={{
                                                                fontWeight: 700,
                                                                fontSize: '0.65rem',
                                                                color: selected ? 'primary.main' : 'text.disabled',
                                                                display: 'block',
                                                                lineHeight: 1,
                                                                mb: 0.25,
                                                            }}>
                                                                {date.format('ddd').toUpperCase()}



                                                            </Typography>
                                                            <Typography variant="body2" sx={{ fontWeight: 600, color: selected ? 'primary.dark' : 'text.primary' }}>
                                                                {date.format('MMM D')}
                                                            </Typography>

                                                        </Box>


                                                        {/* Add exercise — only on selected */}
                                                        {selected && (
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                startIcon={<EditIcon />}
                                                                disableElevation
                                                                sx={{ borderRadius: 1.5, fontSize: '0.75rem', p: 0 }}
                                                                onClick={() => setEditDayWorkoutDialogOpen(true)}
                                                            >
                                                                Edit
                                                            </Button>
                                                        )}
                                                    </Box>




                                                    {/* <Divider sx={{ opacity: 0.5 }} /> */}

                                                    {/* Empty state */}
                                                    {/* <Box sx={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                        opacity: 0.4,
                                                        py: 3,
                                                    }}>
                                                        <FitnessCenterIcon sx={{ fontSize: 22, color: 'text.disabled' }} />
                                                        <Typography variant="caption" color="text.disabled" align="center" sx={{ fontSize: '0.7rem' }}>
                                                            No exercises
                                                        </Typography>
                                                    </Box> */}

                                                    <WorkoutSection />



                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </Box>

                            </Stack>
                        </CardContent>
                        <CardActions />
                    </Card>

                </Stack>

                {/* ── DIALOG (unchanged) ── */}
                <Dialog
                    open={addNewProgramDialogOpen}
                    onClose={() => setAddNewProgramDialogOpen(false)}
                    maxWidth={false}
                    fullWidth

                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    role="alertdialog"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Create Program"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddNewProgramDialogOpen(false)}>Cancel</Button>
                        <Button autoFocus variant="contained">Save Program</Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={editDayWorkoutDialogOpen}
                    onClose={() => setEditDayWorkoutDialogOpen(false)}
                    maxWidth={false}
                    fullWidth

                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    role="alertdialog"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add & Edit Workout"}
                    </DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText> */}
                        <WorkoutSection />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDayWorkoutDialogOpen(false)}>Cancel</Button>
                        <Button autoFocus variant="contained">Save Workout</Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    );
}

export default AddWodPage;
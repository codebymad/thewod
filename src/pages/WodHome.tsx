import React, { useEffect } from "react";
import WorkoutSectionCards from "./WorkoutSectionCard";
import { Box, Button, ButtonGroup, Chip, IconButton, Stack } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';



export default function WodHome() {

    const [showFilter, setShowFilter] = React.useState(false);
    const [filters, setFilters] = React.useState<{ key: string; label: string }[]>([]);

    useEffect(() => {
        setFilters([
            { key: "date", label: "Sep 3, 2026" },
            { key: "program", label: "HWPO" }
        ]);
    }, []);


    function fetchRandom() {
        console.log("Random")
    }

    function applyFilter() {
        console.log("filter")
        setShowFilter(prev => !prev);
    }

    function revertToTodays() {
        console.log("Revert")
    }


    const mockWorkout = [
        {
            workoutheader: "Warmup",
            workoutdetails: "3 rounds: 10 air squats, 10 push-ups, 10 sit-ups"
        },
        {
            workoutheader: "Metcon",
            workoutdetails: "AMRAP 20: 10 burpees, 20 sit-ups, 200m run"
        },
        {
            workoutheader: "Accessory",
            workoutdetails: "3x12 dumbbell rows"
        }
    ];

    return (
        <>

            <Stack spacing={2}>

                <Box></Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: { xs: "center", md: "center" },
                    textAlign: { xs: "center", md: "left" },
                }}>

                    <h3 style={{ margin: 0 }}>Today's Workout</h3>

                    <ButtonGroup variant="outlined">
                        <Box onClick={applyFilter}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <FilterListIcon /> </IconButton>
                            <Button startIcon={<FilterIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Filter</Button>
                        </Box>

                        <Box onClick={fetchRandom}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <ShuffleIcon /> </IconButton>
                            <Button startIcon={<ShuffleIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Random</Button>
                        </Box>

                        <Box onClick={revertToTodays}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <RestartAltIcon /> </IconButton>
                            <Button startIcon={<RestartAltIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Reset</Button>
                        </Box>
                    </ButtonGroup>
                </Box>

                {showFilter && (
                    <Box sx={{ p: 2, backgroundColor: "grey.200" }}>
                        Hello, I am visible!
                    </Box>
                )}

                {filters.length > 0 && (
                    <Stack direction="row" spacing={1}>
                        {filters.map(f => (
                            <Chip
                                key={f.label}
                                label={f.label}
                            //  onDelete={() => handleDelete(f.label)}
                            />
                        ))}
                    </Stack>
                )}



                <WorkoutSectionCards workoutdata={mockWorkout} />

            </Stack>
        </>
    );
}

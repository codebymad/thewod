import React, { useEffect } from "react";
import WorkoutSectionCards from "./WorkoutSectionCard";
import { Box, Button, ButtonGroup, Chip, IconButton, Stack } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import getWorkout from './WorkoutGetter'


export default function WodHome() {

    const [showFilter] = React.useState(false);
    const [filters, setFilters] = React.useState<{ key: string; label: string }[]>([]);
    const [workoutData, setWorkoutData] = React.useState<any[]>([]);

    useEffect(() => {
        setFilters([
            // { key: "date", label: "Sep 3, 2026" },
            // { key: "program", label: "HWPO" }
        ]);
        // Load a workout on page load
        fetchRandom();
    }, []);

    function cleanWodRaw(text: string): string {
        if (!text) return "";

        return text
            // remove URLs
            .replace(/https?:\/\/\S+/g, "")
            // remove markdown links [text](url)
            .replace(/\[([^\]] +) \]\(([^)] +) \)/g, "$1")
        // remove "Post score/load/time to comments"
        .replace(/Post.*comments\./gi, "")
            // remove "Compare to ..."
            .replace(/Compare to.*$/gmi, "")
            // remove "Find a gym near you"
            .replace(/Find a gym.*$/gmi, "")
            // remove "Resources:" block
            .replace(/Resources:[\s\S]*/gmi, "")
            // trim extra whitespace
            .trim();
    }


    // -----------------------------
    // RANDOM YEAR + MONTH GENERATOR
    // -----------------------------
    function getRandomYearMonth() {
        const startYear = 2002;
        const endYear = 2026;

        const months = [
            "jan", "feb", "mar", "apr", "may", "jun",
            "jul", "aug", "sep", "oct", "nov", "dec"
        ];

        const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

        let mon;
        if (year === 2026) {
            mon = months[Math.floor(Math.random() * 9)]; // jan–sep only
        } else {
            mon = months[Math.floor(Math.random() * 12)];
        }

        return { year, mon };
    }

    async function fetchRandom() {
        const { year, mon } = getRandomYearMonth();
        console.log("Random WOD:", year, mon);

        const data = await getWorkout(String(year), mon);

        if (data && Array.isArray(data) && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomWod = data[randomIndex];

            // Convert JSON object → UI format
            const formatted = {
                workoutheader: randomWod.title,
                workoutdetails: cleanWodRaw(randomWod.wodRaw)
            };

            // Your component expects an array
            setWorkoutData([formatted]);
        }
    }

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
                        {/* <Box onClick={applyFilter}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <FilterListIcon /> </IconButton>
                            <Button startIcon={<FilterIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Filter</Button>
                        </Box> */}

                        <Box onClick={fetchRandom}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <ShuffleIcon /> </IconButton>
                            <Button startIcon={<ShuffleIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Random</Button>
                        </Box>

                        {/* <Box onClick={revertToTodays}>
                            <IconButton size="large" color="primary" sx={{ display: { xs: "flex", md: "none" } }}> <RestartAltIcon /> </IconButton>
                            <Button startIcon={<RestartAltIcon />} sx={{ display: { xs: "none", md: "flex" } }}>Reset</Button>
                        </Box> */}
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



                <WorkoutSectionCards workoutdata={workoutData} />

            </Stack>
        </>
    );
}

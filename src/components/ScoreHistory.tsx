import { Box, Card, CardContent, Paper, Typography } from "@mui/material"
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

function ScoreHistory() {
    return (
        <Box>
            <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
                <Typography variant="h2" color="secondary"> Score History </Typography>
                <Card variant="outlined">
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Sept 11, 2026
                            </Typography>
                            <Typography variant="body2">
                                <OfflineBoltIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> RPE : 6
                            </Typography>
                        </Box>

                        <Typography variant="body2">
                            <InsertCommentIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Uff! Went on to do RX and was Spicy!
                        </Typography>
                    </CardContent>
                </Card>

                <Card variant="outlined">
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Sept 11, 2025
                            </Typography>
                            <Typography variant="body2">
                                <OfflineBoltIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> RPE : 10
                            </Typography>
                        </Box>

                        <Typography variant="body2">
                            <InsertCommentIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Nada!
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>

        </Box>
    )
}

export default ScoreHistory
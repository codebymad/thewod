import {
    Alert, Box, Button, Card, Chip, CircularProgress, Collapse, Dialog,
    DialogActions, DialogContent, DialogTitle, Divider, FormControl,
    IconButton, InputAdornment, InputLabel, MenuItem, Select, Skeleton, Stack,
    TextField, Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import 'dayjs/locale/en-gb';
import { getDailyWodDB_ALL, setUpdatedWOD } from "../libs/SupabaseEdge";
import ReactMarkdown from 'react-markdown';

// ─── Locale ───────────────────────────────────────────────────────────────────

const WEEK_START_DAY = 'mon' as const;
const CALENDAR_LOCALE = WEEK_START_DAY === 'mon' ? 'en-gb' : 'en';

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionType = "strength" | "metcon" | "gymnastics" | "cardio" | "rest" | "conditioning" | "accessory" | "skill";

interface WorkoutSection {
    id: string;
    type: SectionType;
    content: string;
    notes?: string;
}

interface DayWorkout {
    id: string;
    name: string;
    sections: WorkoutSection[];
}

// ─── API shape ────────────────────────────────────────────────────────────────

interface ApiSection {
    section_name: string;
    section_content: string;
    section_notes: string[];
}

interface ApiWodItem {
    workout_date: string; // "YYYY-MM-DD"
    workout: {
        wod_id: string;
        wod_name: string;
        content: ApiSection[];
        tags: string[];
    };
}

// ─── Map API response → Record<dateKey, DayWorkout> ──────────────────────────

function parseWodData(items: ApiWodItem[]): Record<string, DayWorkout> {
    const result: Record<string, DayWorkout> = {};
    for (const item of items) {
        const dateKey = item.workout_date; // already "YYYY-MM-DD"
        const w = item.workout;
        result[dateKey] = {
            id: w?.wod_id ?? uuid(),
            name: w?.wod_name?.trim() || dateKey,
            sections:
                (w?.content?.length ?? 0) === 0
                    ? [
                        {
                            id: uuid(),
                            type: "rest" as SectionType,
                            content: "### Hydrate, Stretch, Walk and Enjoy your Day!",
                            notes: "",
                        },
                    ]
                    : w.content.map((sec) => ({
                        id: uuid(),
                        type: sec.section_name as SectionType,
                        content: sec.section_content,
                        notes: sec.section_notes?.join("\n") ?? "",
                    })),
        };
    }
    return result;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_TYPES: { value: SectionType; label: string }[] = [
    { value: "strength", label: "Strength" },
    { value: "metcon", label: "Metcon" },
    { value: "gymnastics", label: "Gymnastics" },
    { value: "skill", label: "Skill" },
    { value: "cardio", label: "Cardio" },
    { value: "conditioning", label: "Conditioning" },
    { value: "accessory", label: "Accessory" },
    { value: "rest", label: "Rest" },
];

const SECTION_COLORS: Record<string, { bg: string; color: string }> = {
    strength: { bg: "#EAF3DE", color: "#3B6D11" },
    metcon: { bg: "#FAECE7", color: "#993C1D" },
    gymnastics: { bg: "#EEEDFE", color: "#534AB7" },
    skill: { bg: "#FEF3C7", color: "#92400E" },
    cardio: { bg: "#E6F1FB", color: "#185FA5" },
    conditioning: { bg: "#E6F1FB", color: "#185FA5" },
    accessory: { bg: "#FDF3E3", color: "#7A4F1D" },
    rest: { bg: "#F1EFE8", color: "#5F5E5A" },
};

const DEFAULT_COLORS = { bg: "#F3F3F3", color: "#555" };

const EMPTY_SECTION = (): WorkoutSection => ({
    id: uuid(),
    type: "strength",
    content: "",
    notes: "",
});

// ─── WorkoutDisplayer ─────────────────────────────────────────────────────────

function WorkoutDisplayer({ content }: { content: string }) {
    if (!content.trim()) {
        return (
            <Typography variant="caption" color="text.disabled"
                sx={{ fontStyle: "italic", display: "block" }}>
                No content yet
            </Typography>
        );
    }
    return (
        <Typography variant="caption" color="text.secondary"
            sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", display: "block" }}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </Typography>
    );
}

// ─── Type chip ────────────────────────────────────────────────────────────────

function TypeChip({ type }: { type: string }) {
    const { bg, color } = SECTION_COLORS[type] ?? DEFAULT_COLORS;
    const label = SECTION_TYPES.find((s) => s.value === type)?.label ?? type;
    return (
        <Chip label={label} size="small"
            sx={{ bgcolor: bg, color, fontWeight: 700, fontSize: "0.65rem", height: 20, borderRadius: "20px" }} />
    );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ sec }: { sec: WorkoutSection }) {
    return (
        <Box>
            <Box sx={{ mb: 0.75 }}>
                <TypeChip type={sec.type} />
            </Box>
            <WorkoutDisplayer content={sec.content} />
            {sec.notes?.trim() && (
                <Box sx={{
                    mt: 1, px: 1, py: 0.75,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    borderLeft: "3px solid",
                    borderColor: "warning.main",
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.25 }}>
                        <StickyNote2OutlinedIcon sx={{ fontSize: 12, color: "warning.dark" }} />
                        <Typography variant="caption" sx={{
                            fontSize: "0.62rem", fontWeight: 700,
                            color: "warning.dark", textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>
                            Notes
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary"
                        sx={{ display: "block", whiteSpace: "pre-wrap" }}>
                        {sec.notes}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

// ─── Day column skeleton ──────────────────────────────────────────────────────

function DayColumnSkeleton() {
    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            borderRight: "1px solid", borderColor: "divider",
            "&:last-child": { borderRight: "none" },
        }}>
            <Box sx={{ px: 1.25, py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
                <Skeleton width={24} height={12} />
                <Skeleton width={28} height={24} />
            </Box>
            <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
                <Skeleton variant="rounded" height={20} width="60%" />
                <Skeleton variant="rounded" height={60} />
                <Skeleton variant="rounded" height={40} />
            </Box>
        </Box>
    );
}


// ─── Helper: map DayWorkout → API body ───────────────────────────────────────

function toApiBody(workout: DayWorkout) {
    return {
        wod_id: workout.id,
        wod_name: workout.name,
        content: workout.sections.map((sec) => ({
            section_name: sec.type,
            section_content: sec.content,
            section_notes: sec.notes ? sec.notes.split("\n").filter(Boolean) : [],
        })),
        tags: [] as string[],
    };
}

// ─── Secret key confirmation dialog ──────────────────────────────────────────

type SaveStatus = "idle" | "loading" | "success" | "error";

interface SecretKeyDialogProps {
    open: boolean;
    workout: DayWorkout | null;
    onClose: () => void;
    onSuccess: (workout: DayWorkout) => void;
}

function SecretKeyDialog({ open, workout, onClose, onSuccess }: SecretKeyDialogProps) {
    const [secretKey, setSecretKey] = useState("");
    const [showKey, setShowKey] = useState(false);
    const [status, setStatus] = useState<SaveStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (open) {
            setSecretKey("");
            setShowKey(false);
            setStatus("idle");
            setErrorMsg("");
        }
    }, [open]);

    const handleConfirm = async () => {
        if (!secretKey.trim() || !workout) return;
        setStatus("loading");
        setErrorMsg("");
        try {
            const body = toApiBody(workout);
            const result = await setUpdatedWOD(workout.id, secretKey.trim(), body);
            // treat 200 / truthy as success
            // if (result && (result.status === 200 || result.success || result.data)) {
            //     setStatus("success");
            //     setTimeout(() => {
            //         onSuccess(workout);
            //         onClose();
            //     }, 1200);
            // } else {
            //     setStatus("error");
            //     setErrorMsg("Failed to update workout. Check your secret key and try again.");
            // }
            if (result && (result.status === "UPDATED" || result.status === "NO_CHANGE")) {
                setStatus("success");
                setTimeout(() => {
                    onSuccess(workout);
                    onClose();
                }, 1200);
                
            } else {
                setStatus("error");
                setErrorMsg("Failed to update workout. Check your secret key and try again.");
            }
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err?.message ?? "Failed to update workout. Please try again.");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && secretKey.trim() && status !== "loading") handleConfirm();
    };

    return (
        <Dialog open={open} onClose={status === "loading" ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LockOutlinedIcon fontSize="small" color="action" />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                        Confirm save
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                    Enter your secret key to save changes to <strong>{workout?.name || "this workout"}</strong>.
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: "8px !important" }}>
                <Stack spacing={2}>
                    {status === "success" && (
                        <Alert severity="success" icon={<CheckCircleOutlineIcon fontSize="inherit" />}>
                            Workout updated successfully!
                        </Alert>
                    )}
                    {status === "error" && (
                        <Alert severity="error">{errorMsg}</Alert>
                    )}
                    <TextField
                        autoFocus
                        label="Secret key"
                        type={showKey ? "text" : "password"}
                        size="small"
                        fullWidth
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={status === "loading" || status === "success"}
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setShowKey((v) => !v)}
                                            edge="end"
                                        >
                                            {showKey
                                                ? <VisibilityOffIcon sx={{ fontSize: 16 }} />
                                                : <VisibilityIcon sx={{ fontSize: 16 }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
                <Button onClick={onClose} disabled={status === "loading" || status === "success"} size="small">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={handleConfirm}
                    disabled={!secretKey.trim() || status === "loading" || status === "success"}
                    startIcon={status === "loading" ? <CircularProgress size={14} color="inherit" /> : undefined}
                >
                    {status === "loading" ? "Saving…" : "Confirm & Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ─── Edit / Add dialog ────────────────────────────────────────────────────────

interface EditWorkoutDialogProps {
    open: boolean;
    date: Dayjs;
    initial: DayWorkout | null;
    onClose: () => void;
    onSave: (workout: DayWorkout) => void;
    onDelete: () => void;
}

function EditWorkoutDialog({ open, date, initial, onClose, onSave, onDelete }: EditWorkoutDialogProps) {
    const [name, setName] = useState("");
    const [sections, setSections] = useState<WorkoutSection[]>([EMPTY_SECTION()]);
    const [pendingWorkout, setPendingWorkout] = useState<DayWorkout | null>(null);
    const [secretDialogOpen, setSecretDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setName(initial?.name ?? "");
            setSections(initial?.sections?.length ? initial.sections : [EMPTY_SECTION()]);
            setPendingWorkout(null);
            setSecretDialogOpen(false);
        }
    }, [open, initial]);

    const addSection = () => setSections((s) => [...s, EMPTY_SECTION()]);
    const removeSection = (id: string) => setSections((s) => s.filter((sec) => sec.id !== id));
    const updateSection = (id: string, patch: Partial<WorkoutSection>) =>
        setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, ...patch } : sec)));

    // Step 1: clicking "Save workout" builds the object and opens the secret key dialog
    const handleSaveClick = () => {
        const workout: DayWorkout = {
            id: initial?.id ?? uuid(),
            name: name.trim() || date.format("ddd, MMM D"),
            sections,
        };
        setPendingWorkout(workout);
        setSecretDialogOpen(true);
    };

    // Step 2: secret key confirmed + API returned 200 → commit to parent state
    const handleSecretConfirmed = (workout: DayWorkout) => {
        setSecretDialogOpen(false);
        onSave(workout);
    };

    const isEdit = !!initial;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                            {isEdit ? "Edit workout" : "Add workout"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {date.format("dddd, MMM D")}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: "8px !important" }}>
                <Stack spacing={2.5}>
                    <TextField
                        label="Workout name"
                        placeholder={`e.g. Week 1 Day ${date.day()}`}
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Divider />

                    <Stack spacing={2}>
                        {sections.map((sec, idx) => (
                            <Box key={sec.id} sx={{
                                border: "1px solid", borderColor: "divider",
                                borderRadius: 2, overflow: "hidden",
                            }}>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 1,
                                    px: 1.5, py: 1,
                                    borderBottom: "1px solid", borderColor: "divider",
                                    bgcolor: "background.default",
                                }}>
                                    <Typography variant="caption" color="text.disabled"
                                        sx={{ fontWeight: 600, minWidth: 20 }}>
                                        {idx + 1}
                                    </Typography>
                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel>Type</InputLabel>
                                        <Select label="Type" value={sec.type}
                                            onChange={(e) => updateSection(sec.id, { type: e.target.value as SectionType })}>
                                            {SECTION_TYPES.map((t) => (
                                                <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {sections.length > 1 && (
                                        <Tooltip title="Remove section">
                                            <IconButton size="small" sx={{ ml: "auto" }}
                                                onClick={() => removeSection(sec.id)}>
                                                <CloseIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>

                                <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                                    <TextField
                                        label="Workout content"
                                        placeholder="Write workout content here… (markdown supported)"
                                        multiline
                                        minRows={4}
                                        fullWidth
                                        size="small"
                                        value={sec.content}
                                        onChange={(e) => updateSection(sec.id, { content: e.target.value })}
                                        helperText="Replace this textarea with your markdown editor"
                                        sx={{ "& .MuiOutlinedInput-root": { fontFamily: "monospace", fontSize: "0.82rem" } }}
                                    />
                                    <TextField
                                        label="Notes (optional)"
                                        placeholder="Coach notes, scaling options, tips…"
                                        multiline
                                        minRows={2}
                                        fullWidth
                                        size="small"
                                        value={sec.notes ?? ""}
                                        onChange={(e) => updateSection(sec.id, { notes: e.target.value })}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                    <Button variant="outlined" size="small" startIcon={<AddIcon />}
                        onClick={addSection}
                        sx={{ alignSelf: "flex-start", borderStyle: "dashed" }}>
                        Add section
                    </Button>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, justifyContent: "space-between" }}>
                {isEdit ? (
                    <Button color="error" size="small" onClick={onDelete}>Delete workout</Button>
                ) : <Box />}
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveClick} disableElevation>Save workout</Button>
                </Box>
            </DialogActions>

            {/* ── Secret key confirmation (nested, so it overlays the edit dialog) ── */}
            <SecretKeyDialog
                open={secretDialogOpen}
                workout={pendingWorkout}
                onClose={() => setSecretDialogOpen(false)}
                onSuccess={handleSecretConfirmed}
            />
        </Dialog>
    );
}

// ─── Desktop day column ───────────────────────────────────────────────────────

interface DayColumnProps {
    date: Dayjs;
    workout: DayWorkout | null;
    isToday: boolean;
    onAdd: () => void;
    onEdit: () => void;
}

function DayColumn({ date, workout, isToday, onAdd, onEdit }: DayColumnProps) {
    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            borderRight: "1px solid", borderColor: "divider",
            "&:last-child": { borderRight: "none" },
        }}>
            {/* Day header */}
            <Box sx={{
                px: 1.25, py: 1.25,
                borderBottom: "1px solid", borderColor: "divider",
                bgcolor: isToday ? "primary.50" : "background.paper",
                display: "flex", flexDirection: "column", gap: 0.25,
            }}>
                <Typography variant="caption" sx={{
                    fontSize: "0.62rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    color: isToday ? "primary.main" : "text.disabled", lineHeight: 1,
                }}>
                    {date.format("ddd")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    <Typography variant="body1" sx={{
                        fontSize: "1.2rem", fontWeight: 700, lineHeight: 1,
                        color: isToday ? "primary.dark" : "text.primary",
                    }}>
                        {date.format("D")}
                    </Typography>
                    {isToday && (
                        <Chip label="Today" size="small" color="primary"
                            sx={{ height: 18, fontSize: "0.6rem", fontWeight: 700 }} />
                    )}
                </Box>
            </Box>

            {/* Day body */}
            <Box sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                {workout ? (
                    <Card variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
                        {/* Workout name row */}
                        <Box sx={{
                            px: 1.5, py: 1,
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            borderBottom: "1px solid", borderColor: "divider",
                            bgcolor: "background.default",
                        }}>
                            <Typography variant="caption"
                                sx={{ fontWeight: 700, fontSize: "0.72rem", color: "text.secondary" }}>
                                {workout.name}
                            </Typography>
                            <Tooltip title="Edit workout">
                                <IconButton size="small" onClick={onEdit} sx={{ mr: -0.5 }}>
                                    <EditOutlinedIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        {/* Sections */}
                        {workout.sections.map((sec, idx) => (
                            <Box key={sec.id} sx={{
                                px: 1.5, py: 1.25,
                                borderTop: idx === 0 ? "none" : "1px solid",
                                borderColor: "divider",
                            }}>
                                <SectionCard sec={sec} />
                            </Box>
                        ))}
                    </Card>
                ) : (
                    <Box onClick={onAdd} sx={{
                        flex: 1, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 0.75, py: 3, cursor: "pointer", borderRadius: 2,
                        border: "1px dashed", borderColor: "divider",
                        opacity: 0.4, transition: "opacity 0.15s",
                        "&:hover": { opacity: 0.8 },
                    }}>
                        <FitnessCenterIcon sx={{ fontSize: 20, color: "text.disabled" }} />
                        <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.65rem" }}>
                            Add workout
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

// ─── Mobile view ──────────────────────────────────────────────────────────────

interface MobileViewProps {
    weekDates: Dayjs[];
    workouts: Record<string, DayWorkout>;
    weekKey: (d: Dayjs) => string;
    onOpen: (date: Dayjs) => void;
}

function MobileView({ weekDates, workouts, weekKey, onOpen }: MobileViewProps) {
    const todayIdx = weekDates.findIndex((d) => d.isSame(dayjs(), "day"));
    const [selectedIdx, setSelectedIdx] = useState(todayIdx >= 0 ? todayIdx : 0);

    useEffect(() => {
        const idx = weekDates.findIndex((d) => d.isSame(dayjs(), "day"));
        setSelectedIdx(idx >= 0 ? idx : 0);
    }, [weekDates]);

    const selectedDate = weekDates[selectedIdx];
    const workout = workouts[weekKey(selectedDate)] ?? null;
    const isToday = selectedDate.isSame(dayjs(), "day");

    return (
        <Stack spacing={2}>
            {/* Day strip */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0.75 }}>
                {weekDates.map((date, i) => {
                    const sel = selectedIdx === i;
                    const tod = date.isSame(dayjs(), "day");
                    return (
                        <Button key={i} variant={sel ? "contained" : "outlined"} disableElevation
                            onClick={() => setSelectedIdx(i)}
                            sx={{
                                minWidth: 0, px: 0.5, py: 1.25,
                                borderRadius: 2, flexDirection: "column", gap: 0.25,
                                borderColor: sel ? undefined : tod ? "primary.light" : "divider",
                                transition: "all 0.18s ease",
                            }}>
                            <Typography variant="caption" sx={{
                                fontWeight: 600, fontSize: "0.6rem", lineHeight: 1,
                                color: sel ? "primary.contrastText" : "text.secondary",
                            }}>
                                {date.format("ddd").toUpperCase()}
                            </Typography>
                            <Typography variant="body1" sx={{
                                fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.1,
                                color: sel ? "primary.contrastText" : "text.primary",
                            }}>
                                {date.format("D")}
                            </Typography>
                            <Typography variant="caption" sx={{
                                fontSize: "0.58rem", lineHeight: 1,
                                color: sel ? "primary.contrastText" : "text.disabled",
                            }}>
                                {date.format("MMM")}
                            </Typography>
                            {tod && !sel && (
                                <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "primary.main", mt: 0.25 }} />
                            )}
                        </Button>
                    );
                })}
            </Box>

            <Divider />

            {/* Selected day panel */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, flexWrap: "wrap" }}>
                    {isToday && (
                        <Chip label="Today" size="small" color="primary"
                            sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700 }} />
                    )}
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
                        {selectedDate.format("dddd, MMM D")}
                    </Typography>
                    <Button size="small" variant="outlined"
                        startIcon={workout ? <EditOutlinedIcon /> : <AddIcon />}
                        onClick={() => onOpen(selectedDate)}
                        sx={{ fontSize: "0.75rem" }}>
                        {workout ? "Edit" : "Add workout"}
                    </Button>
                </Box>

                {workout ? (
                    <Stack spacing={0} sx={{
                        border: "1px solid", borderColor: "divider",
                        borderRadius: 2, overflow: "hidden",
                    }}>
                        <Box sx={{
                            px: 2, py: 1.25,
                            borderBottom: "1px solid", borderColor: "divider",
                            bgcolor: "background.default",
                        }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                                {workout.name}
                            </Typography>
                        </Box>
                        {workout.sections.map((sec, idx) => (
                            <Box key={sec.id} sx={{
                                px: 2, py: 1.5,
                                borderTop: idx === 0 ? "none" : "1px solid",
                                borderColor: "divider",
                            }}>
                                <SectionCard sec={sec} />
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Box onClick={() => onOpen(selectedDate)} sx={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 1, py: 6, cursor: "pointer",
                        border: "1px dashed", borderColor: "divider",
                        borderRadius: 2, opacity: 0.45,
                        "&:hover": { opacity: 0.8 },
                    }}>
                        <FitnessCenterIcon sx={{ fontSize: 28, color: "text.disabled" }} />
                        <Typography variant="caption" color="text.disabled">No workout — tap to add</Typography>
                    </Box>
                )}
            </Box>
        </Stack>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

function AddWodPage() {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeDate, setActiveDate] = useState<Dayjs>(dayjs());
    const [workouts, setWorkouts] = useState<Record<string, DayWorkout>>({});
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // ── Fetch ALL wod data once on mount ─────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const result: ApiWodItem[] | null = await getDailyWodDB_ALL() ?? null;
                if (cancelled) return;
                if (result && result.length > 0) {
                    const parsed = parseWodData(result);
                    setWorkouts(parsed);
                    setAvailableDates(new Set(Object.keys(parsed)));
                }
            } catch (err) {
                console.error("Failed to load WODs", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []); // runs once on mount

    // ── Derived — always reflects the displayed week ──────────────────────────
    const weekStart = selectedDate.startOf("isoWeek");
    const weekDates = useMemo(
        () => Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day")),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [weekStart.format("YYYY-MM-DD")]
    );
    const weekNumberAPI: number = weekStart.isoWeek();
    const currentYearForAPI: number = weekStart.isoWeekYear();
    // ─────────────────────────────────────────────────────────────────────────

    const weekKey = (date: Dayjs) => date.format("YYYY-MM-DD");

    const openDialog = (date: Dayjs) => {
        setActiveDate(date);
        setDialogOpen(true);
    };

    const handleSave = (workout: DayWorkout) => {
        const key = weekKey(activeDate);
        setWorkouts((prev) => ({ ...prev, [key]: workout }));
        // also mark this date as available after saving
        setAvailableDates((prev) => new Set([...prev, key]));
        setDialogOpen(false);
    };

    const handleDelete = () => {
        const key = weekKey(activeDate);
        setWorkouts((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
        // remove from available dates
        setAvailableDates((prev) => {
            const next = new Set(prev);
            next.delete(key);
            return next;
        });
        setDialogOpen(false);
    };

    const goWeek = (dir: -1 | 1) =>
        setSelectedDate(weekStart.add(dir * 7, "day"));

    const weekRange = `${weekDates[0].format("MMM D")} – ${weekDates[6].format("MMM D, YYYY")}`;

    return (
        <Box>
            {/* ── Page header ── */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "stretch", lg: "center" },
                flexDirection: { xs: "column", lg: "row" },
                gap: 2, mb: 3,
            }}>
                <Box>
                    <Typography variant="h4" component="h1"
                        sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
                        Create Workout
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create/Edit Workouts and Program
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex", flexDirection: { xs: "column", lg: "row" },
                    gap: 1.5, ml: { lg: "auto" },
                    width: { xs: "100%", lg: "auto" },
                    alignItems: { xs: "stretch", lg: "center" },
                }}>
                    <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 260 } }}>
                        <InputLabel id="program-select-label">Program</InputLabel>
                        <Select labelId="program-select-label" value={10} label="Program">
                            <MenuItem value={10}>Program A</MenuItem>
                            <MenuItem value={20}>Program B</MenuItem>
                            <MenuItem value={30}>Program C</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" size="small" startIcon={<AddIcon />}
                        sx={{ whiteSpace: "nowrap" }}>
                        Create program
                    </Button>
                </Box>
            </Box>

            {/* ── Week navigation ── */}
            <Box sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", mb: calendarOpen ? 1 : 2,
                flexWrap: "wrap", gap: 1,
            }}>
                <Box>
                    <Typography variant="overline" color="text.disabled"
                        sx={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                        Week {weekNumberAPI} · {currentYearForAPI}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {weekRange}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton size="small" onClick={() => goWeek(-1)} aria-label="Previous week"
                        disabled={loading}>
                        <ChevronLeftIcon fontSize="small" />
                    </IconButton>
                    <Button size="small" variant="outlined"
                        onClick={() => setSelectedDate(dayjs())}
                        disabled={loading}
                        sx={{ fontSize: "0.75rem", py: 0.5 }}>
                        Today
                    </Button>
                    <IconButton size="small" onClick={() => goWeek(1)} aria-label="Next week"
                        disabled={loading}>
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
                    <Button size="small" variant="outlined"
                        onClick={() => setCalendarOpen((c) => !c)}
                        endIcon={calendarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{ fontSize: "0.75rem", py: 0.5 }}>
                        Calendar
                    </Button>
                    {loading && <CircularProgress size={18} thickness={4} />}
                </Box>
            </Box>

            {/* ── Inline calendar ── */}
            <Collapse in={calendarOpen}>
                <Box sx={{
                    mb: 2,
                    border: "1px solid", borderColor: "divider",
                    borderRadius: 2, overflow: "hidden",
                    display: "inline-block",
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={CALENDAR_LOCALE}>
                        <DateCalendar
                            value={selectedDate}
                            displayWeekNumber
                            onChange={(val) => {
                                if (!val) return;
                                setSelectedDate(val);
                                setCalendarOpen(false);
                            }}
                            // ── Only dates with WOD data are selectable ──────
                            shouldDisableDate={(day: Dayjs) =>
                                !availableDates.has(day.format("YYYY-MM-DD"))
                            }
                            // ── Style available dates with a green dot ───────
                            slotProps={{
                                day: (ownerState) => {
                                    const key = ownerState.day.format("YYYY-MM-DD");
                                    const hasWod = availableDates.has(key);
                                    return {
                                        sx: hasWod
                                            ? {
                                                position: "relative",
                                                "&::after": {
                                                    content: '""',
                                                    position: "absolute",
                                                    bottom: 2,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: 4,
                                                    height: 4,
                                                    borderRadius: "50%",
                                                    bgcolor: "primary.main",
                                                },
                                            }
                                            : {},
                                    };
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Collapse>

            {/* ── Desktop: 7-column week grid ── */}
            <Box sx={{
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: "repeat(7, 1fr)",
                border: "1px solid", borderColor: "divider",
                borderRadius: 2, overflow: "hidden",
                alignItems: "stretch",
            }}>
                {loading
                    ? Array.from({ length: 7 }).map((_, i) => <DayColumnSkeleton key={i} />)
                    : weekDates.map((date) => (
                        <DayColumn
                            key={weekKey(date)}
                            date={date}
                            workout={workouts[weekKey(date)] ?? null}
                            isToday={date.isSame(dayjs(), "day")}
                            onAdd={() => openDialog(date)}
                            onEdit={() => openDialog(date)}
                        />
                    ))
                }
            </Box>

            {/* ── Mobile: strip + selected day ── */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <MobileView
                    weekDates={weekDates}
                    workouts={workouts}
                    weekKey={weekKey}
                    onOpen={openDialog}
                />
            </Box>

            {/* ── Dialog ── */}
            <EditWorkoutDialog
                open={dialogOpen}
                date={activeDate}
                initial={workouts[weekKey(activeDate)] ?? null}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </Box>
    );
}

export default AddWodPage;
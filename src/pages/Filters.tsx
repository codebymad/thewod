import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from "dayjs";

interface FiltersProps {
  date: Dayjs;
  setDate: (d: Dayjs) => void;
}

function Filters({ date, setDate, 
    // program, setProgram, source 
}: FiltersProps) {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newValue) => {
            if (newValue) setDate(newValue);
          }}
          format="MMM DD, YYYY"
        />
      </LocalizationProvider>
    </>
  );
}

export default Filters;

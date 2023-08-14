import { format, isValid } from "date-fns";

export function formatDate(
    dateStr: string,
    formatString: string = "MMMM d, yyyy h:mm:ss a"
): string {
    const date = new Date(dateStr);
    if (isValid(date)) {
        return format(date, formatString);
    }
    return "Invalid Date";
}

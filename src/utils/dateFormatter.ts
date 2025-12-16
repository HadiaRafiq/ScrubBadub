/**
 * Formats a date string to "DD/Mon/YY : H:MM am/pm" format
 * Example: "07/Nov/25 : 5:35 pm"
 */
export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;

  return `${String(day).padStart(
    2,
    '0',
  )}/${month}/${year} : ${displayHours}:${String(minutes).padStart(
    2,
    '0',
  )} ${ampm}`;
};

function formatCurrentDate() {
  const now = new Date();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  return `${formattedHours}:${minutes}${period} ${day}, ${date} ${month}`;
}

export default formatCurrentDate;

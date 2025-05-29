function formatCurrentDate(languageCode: 'it' | 'en' = 'en') {
  const now = new Date();

  const days = {
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    it: [
      'Domenica',
      'Lunedì',
      'Martedì',
      'Mercoledì',
      'Giovedì',
      'Venerdì',
      'Sabato',
    ],
  };

  const months = {
    en: [
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
    ],
    it: [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ],
  };

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const day = days[languageCode][now.getDay()];
  const date = now.getDate();
  const month = months[languageCode][now.getMonth()];

  if (languageCode === 'it') {
    const formattedHours = hours.toString().padStart(2, '0');
    return `${day} ${date} ${month} - ${formattedHours}:${minutes}`;
  }

  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = (hours % 12 || 12).toString();
  return `${day} ${date} ${month} - ${formattedHours}:${minutes}${period}`;
}

export default formatCurrentDate;

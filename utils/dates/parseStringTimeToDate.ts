//const time = "Venerdì 30 maggio - 08:30";

const parseStringTimeToDate = (time: string) => {
  const cleaned = time.substring(time.indexOf(' ') + 1).replace(' - ', ' ');
  const [dayStr, monthStr, timeStr] = cleaned.split(' ');
  const day = parseInt(dayStr, 10);
  const [hour, minute] = timeStr.split(':').map(Number);

  const months: {[key: string]: number} = {
    gennaio: 0,
    febbraio: 1,
    marzo: 2,
    aprile: 3,
    maggio: 4,
    giugno: 5,
    luglio: 6,
    agosto: 7,
    settembre: 8,
    ottobre: 9,
    novembre: 10,
    dicembre: 11,
  };

  const monthIndex = months[monthStr.toLowerCase()];

  const now = new Date();
  const date = new Date(now.getFullYear(), monthIndex, day, hour, minute);
  return date;
};

export default parseStringTimeToDate;

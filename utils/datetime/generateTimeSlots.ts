function generateTimeSlots(start: string, end: string): string[] {
  const result: string[] = [];
  let [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    const paddedHour = String(startHour).padStart(2, '0');
    const paddedMinute = String(startMinute).padStart(2, '0');
    result.push(`${paddedHour}:${paddedMinute}`);

    startMinute += 30;
    if (startMinute >= 60) {
      startMinute = 0;
      startHour += 1;
    }
  }

  return result;
}

export default generateTimeSlots;

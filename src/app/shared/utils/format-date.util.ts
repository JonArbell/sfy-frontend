export function formatToReadableDate(isoString: string | Date | null): string {
  if (!isoString) return '';

  const date = typeof isoString === 'string' ? new Date(isoString) : isoString;

  const datePart = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timePart = date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase(); // convert AM/PM to am/pm

  return `${datePart} ${timePart}`;
}

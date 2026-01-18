import { formatColumn } from './format-col.util';

export function formatValueByColumn(value: unknown, column: string): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (column.toLowerCase().includes('date')) {
    const date = value instanceof Date ? value : null;

    if (!date) return `No ${formatColumn(column).toLocaleLowerCase()}`;

    if (!isNaN(date.getTime())) {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  }

  return String(value ?? '');
}

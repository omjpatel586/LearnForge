export const formatDate = (value: string | number | Date, locale = 'en-IN'): string =>
  new Date(value).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

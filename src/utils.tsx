/**
 * Format a date string as YYYY-MM-DD.
 * @param value The date string
 * @return The date string formatted as YYYY-MM-DD
 */
export const formatDate = (value: string): string => {
  const date = Date.parse(value);
  const formatter = new Intl.DateTimeFormat("sv-SE");
  return formatter.format(date);
};

/**
 * Return a copy of a set with a value removed.
 * (This is only here because the built-in Set is lacking this method.)
 * @param set The set to exclude a value from
 * @param value The value to exclude
 * @return A new set with the value excluded
 */
export function setRemove<T>(set: Set<T>, value: T): Set<T> {
  return new Set(Array.from(set.keys()).filter((v) => v != value));
}

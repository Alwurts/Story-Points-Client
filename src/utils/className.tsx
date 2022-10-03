/**
 * Take an array of string an return a single string
 * Used to concatenate classNames for JSX elements
 * @param {string[]} classes A string array
 * @returns {string}
 */
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export default classNames;

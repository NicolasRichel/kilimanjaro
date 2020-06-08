
/** 
 * Arrays functions
 */

export function addArrayElement(array, element) {
  return array.concat(element);
}

export function updateArrayElement(array, index, element) {
  return [ ...array.slice(0, index), element, ...array.slice(index + 1) ];
}

export function removeArrayElement(array, index) {
  return [ ...array.slice(0, index), ...array.slice(index + 1) ];
}

export function mapArrayToObject(array, key) {
  return array.map(x => ({ [x[key]]: x })).reduce(
    (obj, x) => Object.assign(obj, x), {}
  ); 
}


/**
 * Date functions
 */

export function getCurrentDate() {
  const date = new Date();
  const locale = 'fr-FR';
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString(locale, options).split('/').reverse().join('-');
}

export function getFirstDayOfMonth(date) {
  return date.slice(0, -2) + '01';
}

export function getLastDayOfMonth(date) {
  const [ year, month, day ] = date.split('-');
  const y = +year, m = +month - 1;
  return date.slice(0, -2) + (/3|5|8|10/.test(m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31);
}

export function getMonthName(date) {
  const month = +date.split('-')[1] - 1;
  return [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ][ month ];
}


/**
 * Numbers functions
 */

export function round(x, p) {
  const n = Math.pow(10, p);
  return Math.round( x * n ) / n;
}


/**
 * UUID generation function
 */
export function generateUUIDv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

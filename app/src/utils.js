
/** 
 * Arrays functions
 */

export function addArrayElement(array, element) {
  return array.concat(element);
}

export function updateArrayElement(array, element) {
  const i = array.findIndex(x => x._id === element._id);
  return [ ...array.slice(0, i), element, ...array.slice(i + 1) ];
}

export function updateArrayElements(array, elements) {
  const elementsObj = mapArrayToObject(elements, '_id');
  return array.map(
    e => !!elementsObj[e._id] ? { ...elementsObj[e._id] } : { ...e }
  );
}

export function removeArrayElement(array, element) {
  const i = array.findIndex(x => x._id === element._id);
  return [ ...array.slice(0, i), ...array.slice(i + 1) ];
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

export function getYear(date) {
  return date.substring(0, 4);
}

export function getMonth(date) {
  return date.substring(5, 7);
}

export function getDay(date) {
  return date.slice(-2);
}

function getNumberOfDaysInMonth(y, m) {
  return (/3|5|8|10/.test(m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31);
}

export function getFirstDayOfMonth(date) {
  return date.slice(0, -2) + '01';
}

export function getLastDayOfMonth(date) {
  const [ year, month ] = date.split('-');
  const y = +year, m = +month - 1;
  return date.slice(0, -2) + getNumberOfDaysInMonth(y, m);
}

export function getMonthDays(date) {
  const [ year, month ] = date.split('-');
  const y = +year, m = +month - 1;
  return ['01','02','03','04','05','06','07','08','09'].concat(
    Array.from(
      { length: getNumberOfDaysInMonth(y, m) - 9 },
      (x, i) => `${(i + 10)}`
    )
  );
}

export function getMonthDates(date) {
  const [ year, month ] = date.split('-');
  return getMonthDays(date).map(day => `${year}-${month}-${day}`);
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

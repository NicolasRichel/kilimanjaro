
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

export function mapToMonthName(month) {
  return [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ][ parseInt(month) - 1 ];
}


/**
 * UUID generation function
 */
export function generateUUIDv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

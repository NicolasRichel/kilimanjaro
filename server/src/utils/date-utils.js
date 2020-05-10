class CustomDate {

  constructor(dateString) {
    this.set(dateString);
  }

  get() {
    const year = this.year;
    const month = ('0' + (this.month + 1)).slice(-2);
    const day = ('0' + this.day).slice(-2);
    return `${year}-${month}-${day}`;
  }

  set(dateString) {
    const date = new Date(dateString);
    this._set(date);
    return this;
  }

  _set(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.dayOfWeek = date.getDay();
  }


  nextDay() {
    return this.plusDays(1);
  }

  previousDay() {
    return this.plusDays(-1);
  }

  plusDays(n) {
    this._set( new Date(this.year, this.month, this.day + n) );
    return this;
  }

  minusDays(n) {
    return this.plusDays( -n );
  }

  plusWeeks(n) {
    this._set( new Date(this.year, this.month, this.day + 7*n) );
    return this;
  }

  minusWeeks(n) {
    return this.plusWeeks( -n );
  }

  plusMonths(n) {
    const month = (this.month + n) % 12;
    const year = this.year + Math.floor((this.month + n) / 12);
    const isLastDay = this.day === numberOfDaysInMonth(this.year, this.month);
    const day = isLastDay ? numberOfDaysInMonth(year, month) : this.day;
    this._set( new Date(year, month, day) );
    return this;
  }

  minusMonths(n) {
    return this.plusMonths( -n );
  }

  firstDayOfWeek() {
    const day = this.dayOfWeek === 0 ? this.day - 6 : this.day - (this.dayOfWeek - 1);
    this._set( new Date(this.year, this.month, day) );
    return this;
  }

  lastDayOfWeek() {
    const day = this.dayOfWeek === 0 ? this.day : this.day + (7 - this.dayOfWeek);
    this._set( new Date(this.year, this.month, day) );
    return this;
  }

  firstDayOfMonth() {
    this._set( new Date(this.year, this.month, 1) );
    return this;
  }

  lastDayOfMonth() {
    this.day = numberOfDaysInMonth(this.year, this.month);
    this._set( new Date(this.year, this.month, this.day) );
    return this;
  }

}


function numberOfDaysInMonth(y, m) {
  // See : https://stackoverflow.com/questions/1810984/number-of-days-in-any-month
  // And : https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
  return /8|3|5|10/.test(m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
}


module.exports = {
  CustomDate
};

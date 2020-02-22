import React from 'react';
import IconButton from '../icon-button/IconButton';

// Styles
import './DateInput.scss';


const YEARS = [
  '2020', '2019', '2018'
];

const MONTHS = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

const DAYS = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
];


class DateInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDateSelector: false,
      year: YEARS[0],
      month: MONTHS[0],
      day: DAYS[0],
      value: props.value || ''
    };
  }


  setYear = (e) => this.setState({ year: e.target.value});
  setMonth = (e) => this.setState({ month: e.target.value });
  setDay = (e) => this.setState({ day: e.target.value });

  setDate = (e) => {
    this.toggleDateSelector();
    const date = ['year', 'month', 'day'].map(x => this.state[x]).join('-');
    this.setState({ value: date });
    this.props.onChange && this.props.onChange( date );
  };

  toggleDateSelector = () => {
    this.setState({ showDateSelector: !this.state.showDateSelector });
  };


  render() {
    return (
      <div className="DateInput">
        <input type="text" readOnly value={this.state.value}/>
        <IconButton
          icon="calendar-day"
          color="green"
          iconColor="white"
          onClick={this.toggleDateSelector}
        />
        <div className={`date-selector-container ${this.state.showDateSelector ? '' : 'hidden'}`}>
          <select value={this.state.year} onChange={this.setYear}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={this.state.month} onChange={this.setMonth}>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={this.state.day} onChange={this.setDay}>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <IconButton icon="check" onClick={this.setDate} />
        </div>
      </div>
    );
  }

}


export default DateInput;

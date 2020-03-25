import React from 'react';
// Atoms
import LabelTag from '../../01-atoms/label-tag/LabelTag';
import ActionButton from '../../01-atoms/action-button/ActionButton';

// Styles
import './LabelsTable.scss';


class LabelsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLabel: {}
    };
  }


  setCurrentLabel = (label) => {
    const currentLabel = label._id === this.state.currentLabel._id ? {} : label;
    this.setState({ currentLabel });
    this.props.onSelect( currentLabel );
  };


  render() {
    return (
      <div className="LabelsTable">
        <div className="header">
          <div className="row header-row">
            <span className="cell header-cell column-name">Nom</span>
            <span className="cell header-cell column-label">Label</span>
            <span className="cell header-cell column-actions">&nbsp;</span>
          </div>
        </div>
        <div className="body">
          {this.props.labels.map(label =>
            <div key={label._id}
              onClick={() => this.setCurrentLabel(label)}
              className={`row body-row ${
                this.state.currentLabel._id === label._id ? 'selected' : ''
              }`}>
              <span className="cell body-cell column-name">
                {label.name}
              </span>
              <span className="cell body-cell column-label">
                <LabelTag label={label} />
              </span>
              <span className="cell body-cell column-actions">
                <ActionButton icon="trash" onClick={() => this.props.onDelete(label)} />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

}


export default LabelsTable;

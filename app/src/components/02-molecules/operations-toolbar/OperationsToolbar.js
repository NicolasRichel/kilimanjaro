import React from 'react';
// Atoms
import ActionButton from '../../01-atoms/action-button/ActionButton';
// Molecules
import LabelsSelector from '../labels-selector/LabelsSelector';

class OperationsToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: null
    };
  }

  updateLabel() {
    if (this.state.label) {
      this.props.onUpdateLabel(this.state.label, this.props.operations);
      this.setState({ label: null });
    }
  }

  render() {
    const operations = this.props.operations;
    return (
      <div className="OperationsToolbar">
        {operations.length > 0 && (
          <div>
            <LabelsSelector
              labels={this.props.labels}
              value={this.state.label ? [this.state.label] : []}
              onChange={v => this.setState({ label: v[0] })} />
            <ActionButton
              icon="tags"
              onClick={() => this.updateLabel()} />
          </div>
        )}
      </div>
    );
  }

}

export default OperationsToolbar;

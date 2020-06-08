import React from 'react';
// Atoms
import ColorInput from '../../01-atoms/color-input/ColorInput';
import ActionButton from '../../01-atoms/action-button/ActionButton';
import LabelTag from '../../01-atoms/label-tag/LabelTag';
import StringInput from '../../01-atoms/string-input/StringInput';

// Styles
import './LabelForm.scss';

class LabelForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: props.label || {}
    };
  }

  componentDidUpdate() {
    if (this.props.label._id !== this.state.label._id) {
      this.setState({ label: this.props.label });
    }
  }


  setField = (field) => {
    return (value) => this.setState({
      label: {
        ...this.state.label,
        [field]: value
      }
    });
  };

  validate = () => {
    const l = this.state.label;
    return !!l.name && !!l.color && !!l.textColor;
  };

  submit = () => {
    if (this.validate()) {
      this.props.onSubmit( this.state.label );
      this.clear();
    }
  };

  clear = () => this.setState({ label: {} });


  render() {
    const label = this.state.label;
    return (
      <div className="LabelForm">
        <div className="block form-control">
          <label>Nom</label>
          <StringInput value={label.name}
            onChange={this.setField('name')}
            className="NameInput" />
        </div>
        <div className="block form-control">
          <label>Couleur</label>
          <ColorInput value={label.color}
            onChange={this.setField('color')} />
        </div>
        <div className="block form-control">
          <label>Couleur Texte</label>
          <ColorInput value={label.textColor}
            onChange={this.setField('textColor')} />
        </div>
        <div className="block submit-button">
          <span className="label-preview">
            Label : {label.name && <LabelTag label={label} />}
          </span>
          <ActionButton icon="check" size="30" onClick={this.submit} />
        </div>
      </div>
    );
  }

}

export default LabelForm;

import { Store } from './store';
import { ServiceProvider, Services } from '../services/service-provider';
import { Actions } from './actions';


export class LabelStore extends Store {

  backendService;

  constructor() {
    super();
    this.backendService = ServiceProvider.get(Services.BACKEND_SERVICE);
    this.setState({
      labels: []
    });
  }


  handleAction(action) {
    switch (action.type) {
      case Actions.FETCH_LABEL_LIST:
        this._fetchLabelList();
        break;
      case Actions.CREATE_LABEL:
        this._createLabel(action.label);
        break;
      case Actions.UPDATE_LABEL:
        this._updateLabel(action.label);
        break;
      case Actions.DELETE_LABEL:
        this._deleteLabel(action.labelID);
        break;
    }
  }


  _fetchLabelList() {
    this.backendService.getLabels().then(labels => {
      this.setState({ labels });
    });
  }

  _createLabel(label) {
    this.setState({
      labels: this.state.labels.concat(label)
    });
  }

  _updateLabel(label) {
    const i = this.state.labels.findIndex(l => l._id === label._id);
    this.setState({
      labels: [
        ...this.state.labels.slice(0, i),
        label,
        ...this.state.labels.slice(i+1)
      ]
    });
  }

  _deleteLabel(labelID) {
    const i = this.state.labels.findIndex(l => l._id === labelID);
    this.setState({
      labels: [
        ...this.state.labels.slice(0, i),
        ...this.state.labels.slice(i+1)
      ]
    });
  }

}

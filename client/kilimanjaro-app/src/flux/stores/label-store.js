import { Actions } from '../actions';
import { ServiceProvider, Services } from '../../service-provider';
import { Store } from '../store';


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
      case Actions.FETCH_ALL_LABELS:
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
    this.backendService.createLabel(label).then(
      createdLabel => this.setState({
        labels: this.state.labels.concat(createdLabel)
      })
    );
  }

  _updateLabel(label) {
    this.backendService.updateLabel(label).then(
      (updatedLabel) => {
        const i = this.state.labels.findIndex(l => l._id === updatedLabel._id);
        this.setState({
          labels: [
            ...this.state.labels.slice(0, i),
            updatedLabel,
            ...this.state.labels.slice(i+1)
          ]
        });
      }
    );
  }

  _deleteLabel(labelID) {
    this.backendService.deleteLabel(labelID).then(
      () => {
        const i = this.state.labels.findIndex(l => l._id === labelID);
        this.setState({
          labels: [
            ...this.state.labels.slice(0, i),
            ...this.state.labels.slice(i+1)
          ]
        });
      }
    );
  }

}

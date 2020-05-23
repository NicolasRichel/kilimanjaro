import Actions from '../actions';
import BackendService from '../../services/backend-service';
import { Store } from '../store';
import * as utils from '../../utils';

class LabelStore extends Store {

  constructor() {
    super();
    this.setData({
      labels: []
    });
  }

  handleAction(action) {
    switch (action.type) {
      case Actions.FETCH_ALL_LABELS:
        this._fetchAllLabels();
        break;
      case Actions.CREATE_LABEL:
        this._createLabel(action.label);
        break;
      case Actions.UPDATE_LABEL:
        this._updateLabel(action.label);
        break;
      case Actions.DELETE_LABEL:
        this._deleteLabel(action.label);
        break;
    }
  }

  _fetchAllLabels() {
    BackendService.getLabels().then( labels => this.setData({ labels }) );
  }

  _createLabel(label) {
    BackendService.createLabel(label).then(
      createdLabel => this.setData({
        labels: utils.addArrayElement(this.data.labels, createdLabel)
      })
    );
  }

  _updateLabel(label) {
    BackendService.updateLabel(label).then(
      updatedLabel => {
        const i = this.data.labels.findIndex(l => l._id === updatedLabel._id);
        this.setData({
          labels: utils.updateArrayElement(this.data.labels, i, updatedLabel)
        });
      }
    );
  }

  _deleteLabel(label) {
    BackendService.deleteLabel(label._id).then(
      () => {
        const i = this.data.labels.findIndex(l => l._id === label._id);
        this.setData({
          labels: utils.removeArrayElement(this.data.labels, i)
        });
      }
    );
  }

}

export default new LabelStore();

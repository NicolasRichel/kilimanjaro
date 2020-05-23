import { Store } from '../store';
import { Actions } from '../actions';

class PeriodStore extends Store {

  constructor() {
    super();
    this.setData({
      period: []
    });
  }

  handleAction(action) {
    switch (action.type) {
      case Actions.SET_PERIOD:
        this.setData({ period: action.period });
        break;
    }
  }

}

export default new PeriodStore();

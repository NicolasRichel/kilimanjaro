import React from 'react';
import LabelMark from '../label-mark/LabelMark';
import IconButton from '../icon-button/IconButton';

// Services
import { ServiceProvider, Services } from '../../services/service-provider';

// Styles
import './LabelsTable.scss';


class LabelsTable extends React.Component {

  constructor(props) {
    super(props);
    this.dispatcher = ServiceProvider.get(Services.DISPATCHER);
    this.labelStore = ServiceProvider.get(Services.LABEL_STORE);
    this.labelStoreSubscription = null;
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    const s = this.labelStore.subscribeAndGetState(
      (state) => this.buildRowData( state )
    );
    this.labelStoreSubscription = s.subscriptionKey;
    this.buildRowData( s.state );
  }

  componentWillUnmount() {
    this.labelStore.unsubscribe( this.labelStoreSubscription );
  }


  buildRowData(data) {
    this.setState({
      rows: data.labels.map(label => ({
        id: label._id,
        selected: false,
        label
      }))
    });
  }

  toggleSelected = (row) => {
    const selected = !row.selected;
    const i = this.state.rows.findIndex(r => r.id === row.id);
    const j = this.state.rows.findIndex(r => r.selected);
    let rows = [
      ...this.state.rows.slice(0, i),
      Object.assign(row, { selected }),
      ...this.state.rows.slice(i+1)
    ];
    if (j !== -1 && j !== i) {
      rows = [
        ...this.state.rows.slice(0, j),
        Object.assign(rows[j], { selected: false }),
        ...this.state.rows.slice(j+1)
      ];
    }
    this.setState({ rows });
    this.emitSelected( selected ? row.label : {} );
  };

  emitSelected = (label) => {
    if (this.props.onSelect) {
      this.props.onSelect( {} )
      this.props.onSelect( label );
    }
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
          {this.state.rows.map(row =>
            <div key={row.id} className={`row body-row ${row.selected ? 'selected' : ''}`}
              onClick={() => this.toggleSelected(row)}>
              <span className="cell body-cell column-name">
                {row.label.name}
              </span>
              <span className="cell body-cell column-label">
                <LabelMark label={row.label} />
              </span>
              <span className="cell body-cell column-actions">
                <IconButton icon="trash" />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

}


export default LabelsTable;

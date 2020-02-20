/**
 * Backend Service
 */


export class BackendService {

  url;

  constructor(config) {
    this.url = config.serverURL;
  }

  // Labels API
  getLabels = () => this._get('/labels');
  createLabel = (label) => this._post('/label/create', label);
  updateLabel = (label) => this._patch(`/label/update/${label._id}`, label);
  deleteLabel = (id) => this._delete(`/label/delete/${id}`);

  // Operations API
  getOperations = () => this._get('/operations');
  getOperationByID = (id) => this._get(`/operation/${id}`);
  createOperation = (op) => this._post('/operation/create', op);
  updateOperation = (op) => this._patch(`/operation/update/${op._id}`, op);
  deleteOperation = (id) => this._delete(`/operation/delete/${id}`);


  _request = (path, options) => fetch(`${this.url}${path}`, options).then(res => res.json());

  _get = (path) => this._request(path);

  _post = (path, body) => this._request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  _patch = (path, body) => this._request(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  _delete = (path) => this._request(path, {
    method: 'DELETE'
  });

};

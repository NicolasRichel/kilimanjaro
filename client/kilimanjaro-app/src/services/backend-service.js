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
  createLabel = (label) => this._post('/labels/create', label);
  updateLabel = (label) => this._patch(`/labels/update/${label._id}`, label);
  deleteLabel = (id) => this._delete(`/labels/delete/${id}`);

  // Operations API
  getOperations = () => this._get('/operations');
  getOperationByID = (id) => this._get(`/operations/${id}`);
  createOperation = (op) => this._post('/operations/create', op);
  updateOperation = (op) => this._patch(`/operations/update/${op._id}`, op);
  deleteOperation = (id) => this._delete(`/operations/delete/${id}`);


  _request = (path, options) => fetch(`${this.url}${path}`, options)
    .then(res => res.json())
    .catch(error => {});

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

export default class Entity {

  constructor() {
    this.URL = "";
}
  

  list() {}

  get() {
    return {
      url:this.URL,
      method: "GET",
    }
  }
 
  create(id, name) {
    return {
      url: `${this.URL}/${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({}),
    };
  }

  update() {}

  delete(id) {
    return {
      url: `${this.URL}/${id}`,
      method: 'DELETE',
    };
  }
}

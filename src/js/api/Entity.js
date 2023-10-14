export default class Entity {
  get() {
    return {
      url: this.URL,
      method: 'GET',
    };
  }

  create(id, name) {
    return {
      url: `${this.URL}/${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    };
  }
}

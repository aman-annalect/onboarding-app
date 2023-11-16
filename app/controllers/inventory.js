import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InventoryController extends Controller {
  @service router;
  @tracked showModal = false;
  @action
  navigateToDashboard() {
    this.router.transitionTo('index');
  }
  @action
  openModal() {
    this.showModal = true;
  }
  @action
  closeModal() {
    this.showModal = false;
  }
  @action
  addProduct(product) {
    const url = 'http://127.0.0.1:3000/products';
    const data = product;

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('POST request successful:', data);
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
      });
    let model = this.get('model');
    model.products = [...model.products, data];
    this.showModal = false;
  }
}

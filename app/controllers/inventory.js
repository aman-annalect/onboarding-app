import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InventoryController extends Controller {
  @service router;
  @tracked showModal = false;
  @tracked data;
  @tracked products;
  @tracked dataPerPage;
  @tracked currentProduct = null;

  constructor() {
    super(...arguments);
  }
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
    this.currentProduct = null;
  }
  @action
  async addNewProduct(product) {
    const url = 'http://127.0.0.1:3000/products';
    const data = product;

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const newProduct = await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('POST request successful:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
      });
    this.products = [...this.products, newProduct];
    this.showModal = false;
  }
  @action
  async editProduct(product) {
    const url = `http://127.0.0.1:3000/products/${product.productId}`;
    const data = product;

    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const editedProduct = await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
      });
    const index = this.products.findIndex(
      (item) => item.id === editedProduct.productId,
    );
    const products = this.products;
    products[index] = editedProduct;
    this.products = [...products];
    this.showModal = false;
    this.currentProduct = null;
  }
  @action
  async addProduct(product) {
    if (product.productId) {
      this.editProduct(product);
    } else {
      this.addNewProduct(product);
    }
  }

  @action
  setCurrentProduct(product) {
    this.showModal = true;
    this.currentProduct = product;
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductFormComponent extends Component {
  @tracked productId = null;
  @tracked product;
  @tracked category = null;
  @tracked lastOrderDate = "20/10/2023";
  @tracked brand;
  @tracked stock;
  @tracked price;
  @tracked supplier;
  @tracked rating = 0;
  @tracked editProduct = false;
  constructor() {
    super(...arguments);
    if (this.args.product) {
      const currentProductData = this.args.product;
      this.product = currentProductData.product;
      this.category = currentProductData.category;
      this.productId = currentProductData.id;
      this.brand = currentProductData.brand;
      this.stock = currentProductData.stock;
      this.price = currentProductData.price;
      this.supplier = currentProductData.supplier;
      this.rating = currentProductData.rating;
      this.lastOrderDate = currentProductData.lastOrderDate;
      this.editProduct = true;
    }
  }
  @action
  submitForm(e) {
    e.preventDefault();
    this.args.addProduct({
      product: this.product,
      category: this.category,
      brand: this.brand,
      stock: this.stock,
      price: this.price,
      supplier: this.supplier,
      rating: this.rating,
      productId: this.productId,
      lastOrderDate: this.lastOrderDate,
    });
  }

  @action
  handleInput(field, event) {
    this[field] = event.target.value;
  }
}

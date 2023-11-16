import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductFormComponent extends Component {
  @tracked product;
  @tracked category = null;
  @tracked brand;
  @tracked stock;
  @tracked price;
  @tracked supplier;
  @tracked rating = 0;

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
    });
  }

  @action
  handleInput(field, event) {
    this[field] = event.target.value;
  }
}

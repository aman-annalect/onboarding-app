import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductTableComponent extends Component {
  @tracked columns = [
    'Id',
    'Product',
    'Category',
    'Brand',
    'Stock',
    'Price',
    'Last Order Date',
    'Supplier',
    'Rating',
  ];
  @tracked currentPage = 1;
  get totalPages() {
    return Math.ceil(
      this.args.data.products.length / this.args.data.dataPerPage,
    );
  }
  get loopCount() {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  get firstIndex() {
    return this.args.data.dataPerPage * (this.currentPage - 1) + 1;
  }
  get lastIndex() {
    return this.args.data.dataPerPage * this.currentPage <
      this.args.data.products.length
      ? this.args.data.dataPerPage * this.currentPage
      : this.args.data.products.length;
  }
  get currentData() {
    return this.args.data.products.slice(this.firstIndex - 1, this.lastIndex);
  }
  @action
  changeCurrentPage(page) {
    this.currentPage = page;
  }
  @action
  perviousPage() {
    if (this.currentPage !== 1) this.currentPage = this.currentPage - 1;
  }
  @action
  nextPage() {
    if (this.currentPage !== this.totalPages)
      this.currentPage = this.currentPage + 1;
  }
}

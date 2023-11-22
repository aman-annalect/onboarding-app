import Component from '@glimmer/component';
import $ from 'jquery';
import 'datatables.net';
import { action } from '@ember/object';

export default class DataTableComponent extends Component {
  constructor() {
    super(...arguments);
  }
  @action
  initDataTable() {
    var table = $('table').DataTable({
      data: this.args.data,
      searching: false,
      lengthChange: false,
      columns: [
        { data: 'id', title: 'Id' },
        { data: 'product', title: 'Product' },
        { data: 'category', title: 'Category' },
        { data: 'brand', title: 'Brand' },
        { data: 'stock', title: 'Stock' },
        { data: 'price', title: 'Price' },
        { data: 'lastOrderDate', title: 'Last Order Date' },
        { data: 'supplier', title: 'Supplier' },
        { data: 'rating', title: 'Rating' },
      ],
      columnDefs:[
        {"className": "dt-center", "targets": "_all"}
      ],
      ordering: false,
    });

    $('tbody').on('click', 'tr', (e) => {
      this.editProduct(table.row( e.currentTarget ).data())
    });
  }
  @action
  editProduct(product) {
    this.args.setCurrentProduct(product);
  }
  @action
  updateDataTable() {
    $('table').dataTable().fnClearTable();
    $('table').dataTable().fnAddData(this.args.data);
  }
};
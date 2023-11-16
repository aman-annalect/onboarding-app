import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InventoryRoute extends Route {
  @service store;
  async model() {
    try {
      const products = await fetch('http://127.0.0.1:3000/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data from the response
          return data;
        })
        .catch((error) => {
          // Handle errors during the fetch
          console.error('Fetch error:', error);
        });
      const dataPerPage = 10;
      const data = {
        products,
        dataPerPage,
      };
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

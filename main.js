const app = Vue.createApp({
  data() {
    return {
      action: 'Achat de café',
      brand: 'Nespresso',
      link: 'https://www.nespresso.com',
      cart: 0,
      premium: true 
    };
    
  },
  methods: {
    updateCart() {
      this.cart += 1;
    }
  },
  computed: {
    title() {
      return this.action + ' ' + this.brand;
    }
  },

});



const app = Vue.createApp({
  data() {
    return {
      action: 'Achat de café',
      brand: 'Nespresso',
      link: 'https://www.nespresso.com',
      cart: [],
      premium: true 
    };
    
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
      // console.log("ID ajouté :", id);
      // console.log("Panier actuel :", this.cart);
    },
    removeFromCart(id) {
      const index = this.cart.indexOf(id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    }
  },
  computed: {
    title() {
      return this.action + ' ' + this.brand;
    }
  },

});



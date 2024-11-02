const app = Vue.createApp({
  data() {
    return {
      action: 'Achat de café',
      brand: 'Nespresso',
      link: 'https://www.nespresso.com',
      cart: 0,
      premium: true // Variable premium à true ou false
    };
  },
  computed: {
    title() {
      return this.action + ' ' + this.brand;
    }
  }
});



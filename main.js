const app = Vue.createApp({
  data() {
    return {
      action: 'Achat de café',
      brand: 'Nespresso',
      styles: {
        roundButton: {
          borderRadius: '20px',
          padding: '10px',
          backgroundColor: 'rgb(0, 114, 180)',
          color: 'white',
          cursor: 'pointer'
        }
      },
      description: 'Achetez vos capsules de café en ligne',
      selectedImage: 0, // Utilisé pour afficher l'image principale par index
      link: 'https://www.nespresso.com',
      inStock: true,
      onSale: true,
      details: [
        {
          id: 1,
          text: 'Doux',
          color: '#6C99C6'
        },
        {
          id: 2,
          text: 'Harmonieux',
          color: '#BF9E74'
        }
      ],
      carouselImages: [
        {
          id: 1,
          text: 'Capsule 1',
          image: './assets/images/colombia.png',
        },
        {
          id: 2,
          text: 'Capsule 2',
          image: './assets/images/colombia_de_cote.png',
        },
        {
          id: 3,
          text: 'Tasse',
          image: './assets/images/colombia_tasse.png',
        },
        {
          id: 4,
          text: 'Paquet',
          image: './assets/images/colombia_paquet.png',
        }
      ],
      packageSizes: [
        { id: 1, quantity: 10, price: '4.50 CHF' },
        { id: 2, quantity: 20, price: '8.50 CHF' },
        { id: 3, quantity: 30, price: '12.00 CHF' }
      ],
      cart: 0,
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    updateImage(imageIndex) {
      this.selectedImage = imageIndex; // Met à jour l'index de l'image sélectionnée
    }
  },
  computed: {
    title() {
      return this.action + ' ' + this.brand;
    },
    is_out_of_stock() {
      return this.inStock<=0;
    }
  },
  styles: {
    roundButton: {
      borderRadius: '20px',
      padding: '10px',
      backgroundColor: 'rgb(0, 114, 180)',
      color: 'white',
      cursor: 'pointer'
    }
  }
});

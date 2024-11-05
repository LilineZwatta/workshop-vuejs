app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["add-to-cart", "remove-from-cart"],
  template:
    /*html*/
    `
    <div>
      <p>{{ description }}</p>
      <div>
        <img height="200" :src="carouselImages[selectedImage].image" :class="{ outOfStock: isOutOfStock }" />
      </div>
      <p v-if="inStock">Disponible</p>
      <p v-else>Plus de stock</p>
      <p v-show="onSale">En Vente !</p>

      <!-- Carrousel de miniatures -->
      <div>
        <span
          v-for="(carouselImage, index) in carouselImages"
          :key="carouselImage.id"
          @mouseover="updateImage(index)"
        >
          <img height="50" :alt="carouselImage.text" :src="carouselImage.image" />
        </span>
      </div>
      
      <!-- Liste des tailles de paquets -->
      <ul>
        <li v-for="packageSize in packageSizes" :key="packageSize.id">
          {{ packageSize.quantity }} - {{ packageSize.price }}
        </li>
      </ul>

      <!-- Affichage des frais de port -->
      <p>Shipping: {{ shipping }}</p>

      <!-- Boutons Ajouter et Retirer du panier -->
      <button @click="addToCart" :style="styles.roundButton" :disabled="isOutOfStock">Ajouter au panier</button>
      <button @click="removeFromCart" :style="styles.roundButton" :disabled="isOutOfStock">Retirer du panier</button>
    </div>
  `,
  data() {
    return {
      description: "Achetez vos capsules de café en ligne",
      selectedImage: 0,
      inStock: true,
      onSale: true,

      details: [
        { id: 1, text: "Doux", color: "#6C99C6" },
        { id: 2, text: "Harmonieux", color: "#BF9E74" },
      ],
      styles: {
        roundButton: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor: "rgb(0, 114, 180)",
          color: "white",
          cursor: "pointer",
        },
      },

      carouselImages: [
        { id: 1, text: "Capsule 1", image: "./assets/images/colombia.png" },
        {
          id: 2,
          text: "Capsule 2",
          image: "./assets/images/colombia_de_cote.png",
        },
        { id: 3, text: "Tasse", image: "./assets/images/colombia_tasse.png" },
        { id: 4, text: "Paquet", image: "./assets/images/colombia_paquet.png" },
      ],
      packageSizes: [
        { id: 1, quantity: 10, price: "4.50 CHF" },
        { id: 2, quantity: 20, price: "8.50 CHF" },
        { id: 3, quantity: 30, price: "12.00 CHF" },
      ],
    };
  },
  methods: {
    addToCart() {
      // this.$root.cart += 1;
      this.$emit("add-to-cart", this.carouselImages[this.selectedImage].id);
    },
    removeFromCart() {
      // this.$root.cart -= 1;
      this.$emit(
        "remove-from-cart",
        this.carouselImages[this.selectedImage].id
      );
    },
    updateImage(imageIndex) {
      this.selectedImage = imageIndex;
    },
  },
  computed: {
    isOutOfStock() {
      return !this.inStock;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }

      return 2.99;
    },
  },
});

# 0. Explication

Ce README retrace l'intégralité du projet et permet de recréer le projet depuis 0 à partir du projet de base donnée.

Toutes les étapes sont décrites à la suite de ce document.

# 1. Introduction

## Vue Devtools

Installer Vue Devtools à partir d'ici : https://devtools.vuejs.org/guide/installation.html

Vue Devtools permet de visualiser la structure et les données de l'application.
Ce qu'il se passe dans l'application et dans chaque composant.

> Sur Chorme il faudra peut-être cocher la case "Allow access to file URLs"

## ES6

Si VSCode est utilisé, alors installez `es6-string-html`. Nous en aurons besoin plus tard.

## Prettier (Optionnel)

Le code du workshop est formatté avec [Prettier](https://prettier.io/). Sur VSCode, on le trouve dans les extensions avec l'ID suivant: `esbenp.prettier-vscode`.

Ce n'est pas obligatoire d'utiliser ce formatteur spécifique, mais personnellement je le trouve bien 😄

## CDN Vue

La méthode d'installation recommandé par les créateurs du framework est d'utiliser un package manager tels que `npm` ou `yarn` ainsi que le Vue CLI afin de créer un template de projet avec toute les dépendances nécessaires (voir [Creating a Vue Application](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)).

Cependant, dans le cadre du workshop, nous allons utiliser un CDN afin de gagner du temps sur la mise en place du projet.

Copier-coller le CDN Vue sur la page de Vue 3 dans la balise head du HTML, nous utiliserons une version précise, donc voici le CDN pour cette version.

```html
<script src="https://unpkg.com/vue@3.5.12/dist/vue.global.js"></script>
```

> Source for CDN : https://vuejs.org/guide/quick-start.html#using-vue-from-cdn

# 2. Creating the Vue App

## Init app Vue

Dans l'`index.html` avoir un div avec `id="app"` en dessous `<body>`.

```html
<body>
  <div id="app"></div>
  ...
```

Et donc dans `main.js` on peut créer notre application Vue.

```js
const app = Vue.createApp({});
```

Il faut ensuite relié l'app VueJS à l'élément HTML avec l'id app.

```html
<script>
  const mountedApp = app.mount('#app');
</script>
```

## Expression}

Ajoutons quelques éléments à notre app Vue.
Ajoutons un titre (h1) à notre application à l'aide de Vue.
Il faut donc créer une variable `title` dans data et l'utiliser dans le fichier HTML à l'aide de `{{}}`.

> ES6 syntaxe : `data: function() {}` --> `data() {}`

```js
const app = Vue.createApp({
  data: function () {
    return {
      title: 'Achat de café Nespresso',
    };
  },
});
```

> {{}} interprète ce qui se trouve dedans, cela permet d'effectuer des opérations en tout genre (concaténation, opération ternaire, etc.)

Il est possible d'interagir avec Vue depuis la console du navigateur en écrivant par exemple

```js
mountedApp.title = 'Ceci est un titre différent';
```

## Challenge

Ajouter une description avec la même technique que pour le titre, une expression dans un élément `p` sous `h1`.

# 3. Attribute Binding

v-bind permet de lier un attribut HTML à une expression.
Exemple de syntaxe : `v-bind:src`, `v-bind:class`, `v-bind:disabled`

Ajoutons une image grâce à ce concept.
Il faut créer une nouvelle variable dans data et ensuite l'utiliser dans le fichier HTML.

```HTML
<img height="200" v-bind:src="image" />
```

> Raccourci pour v-bind : `v-bind:src` --> `:src`

## Challenge

Ajouter un lien sur le titre en utilisant le binding et `href` de l'élément `<a>`.

# 4. Conditional Rendering

## v-if et v-else

`v-if` et `v-else` permettent d'afficher des choses différentes en fonction de la condition.

Ajoutons un booléen dans data `inStock` et utilisons-le pour afficher un message différent à l'utilisateur en fonction de sa valeur.

```HTML
<p v-if="inStock">Disponible</p>
<p v-else>Plus de stock</p>
```

## v-else-if

Il est possible d'avoir des conditions plus complexes en utilisant aussi `v-else-if`.

```HTML
<p v-if="stock > 10">Disponible</p>
<p v-else-if="stock <= 10 && stock > 0">Peu de stock</p>
<p v-else>Plus de stock</p>
```

## v-show

`v-show` utilise la visibilité de l'élément, il est de se fait très utile et recommandé lorsque l'on désire afficher et masquer fréquemment des éléments du DOM.

## Challenge

Ajouter une propriété `onSale` permettant d'afficher "En Vente !".

# 5. List Rendering

`v-for` peu s'avérer très utile lorsque l'on désire afficher une liste d'éléments.

```
v-for="item in collection"
```

## Tableaux simples

Commençons par afficher une liste de détails à notre café.
Il faut donc créer un tableau d'élément dans data.

```js
details: ['Doux', 'Harmonieux'];
```

Puis l'utiliser dans le HTML.

```html
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
```

## :key

Il est recommandé de donnée une `:key` pour chaque élément de la liste, cela permet de donner un id unique à chaque élément du DOM et permet ainsi à Vue de suivre tous les éléments lorsque le DOM est modifié. Le résultat est l'amélioration des performances et cela peut s'avérer très utile par la suite, lors de l'utilisation des animations. Autant appliquer la bonne pratique dès le départ.

Il faut donc créer des tableaux d'objets.
Créons un nouveau tableau contenant des textes avec un id dans data.

```js
carouselImages: [
  {
    id: 1,
    text: 'Capsule 1',
  },
  {
    id: 2,
    text: 'Capsule 2',
  },
  {
    id: 3,
    text: 'Tasse',
  },
  {
    id: 4,
    text: 'Paquet',
  }
],
```

Il faut maintenant afficher notre tableau dans le HTML avec l'attribut `:key`.

```html
<div v-for="carouselImage in carouselImages" :key="carouselImage.id">
  {{ carouselImage.text }}
</div>
```

## Challenge

Ajouter un tableau de taille de paquet contenant la quantité de capsules dans un paquet (id, quantity, price) et afficher toutes ces infos à l'utilisateur en utilisant `v-for` et `:key`.

# 6. Event Handeling

Nous allons maintenant voir comment gérer les événements avec Vue grâce à la directive `v-on`.

## Exemple simple

Faisons un exemple en ajoutant un système de panier à notre site.

Commençons par ajouter un bouton permettant d'ajouter des éléments dans notre panier.

Il faut ajouter une var `cart` dans data qui contiendra la valeur actuelle de notre panier.
Puis ajouter un bouton dans le HTML en y ajoutant la directive `v-on` et en incrémentant le panier de 1 à chaque clique.

```HTML
<button v-on:click="cart += 1">Ajouter au panier</button>
```

> Il existe une syntaxe plus courte pour `v-on`, il s'agit du `@` donc par exemple `v-on:click` donnera `@click`

Ajoutons également un peu d'HTML pour afficher la valeur du panier sur notre page.

```HTML
<div>Panier({{ cart }})</div>
```

Ici nous avons effectué l'opération directement dans le HTML, car notre opération est simple. Dans le cas où nous souhaitons effectuer plusieurs actions, il est largement préférable d'utiliser des méthodes. Cela tombe bien, car Vue permet de faire cela.

## methods

Pour se faire, ajoutons l'élément `methods` à notre app Vue dans notre code JS au même niveau que data.

```js
data() {
},
methods: {
}
```

Il est maintenant possible d'ajouter une nouvelle méthode afin de pouvoir ensuite l'utiliser dans le HTML.

```js
methods: {
  addToCart: function() {
    this.cart += 1;
  },
}
```

> `this.cart` fait référence à la var `cart` dans data
> Les méthodes peuvent également être écrites comme ceci : `addToCart: function() {}` --> `addToCart() {}`

## Carrousel

Ce qui pourrait être vraiment sympa c'est de faire un carrousel pour montrer plusieurs images du café à l'utilisateur.

Nous allons utiliser le tableau d'objet que nous avons créé précédemment `carouelImages`. Il faut ajouter un attribut `image` à chaque objet qui contiendra le lien vers une image dans notre dossier images.

```js
carouselImages: [
  {
    id: 1,
    text: 'Capsule 1',
    image: './assets/images/colombia.png',
  },
  {
    id:  2,
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
```

Ensuite nous pouvons modifier notre HTML comme ceci afin d'afficher les images en dessous de l'image principale. Il ne nous reste plus qu'à ajouter la directive `@mouseover` et la relier à une méthode `updateImage` dans data qui va changer la valeur de la var `image`

```html
<div>
  <span
    v-for="carouselImage in carouselImages"
    :key="carouselImage.id"
    @mouseover="updateImage(carouselImage.image)"
  >
    <img height="50" alt="carouselImage.text" :src="carouselImage.image" />
  </span>
</div>
```

Il est possible d'utiliser d'autre événement comme `change` sur des radios p. ex.

## Challenge

Créer un nouveau bouton et une nouvelle méthode pour décrémenter le nombre d'objets dans le panier.

# 7. Class & Style Binding

Nous allons voir comment Vue permet d'effectuer des actions sur les styles et les classes.

## :style

Changeons la couleur des détails du café.

Il faut commencer par adapter le tableau `details` dans data pour répondre à nos nouveaux besoins et profitons-en pour lui donner un attribut id.

```js
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
```

Dans le HTML il faut donc adapter son utilisation.
Relier l'attribut id à l'élément `key` et il faut également adapter l'utilisation de l'affichage du texte en appelant la propriété `text` de l'objet.
Au niveau du style il suffit d'utiliser `:style` en utilisant l'attribut `color` de `detail` et en le liant à l'attribut css `color`.

```html
<ul>
  <li
    v-for="detail in details"
    :key="detail.id"
    :style="{ color: detail.color }"
  >
    {{ detail.text }}
  </li>
</ul>
```

## camel vs kebab

Il y a 2 manières possibles d'utiliser les attributs css

1. En notation camelCase `:style="{ backgroundColor: detail.color }"` ou
2. En notation 'kebab-case' `:style="{ 'background-color': detail.color }"`

## Objet de style

Il est également possible d'utiliser un objet de style, changeons le style du bouton d'ajout au panier pour illustrer l'exemple :

Dans le JS on crée un objet qui va regrouper tous nos styles et on crée un nouvel object pour le bouton qui contiendra tous ses styles.

```js
styles: {
  roundButton: {
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: 'rgb(0, 114, 180)',
    color: 'white',
    cursor: 'pointer'
  }
},
```

Dans le HTML on ajoute `:style` au bouton. Mais cette fois il suffit d'ajouter notre objet avec une notation bien plus simple, car tous les styles sont déjà contenus dans l'objet JS déjà correctement formaté.

```HTML
<button @click="addToCart" :style="styles.roundButton">
  Ajouter au panier
</button>
```

## :class

Essayons de voir la différence si on utilise les classes css.

Commençons par désactiver les interactions avec notre bouton si le stock est <= 0 en utilisant l'attribut `disabled`.

```html
<button @click="addToCart" :style="styles.roundButton" :disabled="stock <= 0">
  Ajouter au panier
</button>
```

Rendons le tout un peu plus clair visuellement en ajoutant du css.

```css
.disabledButton {
  background-color: #d8d8d8 !important;
  cursor: not-allowed !important;
}
```

> Ne pas oublier `!important` sur nos attributs css, car nous modifions le style ajouté depuis l'élément HTML en inline depuis une classe (priorité : `!important` > style (inline) > classe).

```HTML
<button
  @click="addToCart"
  :style="styles.roundButton"
  :disabled="stock <= 0"
  :class="{ disabledButton: stock <= 0 }"
>
  Ajouter au panier
</button>
```

> Il est possible d'utiliser l'attribut `class` et `:class` sur le même élément HTML, les classes vont être fusionnées

## Opérateur ternaire [ ? : ]

Il est également possible d'effectuer des opérations ternaires. Modifions le style du texte indiquant combien d'articles se trouvent dans le panier.

```html
<div :class="[cart > 0 ? 'cartFilled' : '']">Panier({{ cart }})</div>
```

```css
.cartFilled {
  color: rgb(17, 100, 0);
}
```

## Challenge

Changer l'opacité de l'image principale à l'aide d'une classe et lorsqu'il n'y a plus de stock.

# 8. Computed Properties

Vue permet de créer des propriétés calculées.

## Cache

Cela présente des avantages, comme le fait que les propriétés calculées soient mises en cache. Cela veut dire que la propriété est "calculée" une seule fois et ensuite simplement réutilisée (optimisation de la part de Vue), si un élément de cette propriété à changer alors la propriété est calculée à nouveau puis remise en cache.

## Exemple simple avec le titre

Afin de tester cette nouvelle notion, nous allons couper le contenu de notre variable `title` en 2 dans data.

```js
action:  'Achat de café',
brand:  'Nespresso',
```

Mais nous souhaitons continuer d'utiliser la var `title` dans le HTML afin de pouvoir utiliser title, action ou brand quand cela est nécessaire.
Nous allons donc créer une propriété calculée et pour se faire il faut ajouter le terme `computed` au même niveau que data et methods dans le JS.
Ensuite nous pouvons créer notre propriété calculée que nous allons nommer `title` afin que son fonctionnement reste identique ou nous l'avions utilisé précédemment.

```js
data() { ... },
methods: { ... },
computed: {
  title() {
    return this.action + ' ' + this.brand
  }
}
```

## Amélioration du carrousel ici

Maintenant nous allons simplifier et mettre à profit notre apprentissage des propriétés.
Supprimons la var `image = 'url'` dans data et remplaçons la par `selectedImage = 0` qui sera un index pointant sur l'image actuellement sélectionnée de notre carrousel.

Ensuite, modifions l'appel de la méthode pour mettre cette variable à jour. D'abord, dans la boucle `for` du carrousel ajoutons un index comme ceci `v-for="(carouselImage, index) in carouselImages"`. Puis l'appel à la méthode `@mouseover="updateSelectedImage(index)"` et la méthode dans le JS `updateSelectedImage(index) { this.selectedImage = index }`.
Et pour finir créons une nouvelle propriété calculée afin de remplacer la variable image d'avant `image() { return this.carouselImages[this.selectedImage].image }`.

## Challenge

Remplacer tous les endroits ou nous avons utilisé `stock <= 0` par une propriété calculée. (Attention aux conditions qui risquent de s'inverser dans certains des cas)

# 9. Components & Props

Les composants sont des éléments très importants à comprendre et à utiliser. Ils permettent de structurer notre projet et dans Vue particulièrement ils ont de nombreux avantages. Le plus évident est le fait qu'ils permettent de mieux structurer notre projet et de regrouper le HTML, le CSS et le JS relatif à un composant dans un même fichier.

## Premier composant

Nous allons maintenant créer notre premier composant nommé `ProductDisplay.js` dans `main.js`.

> Pour l'instant nous allons écrire ce composant dans le fichier `main.js` et utiliser l'extension `es6-string-html` pour VSCode que nous avons téléchargé au début, car cela nous permet de comprendre les bases de ce qu'est un composant, mais c'est une méthode temporaire. Cela nous permet d'utiliser la notion de composant sans trop modifier la structure de notre projet actuel.

Créons la structure de base de ce composant
Il faut ajouter un nouveau composant à notre `app` Vue, créée dans `main.js`, puis lui ajouter la section `template` qui contiendra le HTML et les sections `data()`, `methods` et `computed` comme dans `main.js`.

> L'extension `es6-string-html` permet de mettre `/*HTML*/` juste en dessous de `template` et permet ainsi d'avoir la couleur syntaxique pour notre HTML, plus cool à lire :)

```js
const app = Vue.createApp({
  ...
});

app.component('product-display', {
  template:
  /*html*/
  `
  `,
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  }
});
```

Il faut ensuite copier l'HTML qui est en lien direct avec ce composant et qui se trouve pour l'instant dans le fichier `index.html` (tout prendre sauf titre et panier).

Puis copier le JS qui est en lien direct avec ce composant et qui se trouve pour l'instant dans le fichier `main.js` (tout prendre sauf se qui est en lien avec le titre et le panier : `action`, `brand`, `url`, `cart`, `title()`).

Nous pouvons maintenant utiliser notre composant dans le HTML comme une nouvelle balise. Ajoutons notre composant sous le titre, comme avant.

```html
<product-display></product-display>
```

Pour montrer la puissance de Vue, on peut juste essayer de copier-coller plusieurs fois cet élément dans la page.

## Les PROPS

Ajoutons maintenant une nouvelle fonctionnalité afin de tester les props des composants. Nous voulons savoir si l'utilisateur est premium et effectuer quelque chose en fonction de cette valeur.

Dans `main.js` il faut ajouter une var dans data nommée `premium` à `true` ou `false`.

Ensuite il faut l'envoyer au composant depuis le HTML.

```html
<product-display :premium="premium"></product-display>
```

Puis il faut permettre au composant de réceptionner et utiliser cette variable en ajoutant un nouveau terme au côté de template et data dans le fichier JS du composant.

La props peut avoir plusieurs paramètres comme `type`, `required`, `default`, etc.

```js
app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template:
  /*html*/
```

Nous pouvons maintenant créer une propriété calculée `shipping()` dans le composant afin d'utiliser cette prop.

```js
shipping() {
  if (this.premium) {
    return 'Free'
  }

  return 2.99
}
```

Et enfin, utilisons cette propriété calculée dans le composant en dessous des détails.

```HTML
<p>Shipping: {{ shipping }}</p>
```

Maintenant que notre composant fonctionne nous allons lui créer un fichier pour essayer de structure un peu mieux notre projet.
Créer un dossier à la racine nommé `components`, dans ce dossier créer un nouveau fichier nommé `ProductDisplay.js` et déplacer tout le code du composant de `main.js`.
On peut ensuite importer notre composant dans `index.html` sous l'importation de `main.js`.

```html
<script src="./components/ProductDisplay.js"></script>
```

## Challenge

Créer un nouveau composant `product-details` prenant le tableau `details` en tant que prop.

# 10. Communicating Events

Nous avons vu dans le chapitre précédent comment passer de l'information d'un composant "parent" à un composant "enfant". Mais comment faire l'inverse ?

Alors une solution est l'utilisation des events.

Pour illustrer notre exemple, nous allons réparer le bouton "Ajouter au panier" que nous avions cassé dans le chapitre précédent.

## Envoyer

Commençons en allant dans `ProductDisplay.js` en modifiant le contenu de la méthode `addToCart()` par le code suivant qui permet d'envoyer un événement que nous allons ensuite réceptionner.

```js
this.$emit('add-to-cart');
```

Il faut aussi indiquer le nouveau emit en haut du composant après `props`.

```js
emits: ['add-to-cart'],
```

## Recevoir

Il nous faut donc réceptionner l'événement en ajoutant une directive `v-on` ou `@` à notre déclaration de `product-display` dans `index.html`.

`@add-to-cart` peu donc, effectuez quelque chose une fois l'événement réceptionné et dans notre cas nous allons appeler une méthode `updateCart` dans `main.js` qui va incrémenter `cart` à chaque clique.

```js
updateCart() {
  this.cart += 1
}
```

```html
<product-display :premium="premium" @add-to-cart="updateCart"></product-display>
```

## Ajoutons des paramètres

Il est également possible d'envoyer des paramètres au travers d'événement, modifions un peu notre code pour que le bouton ajouter nous envoyer l'index de l'image au moment de l'ajout de l'utilisateur. Cela nous permettra de savoir quand l'utilisateur a appuyé sur le bouton et ainsi d'en connaître l'image décisive.

Il faut tout d'abord modifier notre var `cart` dans data pour accepter plusieurs entrés en le transformant en tableau.

```js
cart: [];
```

Puis envoyer la valeur à l'aide du `emit` et modifier un peu la méthode de réception.

```js
this.$emit('add-to-cart', this.carouselImages[this.selectedImage].id);
```

```js
updateCart(id) {
  this.cart.push(id)
}
```

Maintenant nous avons un panier qui contient la liste des index des images affichées au moment du clic. Nous souhaitons retrouver le fonctionnement d'avant ou nous avions le nombre d'éléments dans le panier, pour cela il suffit d'ajouter `.length` aux endroits ou nous utilisons `cart`.

## Challenge

Ajouter un nouveau bouton à `product-display` permettant de supprimer des objets du panier.

# 11. Forms & V-model

Maintenant nous nous attaquons à la dernière partie.

## Bootstrap c'est délicieux pour les yeux

Pour cette partie nous allons utiliser Bootstrap, histoire d'éviter que nos formulaires soient absolument immondes et illisibles :)

Nous allons changer légèrement le `index.html`.

```html
<body>
  <div id="app">
    <div class="container">
      <div class="row"></div>
    </div>
  </div>
</body>
```

Et ajouter la classe `col-8` au titre, `col-4` au panier et `col-12` sur un `div` entourant `product-display`.

## Création d'un composant formulaire

Nous allons maintenant créer un nouveau composant `review-form` à partir du modèle suivant.

```js
app.component("review-form", {
  template:
    /*html*/
    `
  <form>
    <h3>Laissez un message</h3>
  
    <div class="form-group">
      <label for="name">Nom</label>
      <input id="name" class="form-control">
    </div>

    <div class="form-group">
      <label for="review">Message</label>    
      <textarea id="review" class="form-control"></textarea>
    </div>

    <div class="form-group">
      <label for="rating">Note</label>
      <select id="rating" class="form-control">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>

    <input class="btn btn-primary mb-5" type="submit" value="Envoyer">
  </form>
  `,
  data() {
    return {};
  },
  methods: {},
});
```

Ajoutons maintenant 3 var qui stockeront les valeurs des champs de notre formulaire.

```js
name: '',
review: '',
rating: null
```

## v-model

Nous allons ensuite utiliser une nouvelle directive nommée `v-model` qui permet de faire des modifications bidirectionnelles (si l'utilisateur modifie le champ relié à la var, la var est update et si la var est update, le champ est update également). Contrairement à `v-bind`, qui permet uniquement d'update le DOM à partir des changements effectués sur une var ou une prop.

Ajouter la directive `v-model` à l'input, aux textarea et au select (.number pour le select est un modificateur ou "modifier" qui permet d'effectuer directement des modifications sur la valeur reçue, ici .number convertit l'entrée en float).

```html
<input id="name" class="form-control" v-model="name" />

<textarea id="review" class="form-control" v-model="review"></textarea>

<select id="rating" class="form-control" v-model.number="rating"></select>
```

## Envoyer

Afin d'envoyer le formulaire, nous allons utiliser la directive `@` afin d'écouter l'événement d’envoi du formulaire (.prevent permet d'annuler le rafraîchissement automatique du navigateur).

```html
<form @submit.prevent="onSubmit"></form>
```

Il faut créer la méthode `onSubmit`.

```js
onSubmit() {
  let productReview = {
    name: this.name,
    review: this.review,
    rating: this.rating
  }
  this.$emit('review-submitted', productReview)

  this.name = ''
  this.review = ''
  this.rating = ''
}
```

Et indiquer le nouveau emit après props.

```js
emits: ['review-submitted'],
```

## Recevoir

Importons le composant dans `index.html` et utilisons-le dans `product-display`. On peut directement ajouter la directive `@` permettant de récupérer l'objet envoyé par le formulaire. (Ajouter un peu de bootstrap aussi)

```html
<div class="col-6 offset-3">
  <review-form @review-submitted="addReview"></review-form>
</div>
```

Maintenant, ajouter un tableau qui stockera nos messages dans data du composant `product-display`.

```js
reviews: [],
```

Et une méthode qui remplit le tableau.

```js
addReview(review) {
  this.reviews.push(review)
}
```

## Afficher les messages reçus dans un nouveau form

On peut maintenant créer un nouveau composant `review-list` capable d'afficher les messages à partir de ce modèle.

```js
app.component("review-list", {
  props: {},
  template:
    /*html*/
    `
  <h3>Messages :</h3>

  <div class=",card mb-3">
    <h5 class="card-header">
    </h5>

    <div class=",card-body">
      <p class=",card-text">
      </p>
    </div>
  </div>
  `,
});
```

Il faut créer une prop qui réceptionnera nos messages.

```js
reviews: {
  type: Array,
  required: true
}
```

Ensuite on itère sur tous les éléments du tableau au bon endroit dans le composant et on affiche les valeurs contenues dans chaque élément.

```HTML
<h3>Messages :</h3>

<div class=",card mb-3" v-for="(review, index) in reviews" :key="index">
  <h5 class="card-header">
    {{ review.name }} à noté ça {{ review.rating }} étoiles
  </h5>

  <div class=",card-body">
    <p class=",card-text">{{ review.review }}</p>
  </div>
</div>
```

Ajouter un `v-if` sur le composant afin de l'afficher uniquement si au moins une review a été réalisée.

## Challenge

Ajouter une question à `review-form` : "Recommanderiez-vous ce café ?". Enregistrer et émettre la réponse, et l'afficher dans `review-list`.

# 12. Conclusion

Nous avons maintenant compris comment fonctionnent tous les concepts principaux de Vue.js et sommes prêts à voir la suite !

Cette application nous à permit de comprendre les concepts de Vue.js, en principe lorsque l'on décide de créer une application Vue on ne le fait pas de cette façon. Pour commencer on utilise npm, l'utilisation du CDN est pratique pour simplifier les premières étapes, mais n'est pas recommander dans une "vraie" application.

Également la manière de créer les composants et l'architecture générale de ce projet n'est pas bonne. Cette structure et la manière dont ce projet est organisé permettent simplement de se concentrer sur les concepts fondamentaux de Vue.js, sans se préoccuper de la structure, etc.

Le site de Vue expose toutes les possibilités d'installation et les explique : https://v3.vuejs.org/guide/installation.html.

Vue.js peut être utilisé de plusieurs manières. Seul pour gérer toute l'application (avec Vue Router, VueX, etc.) ou en combinaison avec un autre Framework. Dans ce deuxième cas de figure Vue s'occuperont de la partie FrontEnd et l'autre Framework du BackEnd.

Dans la prochaine étape, nous allons voir une des possibilités d'utiliser Vue dans son projet. Nous allons utiliser au maximum le plein potentiel de Vue dans cette deuxième étape en créant et en utilisant Vue pour réaliser se qu'il sait faire de mieux; une SPA (Single Page Application).

Nous aurons donc Vue.js pour le FrontEnd et Laravel pour le BackEnd

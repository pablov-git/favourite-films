<script setup>
import { ref, computed } from "vue";
import imagenPG from "../assets/Calf-tp.svg.png";
import imagenG from "../assets/Calf-7.svg.png";
import imagenPG13 from "../assets/Calf-13.svg.png";
import imagenR from "../assets/Calf-18.svg.png";
import FavouriteComponent from "./FavouriteComponent.vue";
import { useTheme } from "vuetify";

//const esFavorita = ref(false);

const tema = useTheme();

const bordeColor = computed(() =>
  tema.global.current.value.dark ? "white" : "black"
);

const emit = defineEmits(["addToFavourites"]);

const dialog = ref(false);

const props = defineProps({
  peli: Object,
  esFavorita: Boolean,
});

console.log(props.peli, props.esFavorita);

const imagenClasificacion = ref("");
if (props.peli.calificacionPorEdad === "G") {
  imagenClasificacion.value = imagenG;
}
if (props.peli.calificacionPorEdad === "PG") {
  imagenClasificacion.value = imagenPG;
}
if (props.peli.calificacionPorEdad === "PG-13") {
  imagenClasificacion.value = imagenPG13;
}
if (props.peli.calificacionPorEdad === "R") {
  imagenClasificacion.value = imagenR;
}

function mostrarAlerta() {
  dialog.value = true;
}

function cambiarFavorito() {
  //esFavorita.value = !esFavorita.value;
  emit("addToFavourites", props.peli);
}
</script>

<template>
  <v-card
    width="200"
    class="mx-auto bg-card"
    :class="tema.global.current.value.dark ? 'borde-blanco' : 'borde-negro'"
  >
    <v-img :src="peli.portada" height="300px" cover></v-img>

    <v-card-title>{{ peli.nombre }}</v-card-title>

    <v-card-text>
      <v-img
        :src="imagenClasificacion"
        height="40"
        contain
        class="mb-2 mx-auto"
      />
      <p class="text-center">Clasificación: {{ peli.calificacionPorEdad }}</p>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn class="bg-grey-lighten-3" @click="mostrarAlerta">Ver más</v-btn>
      <v-btn class="ma-2" @click="cambiarFavorito">
        <VIcon size="32" :color="esFavorita ? 'red' : 'black'">mdi-heart</VIcon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="dialog" max-width="400px" scrim="true">
    <v-card class="bg-card">
      <v-img :src="peli.portada" height="300px" cover></v-img>

      <v-card-title class="text-h6 text-center w-100">{{
        peli.nombre
      }}</v-card-title>

      <v-card-text class="text-center">
        <v-img
          :src="imagenClasificacion"
          height="40"
          contain
          class="mb-2 mx-auto"
        />
        <p>Clasificación: {{ peli.calificacionPorEdad }}</p>
        <p class="mt-4 px-2">{{ peli.sinopsis }}</p>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.v-overlay__scrim {
  background-color: rgba(
    0,
    0,
    0,
    1
  ) !important; /* Cambia el 0.3 a la opacidad que quieras */
}

.borde-negro {
  border: 3px solid black !important;
}

.borde-blanco {
  border: 3px solid white !important;
}
</style>

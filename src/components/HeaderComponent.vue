<script setup>
import FavouriteComponent from "./FavouriteComponent.vue";
import { useTheme } from "vuetify";
import { computed } from "vue";

const props = defineProps({
  cantidadFavoritos: Number,
  favoritos: Array,
});
console.log(props.cantidadFavoritos);

const tema = useTheme();
const esTemaOscuro = computed(() => tema.global.name.value === "dark");

const temaGuardado = localStorage.getItem("tema");
if (temaGuardado) {
  tema.global.name.value = temaGuardado;
}

function cambiarTema() {
  const temaActual = tema.global.name.value;

  if (temaActual === "light") {
    tema.global.name.value = "dark";
  } else {
    tema.global.name.value = "light";
  }

  localStorage.setItem("tema", tema.global.name.value);
}
</script>

<template>
  <header class="d-flex align-center justify-space-between px-12 ml-16">
    <h1
      class="flex-grow-1 text-center"
      :class="esTemaOscuro ? 'text-white' : 'text-grey-darken-4'"
    >
      Películas
    </h1>
    <div class="acciones-header mr-16 mt-2">
      <VBtn icon @click="cambiarTema" variant="text">
        <VIcon
          :icon="
            esTemaOscuro
              ? 'mdi-white-balance-sunny'
              : 'mdi-moon-waning-crescent'
          "
          :color="esTemaOscuro ? 'yellow' : 'grey-darken-3'"
          size="32"
        />
      </VBtn>
      <FavouriteComponent
        :cantidad="cantidadFavoritos"
        :favoritos="favoritos"
      />
    </div>
  </header>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
}

.acciones-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
</style>

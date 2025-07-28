<script setup>
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const drawer = ref(false);

const props = defineProps({
  cantidad: Number,
  favoritos: Array,
});

const tema = useTheme();

const esTemaOscuro = computed(() => tema.global.name.value === "dark");

const emit = defineEmits(["eliminarFavoritos"]);

function borrarFavoritos() {
  emit("eliminarFavoritos");
}
</script>

<template>
  <div
    class="favorito d-flex align-center"
    style="cursor: pointer"
    @click="drawer = true"
  >
    <span class="text-red mr-2">
      <VIcon size="32" color="red">mdi-heart</VIcon>
    </span>
    <span
      :class="[esTemaOscuro ? 'text-white' : 'text-grey-darken-4', 'text-h5']"
    >
      {{ cantidad }}
    </span>
  </div>

  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    location="right"
    width="350"
    :class="esTemaOscuro ? 'bg-dark' : 'bg-light'"
  >
    <v-list>
      <v-list-item class="px-4 py-3">
        <v-list-item-title class="text-h6 font-weight-bold">
          <span class="text-red mr-2"
            ><VIcon size="32" color="red">mdi-heart</VIcon></span
          >
          Tus Favoritos ({{ cantidad }})
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="favorite in favoritos"
        :key="favorite.id"
        class="mb-2"
      >
        <v-list-item-title>{{ favorite.nombre }}</v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-4">
        <v-btn block color="red-darken-2" @click="borrarFavoritos">
          Eliminar todos los favoritos
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
  .bg-dark {
    background-color: #242424;
  }
  .bg-light {
    background-color: #fefae0;
  }
</style>

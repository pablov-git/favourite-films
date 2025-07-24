<script setup>
import { ref, computed } from "vue";
import MovieCard from "./components/MovieCard.vue";
import HeaderComponent from "./components/HeaderComponent.vue";

const favoritos = ref([]);

const favoritosGuardados = localStorage.getItem("favoritos");
if (favoritosGuardados) {
  favoritos.value = JSON.parse(favoritosGuardados);
  console.log(favoritos.value);
}

// Después de la flecha se puede agregar lógica como un ternario, un switch, etc.
const computadaFavoritos = computed(() => favoritos.value.length);

function agregarAFavoritos(objeto) {
  const yaExiste = favoritos.value.some((fav) => fav.id === objeto.id);
  if (yaExiste) {
    favoritos.value = favoritos.value.filter((fav) => fav.id !== objeto.id);
  } else {
    favoritos.value.push(objeto);
  }
  console.log(favoritos.value);

  localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
}

const peliculas = ref([
  {
    portada:
      "https://placehold.co/200x300/A9D18E/FFFFFF?text=Portada+Pelicula+1", // Placeholder de 200px de ancho
    nombre: "El Misterio del Faro",
    calificacionPorEdad: "PG-13", // Para mayores de 13 años
    sinopsis:
      "Un grupo de amigos descubre secretos antiguos en un faro abandonado",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/B0E0E6/FFFFFF?text=Portada+Pelicula+2", // Placeholder de 200px de ancho
    nombre: "Aventura en el Espacio",
    calificacionPorEdad: "G", // Apta para todo público
    sinopsis:
      "Una expedición espacial llena de emocionantes descubrimientos y una inesperada amistad entre especies galácticas",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/FFD700/FFFFFF?text=Portada+Pelicula+3", // Placeholder de 200px de ancho
    nombre: "La Leyenda del Samurai",
    calificacionPorEdad: "R", // Restringida (Solo para mayores de 17 con acompañante)
    sinopsis:
      "En un Japón feudal, un samurái busca justicia mientras enfrenta sus propios demonios y una guerra inminente",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/DDA0DD/FFFFFF?text=Portada+Pelicula+4", // Placeholder de 200px de ancho
    nombre: "Sueños de Verano",
    calificacionPorEdad: "PG", // Sugiere orientación parental
    sinopsis:
      "Una historia entrañable sobre amistad, primeros amores y los sueños que marcan el verano de la juventud",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/ADD8E6/FFFFFF?text=Portada+Pelicula+5", // Placeholder de 200px de ancho
    nombre: "Crónicas del Tiempo",
    calificacionPorEdad: "PG-13",
    sinopsis:
      "Viajes temporales y misterios se entrelazan en esta aventura donde el pasado y futuro dependen de un héroe inesperado",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/90EE90/FFFFFF?text=Portada+Pelicula+6", // Placeholder de 200px de ancho
    nombre: "El Último Hechizo",
    calificacionPorEdad: "G",
    sinopsis:
      "En un mundo mágico, un joven aprendiz debe dominar su último hechizo para salvar a su pueblo de la oscuridad",
    id: crypto.randomUUID(),
  },
  {
    portada:
      "https://placehold.co/200x300/F08080/FFFFFF?text=Portada+Pelicula+7", // Placeholder de 200px de ancho
    nombre: "Noche de Sombras",
    calificacionPorEdad: "R",
    sinopsis:
      "Un thriller psicológico donde secretos oscuros salen a la luz durante una noche que cambiará todo para sus protagonistas",
    id: crypto.randomUUID(),
  },
]);

const edad = 17;
function esApta(pelicula, edadUsuario) {
  if (edadUsuario >= 17) {
    return true; // Puede ver cualquier película
  } else if (edadUsuario >= 13) {
    // Solo puede ver G, PG y PG-13
    return (
      pelicula.calificacionPorEdad === "G" ||
      pelicula.calificacionPorEdad === "PG" ||
      pelicula.calificacionPorEdad === "PG-13"
    );
  } else {
    // Solo puede ver películas G
    return pelicula.calificacionPorEdad === "G";
  }
}
</script>

<template>
  <VApp>
    <div class="centrador">
      <div class="contenedor-principal">
        <HeaderComponent
          class="mb-7 mt-7"
          :cantidadFavoritos="computadaFavoritos"
          :favoritos="favoritos"
        />

        <VMain>
          <section class="contenedor d-flex flex-wrap ga-3 justify-center pa-3">
            <div v-for="pelicula in peliculas" :key="pelicula.id">
              <MovieCard
                v-if="esApta(pelicula, edad)"
                :peli="pelicula"
                :esFavorita="favoritos.some((favorita) => favorita.nombre === pelicula.nombre)"
                @add-to-favourites="agregarAFavoritos"
              />
            </div>
          </section>
        </VMain>
      </div>
    </div>
  </VApp>
</template>

<style>
/* Centramos solo el contenedor */
.centrador {
  display: flex;
  justify-content: center;
  padding: 24px;
}

/* Limitamos el ancho del contenido */
.contenedor-principal {
  max-width: 1280px;
  width: 100%;
}
</style>

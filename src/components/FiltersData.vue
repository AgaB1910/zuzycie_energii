<template>
  <div class="flex flex-row-reverse flex-wrap">
    <div class="card-container">
      <div class="card">
        <div class="flex flex-wrap gap-4">
          <p>Rozdzielczosc danych:</p>
          <div class="flex items-center">
            <RadioButton
              v-model="ingredient"
              inputId="ingredient2"
              name="rozdzielczosc"
              value="Dzien"
            />
            <label for="ingredient2" class="ml-2">Dzien</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="ingredient"
              inputId="ingredient3"
              name="rozdzielczosc"
              value="Tydzien"
            />
            <label for="ingredient3" class="ml-2">Tydzien</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'FiltersData',
  setup() {
    const ingredient = ref<string>('')
    return {
      ingredient
    }
  }
})
</script>

<style scoped>
.card-container {
  display: flex;
  padding: 10px;
}

.card {
  background-color: #acacac;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(51, 50, 50, 0.1);
  padding: 20px;
  margin: 0 15px;
  max-width: 600px;
}

.flex {
  display: flex;
  align-items: center;
}

.p {
  color: #ffffff;
}
</style>

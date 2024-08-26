<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Energia</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/notification">
            <i class="pi pi-bell" style="font-size: 2rem"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #01114e;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
}

header a {
  text-decoration: none;
  color: #eaee20;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  justify-content: flex-start;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #eaee20;
}

h1 {
  margin: 1;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border: 1px solid #eaee20;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

header ul {
  list-style: none;
  display: flex;
}

li {
  margin: 0 0.5rem;
}
</style>

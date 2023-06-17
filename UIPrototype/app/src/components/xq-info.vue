<template>
  <div class="links-container">
    <a class="link" href="#">Social Groups</a>
    <a class="link" href="#">Language Resources</a>
  </div>
</template>

<style scoped>
  .links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #2c3e50;
    padding: 20px;
    border-radius: 10px;
  }

  .link {
    color: #ffffff;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .link:hover {
    color: #0c0a7a;
    text-decoration: underline;
  }
</style>

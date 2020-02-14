<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// reset css
@import url(./assets/reset.css);

// font
@font-face {
  font-family: "Gilroy";
  font-weight: 800;
  src: url("./assets/font/Gilroy-ExtraBold.ttf");
}
@font-face {
  font-family: "Gilroy";
  font-weight: 500;
  src: url("./assets/font/Gilroy-Medium.ttf");
}
@font-face {
  font-family: "Gilroy";
  font-weight: 700;
  src: url("./assets/font/Gilroy-Bold.ttf");
}

#app {
  font-family: 'Gilroy', Helvetica, Arial, sans-serif;
}

</style>

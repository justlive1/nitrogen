<template>
  <div class="dock">
    <div class="dock-container">
      <a class="dock-item">
        <span>finder</span>
        <img src="../../public/images/finder.png" alt="finder"/>
      </a>
      <a class="dock-item">
        <span>launchpad</span>
        <img src="../../public/images/launchpad.png" alt="launchpad"/>
      </a>
      <a class="dock-item">
        <span>gitee</span>
        <img src="../../public/images/gitee.png" alt="gitee"/>
      </a>
      <a class="dock-item">
        <span>github</span>
        <img src="../../public/images/github.png" alt="github"/>
      </a>
      <a class="dock-item">
        <span>blog</span>
        <img src="../../public/images/blog.png" alt="blog"/>
      </a>
      <a class="dock-item">
        <span>book</span>
        <img src="../../public/images/iBooks.png" alt="book"/>
      </a>
      <a class="dock-item">
        <span>maps</span>
        <img src="../../public/images/maps.png" alt="maps"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dock"
  }
</script>

<style scoped>
  .dock {
    width: 100%;
    bottom: 0px;
    position: absolute;
    left: 0px;
    height: 65px;
    text-align: center;
    z-index: 120;
  }

  .dock-container {
    position: relative;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.45);
    width: 440px;
    margin: 0 auto;
  }

  .dock-container a.dock-item {
    display: inline-block;
    font: bold 12px Arial, Helvetica, sans-serif;
    width: 60px;
    height: 60px;
    color: #fff;
    bottom: 0px;
    position: relative;
    text-align: center;
    text-decoration: none;
  }

  .dock-item span {
    display: none;
    position: absolute;
    top: -20px;
    width: 100%;
    text-align: center;
  }

  .dock-item:hover {
    cursor: pointer;
  }

  .dock-item:hover span {
    display: unset;
  }

  .dock-item img {
    border: none;
    width: 100%;
    height: 60px;
  }
</style>
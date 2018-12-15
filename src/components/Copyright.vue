<template>
  <div class="copyright">
    <a target="_blank"
       href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010302000485">
      <img src="images/beian.png">
      <span>粤公网安备 44010302000485号</span>
    </a>
    <br>
    <a href="http://www.miitbeian.gov.cn" target="blank">粤ICP备18059277号-1</a>
  </div>
</template>

<script>
  export default {
    name: "Copyright"
  }
</script>

<style scoped>
  .copyright {
    margin: 5px auto;
    text-align: center;
    font-size: 10px;
    font-weight: 100;
    bottom: 0;
    position: absolute;
    width: 100%;
  }

  .copyright a {
    color: #eaeaea;
    text-decoration: none;
  }

  .copyright img {
    width: 15px;
    height: 15px;
  }
</style>
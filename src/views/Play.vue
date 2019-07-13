<template>
  <div class="view__play">
    <h2>Step through the portal...</h2>

    <p class="play">
      <span>You can log in or create a new character in Astaria by selecting the icon on the right&hellip;</span>
      <span>
        <a href="#"
           @click="openPlayer()">[icon]</a>
      </span>
      <Player :open="playerOpen" />
    </p>

    <p>Or, you can download Astaria's official game program for an enhanced experience:</p>
    <ul>
      <li><a href="http://www.astariamud.com/client/A3client.exe" target="_blank" class="link">Windows (32-bit)</a></li>
      <li><a href="http://www.astariamud.com/client/A3client64.exe" target="_blank" class="link">Windows (64-bit)</a></li>
      <li><a href="http://www.astariamud.com/client/a3client.tar.gz" target="_blank" class="link">Linux</a></li>
      <li><a href="http://www.astariamud.com/client/newmac.php" target="_blank" class="link">macOS</a></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Player.vue'

export default {
  name: 'home',
  components: {
    Player
  },
  created () {
  },
  data: function () {
    return {
      playerOpen: false
    }
  },
  methods: {
    openPlayer: function () {
      this.playerOpen = !this.openPlayer;
    }
  }
}
</script>

<style scoped>
.play {
  padding: 20px 0;
}
</style>
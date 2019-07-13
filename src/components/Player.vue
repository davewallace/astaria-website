<template>
  <div class="player">
    <a href="#" class="button--close" @click.prevent="handleClose">x</a>

    <div class="scroll-container">
      <ScrollPanel
        class="scroll-panel"
        v-html="scrollData"
        scrollToBottom="true"
      />
      <InputText
        class="scroll-input"
        ref="messageInput"
        dynamicRef="messageInput"
        @handleEnter="handleDataSend"
        clearOnSubmit="true"
      />
    </div>

    <div class="status--connected" v-if="connected">Connected</div>
    <div class="status--disconnected" v-else>Disconnected</div>

  </div>
</template>

<script>
import PlayerAPI from '@/api/Player.js'
import InputText from '@/components/InputText'
import ScrollPanel from '@/components/ScrollPanel'

export default {
  name: 'Player',
  components: {
    InputText,
    ScrollPanel
  },
  data: function () {
    return {
      connected: false,
      scrollData: ''
    }
  },
  methods: {

    handleClose () {
      this.$emit('playerClose')
    },

    handlePlayerEvent (event) {
      switch (event.type) {

        case 'connected':
          //console.log('The Player has connected.')
          return;

        case 'disconnected':
          //console.log('The Player has disconnected.')
          return;

        case 'messageReceived':
          //console.log('The Player has received a message:')
          this.scrollData += event.data.message
          return;

        case 'error':
          //console.log('There was an error with the Player WebSocket connection.')
          return;

        default:
          return;
      }
    },

    handleDataSend (data) {

      console.log(data)

      PlayerAPI.send(data.value)
    },

    /**
     * Focus on the main message input
     **/
    focusMessageInput () {
      this.$refs.messageInput.$el.focus();
    }
  },

  created () {

    // we want to do an async check to see if a connection succeeds. if it does,
    // do all sorts of interesting things including;
    //  - connect our Player's <ScrollPanel /> component to the data API to
    //    receive data.
    //  - send data from a form input component, or other UI components to issue
    //    vommands back through the API.
    //  - maintain awareness of the connection status and respond accordingly

    PlayerAPI.subscribe(this.handlePlayerEvent)
    PlayerAPI.connect()
  },

  mounted () {
    this.focusMessageInput()
  },

  updated () {
    //var elem = this.$el
    //elem.scrollTop = elem.clientHeight;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only

     WOW. Noted that scoped is inherited by child elements who share the same
     className. This doesn't eliminate clashes. There's no way to stop this - super dumb.
-->
<style scoped>
  .player {
    position: fixed;
    top: 20px;
    left: 20px;
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);

    border: 1px dashed #444;
    background: black;
    padding: 1rem;
  }

  .button--close {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px dashed red;
  }

  .status--connected,
  .status--disconnected {
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 16px;
    height: 16px;
  }
  .status--connected {
    background: green;
  }
  .status--disconnected {
    background: red;
  }
  .scroll-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
  }
    .scroll-panel {
      flex-grow: 1;
      border: 1px dashed pink;
    }
    .scroll-input {
      border: 1px dashed turquoise;
    }
</style>

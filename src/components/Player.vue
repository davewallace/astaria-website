<template>
  <div class="player">
    <a href="#" class="button--close" @click.prevent="handleClose">x</a>

    <div class="flex-stack">
      <div class="flex-stack-grow">
        <ScrollPanel
          :data="scrollData"
        />
      </div>
      <div class="flex-stack-auto">

        <!--
          I can't believe I'm doing this, but because the Chromium team refuse to
          allow disabling of autocomplete with the browser password manager on
          password fields, our usable and safe approach to switch between text and
          password types on this main message box cannot be used. Using a password
          field causes more issues that it solves.

          The original Astaria gmud clients don't protect password entry anyway,
          so I'm turning it off for this app too. Disappointing, sorry users.

          Lots of development attempts and backlash to fix the problem:
          https://gist.github.com/niksumeiko/360164708c3b326bd1c8

          Chromium threads:
          https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164
          https://bugs.chromium.org/p/chromium/issues/detail?id=587466
        -->
        <InputText
          class="scroll-input"
          ref="messageInput"
          clearOnSubmit=true
          autocomplete="do-not-disturb"
          @handleEnter="handleDataSend"
        />
        <!--
          :inputType="messageBoxInputType"
        />
        -->

      </div>
    </div>

    <div class="status status--connected" v-if="connected === 2">Connected</div>
    <div class="status status--connecting" v-else-if="connected === 1">Connecting</div>
    <div class="status status--disconnected" v-else>Disconnected</div>

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
      connected: 0,
      scrollData: '',
      //messageBoxInputType: 'text',
    }
  },
  methods: {

    handleClose () {
      this.$emit('playerClose')
    },

    handlePlayerEvent (event) {

      switch (event.type) {

        case 'connecting':
          console.log('The Player is connecting.')
          this.connected = 1
          return;

        case 'connected':
          console.log('The Player has connected.')
          this.connected = 2
          return;

        case 'disconnected':
          console.log('The Player has disconnected.')
          this.connected = 0
          return;

        case 'messageReceived':

          console.log('message received')
          this.scrollData += event.data.message

          // check if we're in password input mode. see function definition for
          // comment on this message checking's unreliability. better than nothing
          // though?
          // ugh, it's also super inefficient - thi is run for every single
          // received message... this should be moved into a user config option
          // to improve perf versus offer slight security protection

          // COMMENTING OUT ON PURPOSE - Chrome autofill nonsense causing too
          // many issues
          //this.checkForPasswordInput(event.data.message)

          return;

        case 'error':
          //console.log('There was an error with the Player WebSocket connection.')
          return;

        default:
          return;
      }
    },

    handleDataSend (data) {
      PlayerAPI.send(data.value)
    },

    /**
     *
     *
    checkForPasswordInput (message) {

      // the extra space is another weak check, might as well put it in there to
      // help narrow down possibility of not switching back to input type text..
      if (message.includes('Speak thy word of passage: ')) {
        this.messageBoxInputType = 'password';
      }

      if (message.includes('Reconnected.') ||
          message.includes('You regain consciousness.') ||
          message.includes('Adventurer\'s Guild Hall for news and important updates!')) {
        this.messageBoxInputType = 'text';
      }
    }
    */
  },

  created () {

    // Receives all events from PlayerAPI and handles each eventType
    PlayerAPI.subscribe(this.handlePlayerEvent)

    // Initial connection to PlayerAPI (PHUD WebSocket server)
    PlayerAPI.connect()
  },

  mounted () {
    // focus the main message input
    this.$refs.messageInput.$el.focus();
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

  .status {
    position: absolute;
    bottom: 100px;
    right: 100px;
    display: block;
    width: 32px;
    height: 32px;
  }
  .status--connecting {
    background: orange;
  }
  .status--connected {
    background: green;
  }
  .status--disconnected {
    background: red;
  }

  .scroll-input {
    width: 100%;
  }

  .flex-stack {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
  }
    .flex-stack-grow {
      flex-grow: 1;
      border: 1px dashed green;
      max-height: calc(100% - 40px);
    }
    .flex-stack-auto {
      border: 1px dashed turquoise;
    }
</style>

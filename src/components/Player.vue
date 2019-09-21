<template>
  <div class="player">

    <div class="grid-1d grid-1d--vertical">
      <div class="grid-1d-cell grid-1d-cell--auto">

        <div class="grid-1d grid-1d--horizontal">
          <div class="grid-1d-cell grid-1d-cell--auto connection-buttons">

            <!-- Connection status indicator -->
            <div class="status status--connected" v-if="connected === 2">
              <span class="visually-hidden">Connected</span>
            </div>
            <div class="status status--connecting" v-else-if="connected === 1">
              <span class="visually-hidden">Connecting</span>
            </div>
            <div class="status status--disconnected" v-else>
              <span class="visually-hidden">Disconnected</span>
            </div>

            <!-- Connection toggle -->
            <a href="#" class="button--icon button--disconnect" @click="disconnect()" v-if="connected === 2">
              &#128268; <!-- plug emoji -->
              <span class="visually-hidden">Disconnect</span>
            </a>
            <a href="#" class="button--icon button--connect" @click="connect()" v-else-if="connected === 0">
              &#128268; <!-- plug emoji -->
              <span class="visually-hidden">Reconnect</span>
            </a>

          </div>
          <div class="grid-1d-cell grid-1d-cell--grow">

            <!-- Close button -->
            <a href="#" class="button--icon button--close" @click.prevent="handleClose">
              &#10060; <!-- cross emoji -->
              <span class="visually-hidden">Close Player</span>
            </a>

          </div>
        </div>
      </div>

      <div class="grid-1d-cell grid-1d-cell--grow message-output">

        <!-- Message output container -->
        <ScrollPanel
          :data="scrollPanelData"
          @scrollPanelUpdate="handleScrollPanelUpdate"
        />
      </div>
      <div class="grid-1d-cell grid-1d-cell--auto message-input">

        <!-- Message input container -->
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
      scrollPanelData: '',
      //messageBoxInputType: 'text',
    }
  },
  methods: {

    connect () {
      PlayerAPI.connect()
    },

    disconnect () {
      PlayerAPI.disconnect()
    },

    handleClose () {
      this.$emit('playerClose')
    },

    handlePlayerEvent (event) {

      switch (event.type) {

        case 'connecting':
          //console.log('The Player is connecting.')
          this.connected = 1
          return

        case 'connected':
          //console.log('The Player has connected.')
          this.connected = 2
          return

        case 'disconnected':
          //console.log('The Player has disconnected.')
          this.connected = 0
          return

        case 'messageReceived':

          // check if we're in password input mode. see function definition for
          // comment on this message checking's unreliability. better than nothing
          // though?
          // ugh, it's also super inefficient - thi is run for every single
          // received message... this should be moved into a user config option
          // to improve perf versus offer slight security protection

          // COMMENTING OUT ON PURPOSE - Chrome autofill nonsense causing too
          // many issues
          //this.checkForPasswordInput(event.data.message)

          // check if the main Astaria message is coming through, wrap it in a
          // <pre /> tag to preserve all whitespace (its an ASCII graphic)
          if (event.data.message === 'Connected!') {
            event.data.message += '<pre>';
          }
          if (event.data.message === 'The Kingdom of Astaria') {
            event.data.message = '</pre>' + event.data.message;
          }

          //console.log('message received')
          this.scrollPanelData += event.data.message

          return

        case 'error':
          //console.log('There was an error with the Player WebSocket connection.')
          return;

        default:
          return
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

    handleScrollPanelUpdate (event) {
      console.log('ScrollPanel updated.')
      this.$refs.messageInput.$el.focus()
      // debugger;
    }

  },

  created () {

    // Receives all events from PlayerAPI and handles each eventType
    PlayerAPI.subscribe(this.handlePlayerEvent)

    // Initial connection to PlayerAPI (PHUD WebSocket server)
    //this.connect()
  },

  mounted () {
    // focus the main message input
    this.$refs.messageInput.$el.focus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only

     WOW. Noted that scoped is inherited by child elements who share the same
     className. This doesn't eliminate clashes. There's no way to stop this - super dumb.
-->
<style scoped>

  /**
   * Player container
   **/
  .player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 1rem 1.5rem;
    background: black;
  }

  /**
   * Layouts
   **/
  .grid-1d {
    display: flex;
    height: 100%;
    max-height: 100%;
  }
.grid-1d--horizontal {
  flex-direction: row;
}
.grid-1d--vertical {
  flex-direction: column;
}
    .grid-1d-cell {
      border: 1px dotted cyan;
    }
    .grid-1d-cell--grow {
      flex-grow: 1;
    }
    .grid-1d-cell--auto {
      flex-basis: auto;
    }

  /**
   * Generic buttons and icon buttons
   **/
  .button--icon {
    display: block;
    width: 18px;
    height: 18px;
    font-size: 0.85em;
    text-decoration: none;
  }

  /**
   * Player close
   **/
  .button--close {
    float: right;
    filter: brightness(80%);
  }

  /**
   * Connectivity status indicator
   **/
  .connection-buttons {
    position: relative;
    padding-bottom: 5px;
  }
    .status {
      width: 20px;
      height: 20px;
      border-radius: 9px;
    }
    .status--connecting {
      background: orange;
    }
    .status--connected {
      background: #57e457;
    }
    .status--disconnected {
      background: red;
    }
      .button--connect,
      .button--disconnect {
        position: absolute;
        left: 2px;
        top: -2px;
      }

  /**
   * Message output box
   **/
  .message-output {
    max-height: calc(100% - 110px);
    border: 1px solid #444;
  }

  /**
   * Message input box
   **/
  .message-input {
    padding-top: 5px;
  }
    .scroll-input {
      width: 100%;
    }

  /**
   * Utilities
   **/
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>

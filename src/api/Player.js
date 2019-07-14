const config_ip = '13.66.189.79';
//const config_port = 5000;
const config_port = 11895;
const wshost = 'ws://astariamud.com:12346/wm_server/server.php';

let websocketConnection = null;
let connected = false;
let subscribers = [];

let publicAPI = {

	/**
	 * Attempts connection to PHUD server via a WebSocket
	 **/
	connect: function () {
		//console.log('connecting...')
		privateAPI.websocketConnect(privateAPI.websocketOpened)
	},

	/**
	 * Attempts disconnection from PHUD server and terminates WebSocket
	 **/
	disconnect: function () {
		//console.log('disconnecting...')
		// clean up websocket
		privateAPI.disconnected()
	},

	/**
	 * Returns Boolean connection status of WebSocket
	 **/
	isConnected: function () {
		return connected
	},

	/**
	 * Attempt to send a message to the PHUD server
	 **/
	send: function (data) {

		console.log('user input is sending: ');
		console.log(data);

		websocketConnection.send(data);

		return true;
	},

	/**
	 * Subscribes a listener Object to events emitted from this module
	 **/
	subscribe: function (subscriber) {
		subscribers.push(subscriber)
	}
}

let privateAPI = {

	publish: function (eventType, payload) {
		subscribers.forEach(function (subscriber) {
			// an $emit function or equivalent
			subscriber({
				type: eventType,
				data: payload
			})
		});
	},

	/**
	 *
	 **/
	connected: function () {
		connected = true;
		privateAPI.publish('connected', {connectedStatus: publicAPI.isConnected});
	},

	/**
	 *
	 **/
	disconnected: function () {
		connected = false;
		privateAPI.publish('disconnected', {connectedStatus: publicAPI.isConnected});
	},

	/**
	 *
	 **/
	websocketConnect: function (websocketOpenedCallback) {

		websocketConnection = new WebSocket(wshost);

		websocketConnection.onopen = function() {
			websocketOpenedCallback();
		}

		websocketConnection.onmessage = function(evt) {
			privateAPI.handleWebsocketRead(evt.data);
		}

		websocketConnection.onerror = function () {
			privateAPI.publish('error', {connected: publicAPI.isConnected});
		}

		websocketConnection.onclose = function () {
			publicAPI.disconnect();
		}
	},

	/**
	 *
	 **/
	websocketOpened: function () {
		privateAPI.connected()
		privateAPI.sendDirect('PHUD:CONNECT ' + config_ip + ' ' + config_port);
	},

	/**
	 *
	 **/
	handleWebsocketRead: function (s) {

		console.log(s);

		let data = eval('(' + s + ')');

		// Check for ATCP messages
		privateAPI.handle_ATCP(data);

		// Output a standard message
		if (data.message) {

			// extra span tags at the end because the PHUD server sends out unclosed
      // tags as part of its last message...
			let modifiedData = data.message+ '</span></span>'

			privateAPI.publish('messageReceived', {message: modifiedData});
		}

		// // Write a WebMud server status message
		// if (data.server_status) {
		//   ss_Write(data.server_status);
		// }

		// Set the connection status for the MUD
		if (data.conn_status) {
			if (data.conn_status === 'connected') {
				privateAPI.connected()
			} else if (data.conn_status === 'disconnected') {
				privateAPI.disconnected()
			}
		}

		// Set the connection status for the PHudBase-WebMud server (sent by the Flash client) //
		if (data.fconn_status) {
			if (data.fconn_status === 'connected') {
				privateAPI.connected();
			} else if (data.fconn_status === 'disconnected') {
				privateAPI.disconnected();
			}
		}
	},

	/**
	 *
	 **/
	sendDirect: function (data) {
		if (data !== '') {
			websocketConnection.send(data);
			return true;
		} else {
			return false;
		}
	},

	/**
	 * Handles all messages received from PHUD web server
	 **/
	handle_ATCP: function (data) {

		//console.log('ATCP: ')
		//console.log(data)

	/*
		if (data.ATCP_Char_Name) {
		}

		if (data.ATCP_Client_Map) {
		}

		if (data.ATCP_Char_Vitals) {
		}

		if (data.ATCP_Room_Num) {
		}
	*/

		if (data.ATCP_Disconnect) {
			if (data.ATCP_Disconnect === "true") {
				//ow_Write("DISCONNECTED FROM MUD");
				privateAPI.disconnected()
			}
		}
	}
}

export default publicAPI;

/*
function ow_Write (text) {
// var objDiv = window.top.document.getElementById("output");

// objDiv.innerHTML += text;

// trim_ow();

// num_msgs++;

// if (prevent_autoscroll == true) return;

// objDiv.scrollTop = objDiv.scrollHeight;
}
*/
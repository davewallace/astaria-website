const config_ip = '13.66.189.79';
//const config_port = 5000;
const config_port = 11895;
const wshost = 'ws://astariamud.com:12346/wm_server/server.php';
const WebSocketStatusMapping = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']; // more useful than integers for logging

let websocketConnection = null;
let subscribers = [];
let pingInterval = null;
let pingIntervalDelay = 1000;

let publicAPI = {

	/**
	 * Attempts connection to PHUD server via a WebSocket
	 **/
	connect: function () {
		console.log('Connecting...')

		let status = privateAPI.connectionStatus()

		if (status === null ||
				status == WebSocket.CLOSING ||
				status == WebSocket.CLOSED) {

			privateAPI.connect()
			console.log(`PHUD server is ${WebSocketStatusMapping[status]}`)

		} else {
			console.log(`PHUD server is already ${WebSocketStatusMapping[status]}`)
		}
	},

	/**
	 * Attempts disconnection from PHUD server and terminates WebSocket
	 **/
	disconnect: function () {

		let status = privateAPI.connectionStatus()

		console.log(`Disconnecting... (status(${status}) is ${WebSocketStatusMapping[status]})`)

		if (status == null ||
				status == WebSocket.CLOSING ||
				status == WebSocket.CLOSED) {

			console.log(`PHUD server is already ${WebSocketStatusMapping[status]}`)

		} else {
			privateAPI.disconnecting()
		}
	},

	/**
	 * Attempt to send a message to the PHUD server
	 **/
	send: function (data) {

		console.log('user input is sending: ')
		console.log(data)

		websocketConnection.send(data)

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

	/**
	 * Check to see if connected to server
	 **/
	createPing: function () {

		// ensure only one ping at a time
		privateAPI.clearPing()

		//
		pingInterval = window.setInterval(function () {

			console.log('Auto-checking connection...')

			let status = privateAPI.connectionStatus()

			if (status === WebSocket.CLOSED ||
					status === WebSocket.CLOSING) {
				privateAPI.disconnected()
			}

			if (status === WebSocket.OPEN ||
					status === WebSocket.CONNECTING) {
				// do nothing, BAU
			}

		}, pingIntervalDelay);
	},

	/**
	 * Clears a current ping if there is one
	 **/
	clearPing: function () {
		if (pingInterval) {
			window.clearInterval(pingInterval)
		}
	},

	/**
	 *
	 **/
	connectionStatus: function () {
		if (!websocketConnection) {
			return null
		}
		return websocketConnection.readyState
	},

	/**
	 *
	 **/
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
	connect: function () {

		privateAPI.connecting()

		websocketConnection = new WebSocket(wshost);

		websocketConnection.onopen = function() {
			privateAPI.websocketOpened()
		}

		websocketConnection.onmessage = function(evt) {
			console.log('message received by PlayerAPI')
			privateAPI.handleWebsocketRead(evt.data)
		}

		websocketConnection.onerror = function () {
			privateAPI.error()
		}

		websocketConnection.onclose = function () {
			privateAPI.disconnected()
		}
	},

	/**
	 *
	 **/
	connected: function () {
		console.log('Connected.')

		privateAPI.publish('connected', {connectedStatus: privateAPI.connectionStatus})

		// check the WebSocket connectivity and the PHUD connection status
		console.log('Starting connection auto-checker...')
		privateAPI.createPing()
	},

	/**
	 *
	 **/
	connecting: function () {
		privateAPI.publish('connecting', {connectedStatus: privateAPI.connectionStatus})
	},

	/**
	 *
	 **/
	disconnect: function () {
		websocketConnection.close(1000, 'Connection terminated by Client Application.')

		// clear the WebSocket connectivity status checker
		privateAPI.clearPing()
	},

	/**
	 *
	 **/
	disconnecting: function () {
		privateAPI.publish('disconnecting', {connectedStatus: privateAPI.connectionStatus})
		privateAPI.disconnect()
	},

	/**
	 *
	 **/
	disconnected: function () {
		console.log('Disconnected.')

		privateAPI.publish('disconnected', {connectedStatus: privateAPI.connectionStatus})
	},

	/**
	 *
	 **/
	error: function () {
		privateAPI.publish('error', {connectedStatus: privateAPI.connectionStatus})
	},

	/**
	 *
	 **/
	websocketOpened: function () {
		privateAPI.sendDirect('PHUD:CONNECT ' + config_ip + ' ' + config_port)
	},

	/**
	 *
	 **/
	handleWebsocketRead: function (s) {

		//console.log(s)

		//let data = eval('(' + s + ')');
		let data = JSON.parse(s);

		// Check for ATCP messages
		privateAPI.handle_ATCP(data)

		// Output a standard message
		if (data.message) {

			// extra span tags at the end because the PHUD server sends out unclosed
			// tags as part of its last message...
			// TODO: naah this doesn't work. Some inconsistent nested span strings
			// being received. needs fixing on server I think.
			let modifiedData = data.message + '</span>' + '</span>'

			privateAPI.publish('messageReceived', {message: modifiedData})
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
				privateAPI.disconnecting()
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
			if (data.ATCP_Disconnect === 'true') {
				privateAPI.disconnected()
			}
		}
	}
}

export default publicAPI;

'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class SmartPlug_SO0x extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register capabilities for this device
		this.registerCapability('onoff', 'BASIC');
		this.registerCapability('meter_power', 'METER');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('measure_current', 'METER');
		this.registerCapability('measure_voltage', 'METER');

	}
}

module.exports = SmartPlug_SO0x;

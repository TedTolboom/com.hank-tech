'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DoorWindowSensor_DWS01 extends ZwaveDevice {
	onMeshInit() {
		// enable debugging
		// this.enableDebug();

		// print the node's info to the console
		// this.printNode();

		this.registerCapability('alarm_contact', 'NOTIFICATION');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
		// this.registerCapability('alarm_battery', 'METER');
		this.registerCapability('measure_battery', 'BATTERY');

		// register a settings parser
		this.registerSetting('BASIC_SET_command', value => {
			return new Buffer([value])
		});
		this.registerSetting('BASIC_SET_reversed', value => {
			return new Buffer([value])
		});
		this.registerSetting('low_battery', value => {
			return new Buffer([value])
		});
	}
}

module.exports = DoorWindowSensor_DWS01;

'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FloodSensor_FLD01 extends ZwaveDevice {
	onMeshInit() {
		// enable debugging
		// this.enableDebug();

		// print the node's info to the console
		// this.printNode();

		// register device capabilities
		this.registerCapability('alarm_water', 'NOTIFICATION');
		this.registerCapability('alarm_heat', 'NOTIFICATION');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');

		// register a settings parser
		this.registerSetting('temperature_alarm_high', value => value * 10);
		this.registerSetting('temperature_alarm_low', value => value * 10);
	}
}

module.exports = FloodSensor_FLD01;

'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class MultiSensor_MS01 extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		// this.enableDebug();

		// print the node's info to the console
		// this.printNode();

		// register capabilities
		this.registerCapability('alarm_motion', 'NOTIFICATION');
		this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL');
		this.registerCapability('alarm_tamper', 'SENSOR_MULTILEVEL');
		// this.registerCapability('alarm_battery', 'METER');
		this.registerCapability('measure_battery', 'BATTERY');

		// register a settings parser
		// this.registerSetting('always_on', value => {
		// 	return new Buffer([ (value === true) ? 0 : 1 ])
		// });

	}

}

module.exports = MultiSensor_MS01;

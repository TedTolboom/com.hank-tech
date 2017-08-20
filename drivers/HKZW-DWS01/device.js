'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DoorWindowSensor_DWS01 extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('alarm_contact', 'SENSOR_BINARY');
		// this.registerCapability('alarm_battery', 'METER');
		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = DoorWindowSensor_DWS01;

'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class SceneController_SCN04 extends ZwaveDevice {
	onMeshInit() {
		// this.registerCapability('alarm_battery', 'METER');
		this.registerCapability('measure_battery', 'BATTERY');
	}
}

module.exports = SceneController_SCN04;

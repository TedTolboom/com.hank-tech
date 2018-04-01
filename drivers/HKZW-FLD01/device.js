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
		this.registerCapability('alarm_tamper', 'NOTIFICATION', {
			report: 'NOTIFICATION_REPORT',
			// temp hardcoding the report parser due to missing Event 9 in events.json
			reportParser: report => {
				if (report && report['Notification Type'] === 'Home Security' && (report.hasOwnProperty('Event (Parsed)') || report.hasOwnProperty('Event'))) {
					if (report['Event (Parsed)'] === 'Tampering, Product covering removed' ||
						report['Event (Parsed)'] === 'Tampering, Invalid Code' ||
						report['Event (Parsed)'] === 'Tampering, Product Moved' ||
						report['Event'] === 9) {
						return true;
					}
					if (report['Event (Parsed)'] === 'Event inactive' && (!report.hasOwnProperty('Event Parameter') ||
							report['Event Parameter'][0] === 3 ||
							report['Event Parameter'][0] === 4 ||
							report['Event Parameter'][0] === 9)) {
						return false;
					}
				}
				return null;
			},
		});
		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');

		// register a settings parser
		this.registerSetting('temperature_alarm_high', value => value * 10);
		this.registerSetting('temperature_alarm_low', value => value * 10);
	}
}

module.exports = FloodSensor_FLD01;

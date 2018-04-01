'use strict';

const Homey = require('homey');
const ZwaveXYLightDevice = require('homey-meshdriver').ZwaveXYLightDevice;

class ColorBulb_RGB01 extends ZwaveXYLightDevice {
	async onMeshInit() {
		await super.onMeshInit();

		process.on('unhandledRejection', error => {
			this.error('unhandledRejection', error);
		});

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		/*
		// Add the BASIC report listener for onoff and dim capabilities as the device reports in BASIC
		this.registerReportListener('BASIC', 'BASIC_REPORT', report => {
			if (report.hasOwnProperty('Value')) {
				this.setCapabilityValue('onoff', report.Value > 0);
				this.setCapabilityValue('dim', report.Value / 99);
			}
		});
		*/
	}
}

module.exports = ColorBulb_RGB01;

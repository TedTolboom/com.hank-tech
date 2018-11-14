'use strict';

const ZwaveLightDevice = require('homey-meshdriver').ZwaveLightDevice;

class ColorBulb_RGB01 extends ZwaveLightDevice {
	async onMeshInit() {
		await super.onMeshInit();

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register a report listener
		this.registerReportListener('BASIC', 'BASIC_REPORT', (rawReport, parsedReport) => {
			if (rawReport && rawReport.hasOwnProperty('Value')) {
				if (this.hasCapability('onoff')) this.setCapabilityValue('onoff', rawReport.Value > 0);
				if (this.hasCapability('dim')) this.setCapabilityValue('dim', rawReport.Value > 99 ? 1 : rawReport.Value / 99);
			}
		});
	}
}

module.exports = ColorBulb_RGB01;
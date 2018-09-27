'use strict';

const ZwaveXYLightDevice = require('homey-meshdriver').ZwaveXYLightDevice;

class ColorBulb_RGB01 extends ZwaveXYLightDevice {
	async onMeshInit() {
		await super.onMeshInit();
		// enable debugging
		this.enableDebug();
	}
}

module.exports = ColorBulb_RGB01;

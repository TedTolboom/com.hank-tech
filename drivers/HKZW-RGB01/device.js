'use strict';

const ZwaveXYLightDevice = require('homey-meshdriver').ZwaveXYLightDevice;

class ColorBulb_RGB01 extends ZwaveXYLightDevice {
	async onMeshInit() {
		await super.onMeshInit();
	}
}

module.exports = ColorBulb_RGB01;

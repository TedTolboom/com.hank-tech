'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class SmartPlug_SO0x extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register capabilities for this device
		this.registerCapability('onoff', 'BASIC');
		this.registerCapability('meter_power', 'METER');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('measure_current', 'METER');
		this.registerCapability('measure_voltage', 'METER');

		let actionSO0x_reset_meter = new Homey.FlowCardAction('SO0x_reset_meter');
		actionSO0x_reset_meter
			.register()
			.registerRunListener(args => {
				args.device.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({})
					.then(result => this.result === 'TRANSMIT_COMPLETE_OK')
					.catch(() => false);
			});
	}
}

module.exports = SmartPlug_SO0x;

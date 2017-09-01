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

		// define FlowCardAction to reset meter_power
		let SO0x_reset_meter_run_listener = async(args) => {
			let result = await args.device.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({})
			if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
		};

		let actionSO0x_reset_meter = new Homey.FlowCardAction('SO0x_reset_meter');
		actionSO0x_reset_meter
			.register()
			.registerRunListener(SO0x_reset_meter_run_listener);
	}
}

module.exports = SmartPlug_SO0x;

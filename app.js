'use strict';

const Homey = require('homey');

class HankZwave extends Homey.App {

	onInit() {

		this.log('Hank Z-wave app is running...');

		this.actionStartDimLevelChange = new Homey.FlowCardAction('action_dim_startLevelChange')
			.register()
			.registerRunListener(this._actionStartDimLevelChangeRunListener.bind(this));
		this.actionStopDimLevelChange = new Homey.FlowCardAction('action_dim_stopLevelChange')
			.register()
			.registerRunListener(this._actionStopDimLevelChangeRunListener.bind(this));

	}

	async _actionStartDimLevelChangeRunListener(args, state) {
		if (!args.hasOwnProperty('direction')) return Promise.reject('direction_property_missing');
		args.device.log('FlowCardAction triggered to start dim level change in direction', args.direction);

		const nodeCommandClassVersion = parseInt(args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.version);

		let startLevelChangeObj = {
			'Properties1': new Buffer([args.direction === '1' ? (nodeCommandClassVersion > 2 ? 0x68 : 0x60) : 0x20]),
			'Start Level': 0,
			'Dimming Duration': args.duration / 1000 || 255, // if no duration has been set, use factory default (255),
			'Step Size': 1,
		}

		if (args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
			return await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_START_LEVEL_CHANGE(startLevelChangeObj);
		}
		return Promise.reject('unknown_error');
	}

	async _actionStopDimLevelChangeRunListener(args, state) {

		args.device.log('FlowCardAction triggered to stop dim level change');

		if (args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
			return await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_STOP_LEVEL_CHANGE({});
			// args.device.log(stop);
			//const get = await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_GET({})
			//args.device.log(get);
			//if (get === 'TRANSMIT_COMPLETE_OK') {
			//	return Promise.resolve
			//};
		}
		return Promise.reject('unknown_error');
	}

}

module.exports = HankZwave;
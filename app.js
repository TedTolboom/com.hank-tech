'use strict';

const Homey = require('homey');

class HankZwave extends Homey.App {

  async onInit() {
    this.log('Hank Z-wave app is running...');

    this.actionStartDimLevelChange = this.homey.flow
      .getActionCard('action_dim_startLevelChange')
      .registerRunListener(this._actionStartDimLevelChangeRunListener.bind(this));

    this.actionStopDimLevelChange = this.homey.flow
      .getActionCard('action_dim_stopLevelChange')
      .registerRunListener(this._actionStopDimLevelChangeRunListener.bind(this));
  }

  async _actionStartDimLevelChangeRunListener(args, state) {
    if (!args.hasOwnProperty('direction')) return Promise.reject(new Error('direction_property_missing'));
    args.device.log('FlowCardAction triggered to start dim level change in direction', args.direction);

    const nodeCommandClassVersion = parseInt(args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.version);

    const startLevelChangeObj = {
      Properties1: new Buffer([args.direction === '1' ? (nodeCommandClassVersion > 2 ? 0x68 : 0x60) : 0x20]),
      'Start Level': 0,
      'Dimming Duration': args.duration / 1000 || 255, // if no duration has been set, use factory default (255),
      'Step Size': 1,
    };

    if (args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
      return await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_START_LEVEL_CHANGE(startLevelChangeObj).catch(this.error);
    }
    return Promise.reject(new Error('unknown_error'));
  }

  async _actionStopDimLevelChangeRunListener(args, state) {
    args.device.log('FlowCardAction triggered to stop dim level change');

    if (args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
      return await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_STOP_LEVEL_CHANGE({}).catch(this.error);
      // args.device.log(stop);
      // const get = await args.device.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_GET({})
      // args.device.log(get);
      // if (get === 'TRANSMIT_COMPLETE_OK') {
      //	return Promise.resolve
      // };
    }
    return Promise.reject(new Error('unknown_error'));
  }

}

module.exports = HankZwave;

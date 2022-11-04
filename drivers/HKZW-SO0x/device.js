'use strict';

const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class SmartPlug_SO0x extends ZwaveDevice {

  async onNodeInit() {
    // enable debugging
    // this.enableDebug();

    // print the node's info to the console
    // this.printNode();

    // register capabilities for this device
    this.registerCapability('onoff', 'BASIC');
    this.registerCapability('meter_power', 'METER');
    this.registerCapability('measure_power', 'METER');
    this.registerCapability('measure_current', 'METER');
    this.registerCapability('measure_voltage', 'METER');

    // define FlowCardAction to reset meter_power
    const SO0x_reset_meter_run_listener = async args => {
      const result = await args.device.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
      if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
    };

    const actionSO0x_reset_meter = this.homey.flow
      .getActionCard('SO0x_reset_meter')
      .registerRunListener(SO0x_reset_meter_run_listener);
  }

}

module.exports = SmartPlug_SO0x;

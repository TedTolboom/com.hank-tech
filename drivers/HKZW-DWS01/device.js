'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoorWindowSensor_DWS01 extends ZwaveDevice {

  async onNodeInit() {
    // enable debugging
    // this.enableDebug();

    // print the node's info to the console
    // this.printNode();

    // register device capabilities
    this.registerCapability('alarm_contact', 'NOTIFICATION');
    this.registerCapability('alarm_tamper', 'NOTIFICATION');
    this.registerCapability('alarm_battery', 'BATTERY');
    this.registerCapability('measure_battery', 'BATTERY');
  }

}

module.exports = DoorWindowSensor_DWS01;

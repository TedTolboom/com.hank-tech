'use strict';

const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class SceneController_SCN04 extends ZwaveDevice {

  async onNodeInit() {
    // enable debugging
    // this.enableDebug();

    // print the node's info to the console
    // this.printNode();

    // register device capabilities
    this.registerCapability('alarm_battery', 'BATTERY');
    this.registerCapability('measure_battery', 'BATTERY');

    // define and register FlowCardTriggers
    const triggerSCN04_scene = this.homey.flow
      .getDeviceTriggerCard('SCN04_scene')
      .registerRunListener((args, state) => {
        return Promise.resolve(args.button === state.button && args.scene === state.scene);
      });

    const triggerSCN_button = this.homey.flow
      .getDeviceTriggerCard('SCN_button');

    // register a report listener (SDK2 style not yet operational)
    this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (rawReport, parsedReport) => {
      this.log('registerReportListener', rawReport, parsedReport);
      if (rawReport.hasOwnProperty('Properties1')
				&& rawReport.Properties1.hasOwnProperty('Key Attributes')
				&& rawReport.hasOwnProperty('Scene Number')
				&& rawReport.hasOwnProperty('Sequence Number')) {
        const remoteValue = {
          button: rawReport['Scene Number'].toString(),
          scene: rawReport.Properties1['Key Attributes'],
        };
        this.log('Triggering sequence:', rawReport['Sequence Number'], 'remoteValue', remoteValue);
        // Trigger the trigger card with 2 dropdown options
        triggerSCN04_scene.trigger(this, null, remoteValue);
        // Trigger the trigger card with tokens
        triggerSCN_button.trigger(this, remoteValue, null);
      }
    });
  }

}
module.exports = SceneController_SCN04;

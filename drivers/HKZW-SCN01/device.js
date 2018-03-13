'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class SceneController_SCN01 extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		// this.enableDebug();

		// print the node's info to the console
		// this.printNode();

		// register device capabilities
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');

		// define and register FlowCardTriggers
		let triggerSCN01_scene = new Homey.FlowCardTriggerDevice('SCN01_scene');
		triggerSCN01_scene
			.register()
			.registerRunListener((args, state) => {
				this.log(args, state);
				return Promise.resolve(args.button === state.button && args.scene === state.scene);
			});

		let triggerSCN_button = new Homey.FlowCardTriggerDevice('SCN_button');
		triggerSCN_button
			.register();

		// register a report listener (SDK2 style not yet operational)
		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (rawReport, parsedReport) => {
			this.log('registerReportListener', rawReport, parsedReport);
			if (rawReport.hasOwnProperty('Properties1') &&
				rawReport.Properties1.hasOwnProperty('Key Attributes') &&
				rawReport.hasOwnProperty('Scene Number') &&
				rawReport.hasOwnProperty('Sequence Number')) {
				const remoteValue = {
					button: rawReport['Scene Number'].toString(),
					scene: rawReport.Properties1['Key Attributes'],
				};
				this.log('Triggering sequence:', rawReport['Sequence Number'], 'remoteValue', remoteValue);
				// Trigger the trigger card with 2 dropdown options
				triggerSCN01_scene.trigger(this, triggerSCN01_scene.getArgumentValues, remoteValue);
				// Trigger the trigger card with tokens
				triggerSCN_button.trigger(this, remoteValue, null);
			}
		});

	}
}
module.exports = SceneController_SCN01;

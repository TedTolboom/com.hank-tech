'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class SceneController_SCN04 extends ZwaveDevice {
	onMeshInit() {
		let PreviousSequenceNo = 'empty';

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register device capabilities
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');

		// define and register FlowCardTriggers
		let triggerSCN04_scene = new Homey.FlowCardTriggerDevice('SCN04_scene');
		triggerSCN04_scene
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
		});

		// OLD API reportListener used since new registerReportListener is not active without capability
		this.node.CommandClass['COMMAND_CLASS_CENTRAL_SCENE'].on('report', (command, report) => {
			if (command.name === 'CENTRAL_SCENE_NOTIFICATION' &&
				report &&
				report.hasOwnProperty('Properties1') &&
				report.Properties1.hasOwnProperty('Key Attributes') &&
				report.hasOwnProperty('Scene Number') &&
				report.hasOwnProperty('Sequence Number')) {
				if (report['Sequence Number'] !== PreviousSequenceNo) {
					const remoteValue = {
						button: report['Scene Number'].toString(),
						scene: report.Properties1['Key Attributes'],
					};
					PreviousSequenceNo = report['Sequence Number'];
					// Trigger the trigger card with 2 dropdown options
					triggerSCN04_scene.trigger(this, triggerSCN04_scene.getArgumentValues, remoteValue);
					// Trigger the trigger card with tokens
					triggerSCN_button.trigger(this, remoteValue, null);
				}
			}
		});
	}
}

module.exports = SceneController_SCN04;

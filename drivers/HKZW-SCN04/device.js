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

		// this.registerCapability('alarm_battery', 'METER');
		this.registerCapability('measure_battery', 'BATTERY');

		// register a settings parser
		this.registerSetting('enable_config', value => {
			return new Buffer([value])
		});

		// register a report listener
		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (rawReport, parsedReport) => {
			this.log('registerReportListener', rawReport, parsedReport);
		});

		let triggerSCN04_scene = new Homey.FlowCardTriggerDevice('SCN04_scene');
		triggerSCN04_scene
			.register()
			.registerRunListener((args, state) => {
				this.log(args, state);
				return Promise.resolve(args.button === state.button && args.scene === state.scene);
			})
			.on('update', () => {
				this.log('update')
				triggerSCN04_scene
					.getArgumentValues()
					.then(args => {
						/*
								args = [{
										"my_arg": "user_value"
								}]
						*/
					});
			})

		this.node.CommandClass['COMMAND_CLASS_CENTRAL_SCENE'].on('report', (command, report) => {
			this.log(command.name); // e.g. BASIC_REPORT
			this.log(report); // e.g. { Value: true }
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
					this.log('remoteValue:', remoteValue, 'PreviousSequenceNo:', PreviousSequenceNo);
					// Trigger the trigger card with 2 dropdown options
					triggerSCN04_scene.trigger(this, triggerSCN04_scene.getArgumentValues, remoteValue)
					// Trigger the trigger card with tokens

				}
			}
		});
	}
}

module.exports = SceneController_SCN04;

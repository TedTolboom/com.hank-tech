'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;
const Util = require('homey-meshdriver').Util;

class ColorBulb_RGB01 extends ZwaveDevice {
	async onMeshInit() {
		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		//this.printNode();

		// register device capabilities
		this.registerCapability('onoff', 'BASIC');

		this.registerCapability('dim', 'BASIC', {
			get: 'BASIC_GET',
			getOpts: {
				getOnStart: true,
			},
			set: 'BASIC_SET',
			setParser: value => {
				this._onColor({dim: value}, null);

				return {
					Value: Math.round(value * 99),
				}
			},
			report: 'BASIC_REPORT',
			reportParser: report => {
				if (report && report.hasOwnProperty('Value')) {
					this._onColor({dim: report['Value'] / 99}, null);
					if (report['Value'] > 99) return 1;
					return report['Value'] / 99;
				}
				return null;
			}
		});

		this.registerMultipleCapabilityListener(['light_hue', 'light_saturation', 'light_mode'], this._onColor.bind(this), 500);
		this.registerMultipleCapabilityListener(['light_temperature', 'light_mode'], this._onTemperature.bind(this), 500);

		if (this.hasCommandClass('SWITCH_COLOR')) {
			// Get Warm White
			const WarmWhite = new Promise(resolve => {
				node.instance.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
					'Color Component ID': 0
				}, (err, result) => {
					if (result) return resolve(result['Value'] || 0);
					return resolve(0);
				});
			});

			// get Cold White
			const ColdWhite = new Promise(resolve => {
				node.instance.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
					'Color Component ID': 1
				}, (err, result) => {
					if (result) return resolve(result['Value'] || 0);
					return resolve(0);
				});
			});

			// Get Red
			const Red = new Promise(resolve => {
				node.instance.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
					'Color Component ID': 2
				}, (err, result) => {
					if (result) return resolve(result['Value'] || 0);
					return resolve(0);
				});
			});

			// Get Green
			const Green = new Promise(resolve => {
				node.instance.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
					'Color Component ID': 3
				}, (err, result) => {
					if (result) return resolve(result['Value'] || 0);
					return resolve(0);
				});
			});

			// Get Blue
			const Blue = new Promise(resolve => {
				node.instance.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
					'Color Component ID': 4
				}, (err, result) => {
					if (result) return resolve(result['Value'] || 0);
					return resolve(0);
				});
			});

			// Wait for all values to arrive
			Promise.all([WarmWhite, ColdWhite, Red, Green, Blue]).then(results => {
				const dim = this.getCapabilityValue('dim');
				// Determine light_mode and set light_hue/light_saturation or the light_temperature accordingly
				if (results[0] === 0 && results[1] === 0) {
					this.setCapabilityValue('light_mode', 'color');
				} else {
					this.setCapabilityValue('light_mode', 'temperature');

					if (results[0] !== 0)
						this.setCapabilityValue('light_temperature', 0 + ((255 - 0) / (1 - 0.5)) * results[0]);
					else
						this.setCapabilityValue('light_temperature', 0 + ((255 - 0) / (0.5 - 0)) * results[1]);
				}

				// Determine light_temperature
				if (results[0] !== 0) {
					node.state.light_temperature = map(10, 255, 0.5, 1, results[0]);
				} else {
					node.state.light_temperature = map(255, 10, 0, 0.5, results[1]);
				}
			});

			// Wait for all RGB values to arrive
			Promise.all([rPromise, gPromise, bPromise]).then(results => {

				const hsv = tinycolor({
					r: results[0] || 0,
					g: results[1] || 0,
					b: results[2] || 0
				}).toHsv();

				node.state.light_hue = hsv.h / 360;
				node.state.light_saturation = hsv.s;
			});
			console.log('alle waardes ophalen');
			console.log('warm wit');
			let ww, cw, r, g, b;
			// GET warm white
			await this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
				'Color Component ID': 0
			}, (err, result) => {
				console.log(result);
				if (err) throw console.log(err);
				else return ww = result.Value;
			});
			console.log('koud wit');
			// GET cold white
			await this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
				'Color Component ID': 1
			}, (err, result) => {
				console.log(result);
				if (err) throw console.log(err);
				else return cw = result.Value;
			});
			console.log('rood');
			// GET red color
			await this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
				'Color Component ID': 2
			}, (err, result) => {
				console.log(result);
				if (err) throw console.log(err);
				else return r = result.Value;
			});
			console.log('groen');
			// GET green color
			await this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
				'Color Component ID': 3
			}, (err, result) => {
				console.log(result);
				if (err) throw console.log(err);
				else return g = result.Value;
			});
			console.log('blauw');
			// GET blue color
			await this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_GET({
				'Color Component ID': 4
			}, (err, result) => {
				console.log(result);
				if (err) throw console.log(err);
				else return b = result.Value;
			});

			Promise.all([ww, cw, r, g, b])
				.then(values => {
					console.log('alle waardes binnen?');
					console.log('warm wit:', values[0]);
					console.log('koud wit:', values[1]);
					console.log('rood:', values[2]);
					console.log('groen:', values[3]);
					console.log('blauw:', values[4]);
			});
				/*.then(results => {
					console.log(results);

					// Determine light_mode
					if (results[0] === 0 && results[1] === 0) {
						this.setCapabilityValue('light_mode', 'color');

						// Calcutate HSV values
						const hsv = Util.convertRGBToHSV({
							red: results[2],
							green: results[3],
							blue: results[4],
						});

						// Set starting hue and saturation
						this.setCapabilityValue('light_hue', hsv['hue']);
						this.setCapabilityValue('light_saturation', hsv['saturation']);

					} else {
						this.setCapabilityValue('light_mode', 'temperature');

						// Calculate temperature
						console.log('warm:');
						console.log(results[0]);
						console.log('cold:');
						console.log(results[1]);
					}
			});*/
		}
	}

	_onColor(valueObj, optsObj) {
		if (valueObj.light_mode !== 'color' && this.getCapabilityValue('light_mode') !== 'color') return;

		let hue = valueObj.light_hue;
		if (typeof hue !== 'number') hue = this.getCapabilityValue('light_hue');

		let sat = valueObj.light_saturation;
		if (typeof sat !== 'number') sat = this.getCapabilityValue('light_saturation');

		let dim = valueObj.dim;
		if (typeof dim !== 'number') dim = this.getCapabilityValue('dim');

		const rgb = Util.convertHSVToRGB({
			hue: hue,
			saturation: sat,
			value: dim,
		});

		if (this.hasCommandClass('SWITCH_COLOR')) {
			this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_SET({
				Properties1: {
					'Color Component Count': 5,
				},
				vg1: [
					{
						'Color Component ID': 0, // Red
						Value: 0,
					},
					{
						'Color Component ID': 1, // Red
						Value: 0,
					},
					{
						'Color Component ID': 2, // Red
						Value: rgb['red'],
					},
					{
						'Color Component ID': 3, // Green
						Value: rgb['green'],
					},
					{
						'Color Component ID': 4, // Blue
						Value: rgb['blue'],
					},
				],
			});
		}

		return Promise.resolve();
	}

	_onTemperature( valueObj, optsObj ) {
		if (valueObj.light_mode !== 'temperature' && this.getCapabilityValue('light_mode') !== 'temperature') return;

		let temperature = valueObj.light_temperature;
		if (typeof temperature !== 'number') temperature = this.getCapabilityValue('light_temperature');

		let dim = valueObj.dim;
		if (typeof dim !== 'number') dim = this.getCapabilityValue('dim');

		const cold = Math.round(temperature * 255 * dim);
		const warm = Math.round((1 - temperature) * 255 * dim);

		if (this.hasCommandClass('SWITCH_COLOR')) {
			this.node.CommandClass['COMMAND_CLASS_SWITCH_COLOR'].SWITCH_COLOR_SET({
				Properties1: {
					'Color Component Count': 2,
				},
				vg1: [
					{
						'Color Component ID': 0,
						Value: cold,
					},
					{
						'Color Component ID': 1,
						Value: warm,
					},
				],
			});
		}

		return Promise.resolve();
	}
}

module.exports = ColorBulb_RGB01;

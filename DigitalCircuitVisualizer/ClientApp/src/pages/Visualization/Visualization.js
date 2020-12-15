import React, { Component, createRef } from 'react';
import { DataSet, Network } from 'visjs-network';
import axios from 'axios';
import $ from 'jquery';
import Layout from '../../components/Layout/Layout';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Select from '../../components/Select/Select';
import Checkbox from '../../components/Checkbox/Checkbox';
import './Visualization.css';

class Visualization extends Component {
	constructor(props) {
		super(props);
		this.visCanvas = createRef();
		this.canvas = null;
		this.ctx = null;
		this.interval = 0;
		this.width = 0;
		this.height = 0;
		this.lineHeight = 0;
		this.numsite = 0;
		this.coordinates = 0;
		this.canvasWidth = 900;
		this.canvasHeight = 900;
		this.network = {};
		this.data = {
			nodes: new DataSet([]),
			edges: new DataSet([])
		};
		this.options = {
			nodes: {
				font: {
					size: 0
				}
			},
			edges: {
				width: 0,
				selectionWidth: 4,
				color: {
					color: '#ced4da',
					highlight: '#f62817'
				},
				smooth: false
			},
			physics: {
				enabled: false
			},
			interaction: {
				navigationButtons: true
			}
		};
		this.state = {
			circuitLinesChecked: true,
			selectedEdgesChecked: true,
			totalEdgesChecked: false,
			nodeLabelsChecked: false,
			navigationButtonsChecked: false
		};
	}

	componentDidMount() {
		this.network = new Network(this.visCanvas.current, this.data, this.options);
		this.network.on('selectNode', (event) => {
			if (event.nodes.length) {
				let connectedNodes = this.network.getConnectedNodes(event.nodes[0]);
				for (let node of connectedNodes) {
					let targetNode = this.network.body.nodes[node];
					targetNode.setOptions({
						color: {
							border: '#f62817',
							background: '#f62817'
						}
					});
				}
			}
			else {
				styleNodes();
			}
		});
		this.network.on('deselectNode', (event) => {
			styleNodes();
		});
		let styleNodes = () => {
			let background = '#2b7ce9';
			let border = '#000';
			let arrayNetwork = Object.keys(this.network.body.nodes);
			for (let node of arrayNetwork) {
				if (!node.includes('edge')) {
					if (node.startsWith('S')) {
						background = '#000';
					}
					let targetNode = this.network.body.nodes[node];
					targetNode.setOptions({
						id: node,
						color: {
							border: border,
							background: background
						}
					});
				}
			}
		}
		$('.vis-navigation').addClass('d-none');
	}

	circuitLinesToggleHandler = () => {
		this.interval = setInterval(() => {
			let begin = 0;
			for (let i = 0; i < this.coordinates; i++) {
				this.ctx.moveTo(0, begin);
				this.ctx.lineTo(this.width, begin);
				this.ctx.stroke();
				if ($('.circuit-lines-toggle') !== null && this.state.circuitLinesChecked) {
					this.ctx.strokeStyle = '#9facc4';
				}
				else {
					this.ctx.strokeStyle = '#ced4da';
					this.network.redraw();
					clearInterval(this.interval);
				}
				begin += this.lineHeight;
			}
		}, 1);
		this.setState({
			circuitLinesChecked: !this.state.circuitLinesChecked
		});
	}

	selectedEdgesToggleHandler = () => {
		let totalEdgesElement = $('.total-edges-toggle');
		if (this.state.selectedEdgesChecked) {
			totalEdgesElement.attr('disabled', 'disabled');
			this.options.edges.hidden = true;
			this.setState({
				totalEdgesToggleHandler: false
			});
		}
		else {
			this.options.edges.hidden = false;
			totalEdgesElement.removeAttr('disabled');
		}
		this.network.setOptions(this.options);
		this.setState({
			selectedEdgesChecked: !this.state.selectedEdgesChecked
		});
	}

	totalEdgesToggleHandler = () => {
		this.options.edges.color.color = this.state.totalEdgesChecked ? '#ced4da' : '#848484';
		this.network.setOptions(this.options);
		this.setState({
			totalEdgesChecked: !this.state.totalEdgesChecked
		});
	}

	nodeLabelsToggleHandler = () => {
		this.options.nodes.font.size = this.state.nodeLabelsChecked ? 0 : 14;
		this.network.setOptions(this.options);
		this.setState({
			nodeLabelsChecked: !this.state.nodeLabelsChecked
		});
	}

	navigationButtonsToggleHandler = () => {
		let visNavigationElement = $('.vis-navigation');
		visNavigationElement.hasClass('d-none') ? visNavigationElement.removeClass('d-none') : visNavigationElement.addClass('d-none');
		this.setState({
			navigationButtonsChecked: !this.state.navigationButtonsChecked
		});
	}

	selectCircuitHandler = () => {
		let selectCircuitElement = $('.select-circuit');
		let selectTypeElement = $('.select-type');
		let postData = {
			urlPlaceLines: 'other/circuits/1/' + selectCircuitElement.val() + '/' + selectCircuitElement.val() + '.scl',
			urlPlaceNodes: 'other/circuits/1/' + selectCircuitElement.val() + '/' + selectCircuitElement.val() + '.nodes',
			urlPlaceEdges: 'other/circuits/1/' + selectCircuitElement.val() + '/' + selectCircuitElement.val() + '.nets',
			urlMoveNodes: 'other/circuits/1/' + selectCircuitElement.val() + '/' + selectCircuitElement.val() + '.txt',
			hasTypeOnly: false
		};
		this.canvas = $('canvas')[0];
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		clearInterval(this.interval);
		axios.post('/visualize', postData).then(response => {
			this.lineHeight = this.height / response.data.placeLines.coordinate.length;
			this.coordinates = response.data.placeLines.coordinate.length;
			this.ctx.beginPath();
			this.numsite = parseInt(this.width / response.data.placeLines.numsites[0]);
			this.interval = setInterval(() => {
				let begin = 0;
				for (let i = 0; i < response.data.placeLines.coordinate.length; i++) {
					this.ctx.moveTo(0, begin);
					this.ctx.lineTo(this.width, begin);
					this.ctx.stroke();
					if ($('.circuit-lines-toggle') !== null && this.state.circuitLinesChecked) {
						this.ctx.strokeStyle = '#9facc4';
					}
					else {
						this.ctx.strokeStyle = '#ced4da';
					}
					begin += this.lineHeight;
				}
			}, 1);
			let nodesData = [];
			let edgesData = [];
			for (let i = 0; i < response.data.placeNodes.nodes.length; i++) {
				for (let j = 0; j < response.data.moveNodes.nodes.length; j++) {
					let configNode = {
						id: response.data.placeNodes.nodes[i],
						title: response.data.placeNodes.nodes[i],
						label: response.data.placeNodes.nodes[i],
						x: 0,
						y: 0,
						shape: 'square',
						color: {
							border: '#000',
							background: '#2b7ce9',
							highlight: '#f62817'
						},
						physics: false
					};
					let configTerminal = {
						id: response.data.placeNodes.nodes[i],
						title: response.data.placeNodes.nodes[i],
						label: response.data.placeNodes.nodes[i],
						x: this.numsite * response.data.moveNodes.placesX[j],
						y: -this.numsite * response.data.moveNodes.placesY[j],
						shape: 'dot',
						size: 2.5,
						color: {
							border: '#000',
							background: '#000',
							highlight: '#f62817'
						},
						physics: false
					};
					if (response.data.moveNodes.nodes[j] === response.data.placeNodes.nodes[i]) {
						if (response.data.placeNodes.places[1] === '0') {
							if (response.data.moveNodes.placesY[j] === '0' && response.data.moveNodes.placesX[j] === '0') {
								configNode.size = 5;
								this.data[0] = configNode;
							}
							else {
								this.data[0] = configTerminal;
							}
						}
						else {
							if (response.data.moveNodes.placesY[j] === '0' && response.data.moveNodes.placesX[j] === '0') {
								configNode.size = 5 * response.data.placeNodes.places[i];
								this.data[0] = configNode;
							}
							else {
								this.data[0] = configTerminal;
							}
						}
						nodesData.push(this.data[0]);
					}
				}
			}
			let placeEdges = [];
			for (let i = 0; i < response.data.placeEdges.edges.length; i++) {
				placeEdges.push(JSON.parse(response.data.placeEdges.edges[i].replace(/(?<!\\)'/g, '"')));
            }
			for (let i = 0; i < placeEdges.length; i++) {
				for (let j = 0; j < placeEdges[i].length - 1; j++) {
					for (let k = 1; k < placeEdges[i].length; k++) {
						this.data[1] = {
							from: placeEdges[i][j],
							to: placeEdges[i][j + k],
							arrow: 'to'
						};
						edgesData.push(this.data[1]);
                    }
                }
            }
			this.network.setData({
				nodes: nodesData,
				edges: edgesData
			});
			this.network.moveTo({
				position: {
					x: 0,
					y: 0
				},
				offset: {
					x: -this.canvasWidth / 2,
					y: this.canvasHeight / 2
				}
			});
			this.network.fit();
			if (selectCircuitElement.find('option[value=""]')) {
				selectCircuitElement.find('option[value=""]').remove();
			}
			if (selectTypeElement.attr('disabled') === 'disabled') {
				selectTypeElement.removeAttr('disabled')
			}
			if (!selectTypeElement.find('option[value=""]').length) {
				selectTypeElement.prepend('<option value="">None</option>').val('');
            }
			$('.circuit-lines-toggle').removeAttr('disabled');
			$('.selected-edges-toggle').removeAttr('disabled');
			$('.total-edges-toggle').removeAttr('disabled');
			$('.node-labels-toggle').removeAttr('disabled');
			$('.navigation-buttons-toggle').removeAttr('disabled');
		});
	}

	circuitTypeHandler = () => {
		let selectTypeElement = $('.select-type');
		let postData = {
			urlMoveNodes: 'other/circuits/2/' + $('.select-circuit').val() + '_' + selectTypeElement.val() + '_paper.txt',
			hasTypeOnly: true
		};
		axios.post('/visualize', postData).then(response => {
			for (let i = 0; i < response.data.moveNodes.nodes.length; i++) {
				this.network.moveNode(response.data.moveNodes.nodes[i], this.numsite * response.data.moveNodes.placesX[i], -this.numsite * response.data.moveNodes.placesY[i]);
			}
			this.network.fit();
			selectTypeElement.find('option[value=""]').remove();
		});
	}

	render() {
		return (
			<Layout>
				<div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
					<div className="container">
						<SectionTitle title="Visualization" />
						<div className="row">
							<div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
								<div className="row">
									<div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-12">
										<Select selectId="select_circuit" inputClass={['form-control', 'form-control-sm', 'select-circuit'].join(' ')} containerClass={['form-group', 'mb-3'].join(' ')} labelText="Select Circuit" changed={this.selectCircuitHandler} options={['None', 'S27', 'S208', 'S298', 'S344', 'S349', 'S382', 'S386', 'S400', 'S420', 'S444', 'S510', 'S526', 'S641', 'S713', 'S820', 'S832', 'S838', 'S953', 'S1196', 'S1238', 'S1423', 'S1488', 'S1494']} />
									</div>
									<div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-12">
										<Select selectId="select_type" inputClass={['form-control', 'form-control-sm', 'select-type'].join(' ')} containerClass={['form-group', 'mb-3'].join(' ')} labelText="Select Type" changed={this.circuitTypeHandler} disabled options={['None', 'legal', 'illegal']} />
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-7">
								<div id="network" ref={this.visCanvas}></div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
								<Checkbox inputType="checkbox" inputId="circuit_lines_toggle" inputClass={['form-check-input', 'circuit-lines-toggle'].join(' ')} containerClass={['form-check', 'mb-2'].join(' ')} labelClass="form-check-label" labelText="Circuit Lines" changed={this.circuitLinesToggleHandler} checked={this.state.circuitLinesChecked} disabled />
								<Checkbox inputType="checkbox" inputId="selected_edges_toggle" inputClass={['form-check-input', 'selected-edges-toggle'].join(' ')} containerClass={['form-check', 'mb-2'].join(' ')} labelClass="form-check-label" labelText="Selected Edges" changed={this.selectedEdgesToggleHandler} checked={this.state.selectedEdgesChecked} disabled />
								<Checkbox inputType="checkbox" inputId="total_edges_toggle" inputClass={['form-check-input', 'total-edges-toggle'].join(' ')} containerClass={['form-check', 'mb-2'].join(' ')} labelClass="form-check-label" labelText="Total Edges" changed={this.totalEdgesToggleHandler} checked={this.state.totalEdgesChecked} disabled />
								<Checkbox inputType="checkbox" inputId="node_labels_toggle" inputClass={['form-check-input', 'node-labels-toggle'].join(' ')} containerClass={['form-check', 'mb-2'].join(' ')} labelClass="form-check-label" labelText="Node Labels" changed={this.nodeLabelsToggleHandler} checked={this.state.nodeLabelsChecked} disabled />
								<Checkbox inputType="checkbox" inputId="navigation_buttons_toggle" inputClass={['form-check-input', 'navigation-buttons-toggle'].join(' ')} containerClass={['form-check', 'mb-2'].join(' ')} labelClass="form-check-label" labelText="Navigation Buttons" changed={this.navigationButtonsToggleHandler} checked={this.state.navigationButtonsChecked} disabled />
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Visualization;
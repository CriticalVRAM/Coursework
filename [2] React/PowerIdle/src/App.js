import React, { Component } from 'react';
import update from 'immutability-helper';

class App extends Component {
	state = {
		power: 0,
		income: 0,
		buildings: {
			campfire: {
				basePrice: 150,
				price: 150,
				income: 10,
				owned: 0
			},
			waterMill: {
				basePrice: 1000,
				price: 1000,
				income: 50,
				owned: 0
			},
			windMill: {
				basePrice: 5000,
				price: 5000,
				income: 400,
				owned: 0
			}
		}
	}

	interval = setInterval(() => {
		let power = this.state.power + this.state.income/10
		this.setState({
			power: this.roundNumber(power)
		})
	}, 100)

	roundNumber = (num) => {
		return Math.round(num * 100) / 100
	}

	addPower = () => {
		let power = this.state.power + 10
		this.setState({
			power: power
		})
	}

	buyItem = (purchase) => {
		let item = this.state.buildings[purchase]
		if (this.state.power >= item.price) {
			let newPower = this.state.power - item.price
			let newIncome = this.state.income + item.income
			let newPrice = item.basePrice * 1.07**(item.owned || 1)
			let newOwned = item.owned + 1

			let newItem = update(item, {
				price: {$set: this.roundNumber(newPrice)},
				owned: {$set: newOwned}
			})
			let newBuildings = update(this.state.buildings, {
				[purchase]: {$set: newItem}
			})

			this.setState({
				power: newPower,
				income: newIncome,
				buildings: newBuildings
			})
		}
	}

	render() {
		return (
			<div>
			<button onClick={this.addPower}><span role="img" aria-label="power">⚡</span></button>
			<button onClick={() => {this.buyItem('campfire')}}>Campfire: {this.roundNumber(this.state.buildings.campfire.price)} Amp</button>
			<button onClick={() => {this.buyItem('waterMill')}}>Water Mill: {this.roundNumber(this.state.buildings.waterMill.price)} Amp</button>
			<button onClick={() => {this.buyItem('windMill')}}>Wind Mill: {this.roundNumber(this.state.buildings.windMill.price)} Amp</button>
			<p>{this.roundNumber(this.state.power)} Amp</p>
			</div>
		)
	}
}

export default App;

// how to use sass with react
/*
	campfire
	watermill
	windmill
	coal power plant
	solar panles
	bio fuel
	nuclear power
	zero point power plant
	dyson sphere
	black hole generator
	anti matter generator
*/
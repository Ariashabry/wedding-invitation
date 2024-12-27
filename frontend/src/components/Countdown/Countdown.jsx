import './Countdown.css'
import React, { Component } from 'react';

const AnimatedCard = ({ animation, digit }) => (
	<div className={`flipCard ${animation}`}>
		<span>{digit}</span>
	</div>
);

const StaticCard = ({ position, digit }) => (
	<div className={position}>
		<span>{digit}</span>
	</div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
	let currentDigit = digit;
	let previousDigit = digit - 1;

	if (unit === 'days') {
		previousDigit = previousDigit === 0 ? 30 : previousDigit;
	} else if (unit !== 'months') {
		previousDigit = previousDigit === -1 ? 59 : previousDigit;
	} else {
		previousDigit = previousDigit === 0 ? 12 : previousDigit;
	}

	if (currentDigit < 10) {
		currentDigit = `0${currentDigit}`;
	}
	if (previousDigit < 10) {
		previousDigit = `0${previousDigit}`;
	}

	const digit1 = shuffle ? previousDigit : currentDigit;
	const digit2 = !shuffle ? previousDigit : currentDigit;

	const animation1 = shuffle ? 'fold' : 'unfold';
	const animation2 = !shuffle ? 'fold' : 'unfold';

	return (
		<div className={'flipUnitContainer'}>
			<StaticCard position={'upperCard'} digit={currentDigit} />
			<StaticCard position={'lowerCard'} digit={previousDigit} />
			<AnimatedCard digit={digit1} animation={animation1} />
			<AnimatedCard digit={digit2} animation={animation2} />
		</div>
	);
};

class FlipClock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			months: 0,
			monthsShuffle: true,
			days: 0,
			daysShuffle: true,
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true,
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.updateTime(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateTime() {
		// Fecha objetivo: 25 de Enero 2025, 14:00 hora de Bolivia (UTC-4)
		const targetDate = new Date(Date.UTC(2025, 0, 25, 18, 0, 0)); // 14:00 Bolivia = 18:00 UTC
		
		// Fecha actual en Bolivia
		const currentDate = new Date();
		const boliviaOffset = -4 * 60; // UTC-4 en minutos
		const localOffset = currentDate.getTimezoneOffset();
		const totalOffset = (boliviaOffset + localOffset) * 60 * 1000; // Convertir a milisegundos
		
		// Diferencia en milisegundos entre las dos fechas, ajustada a hora Bolivia
		const difference = targetDate - (currentDate.getTime() + totalOffset);
		
		// Cálculo corregido de meses y días (incluyendo el día 25)
		const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
		const months = Math.floor(totalDays / 30);
		const days = Math.floor(totalDays % 30);
		
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);

		if (months !== this.state.months) {
			const monthsShuffle = !this.state.monthsShuffle;
			this.setState({ months, monthsShuffle });
		}

		if (days !== this.state.days) {
			const daysShuffle = !this.state.daysShuffle;
			this.setState({ days, daysShuffle });
		}

		if (hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({ hours, hoursShuffle });
		}

		if (minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({ minutes, minutesShuffle });
		}

		if (seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({ seconds, secondsShuffle });
		}
	}


	render() {
		const { months, days, hours, minutes, seconds, monthsShuffle, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;

		return (
			<>
				<h1 className="text-center text-white !text-[20px] mt-2 drop-shadow-lg !lg:text-[24px] font-medium font-poppins">
					Celebremos nuestra boda juntos este:
				</h1>	
				<h1 className="text-center text-white !text-[55px] mt-2 drop-shadow-lg !lg:text-[38px] font-bold">
					25 de Enero 2025
				</h1>
				<h5 className='text-xl text-center font-medium w-64 text-white tracking-wide mb-4 lg:text-2xl lg:pb-8'>
				</h5>
				<div className={'flipClock'}>
					<FlipUnitContainer unit={'months'} digit={months} shuffle={monthsShuffle} />
					<FlipUnitContainer unit={'days'} digit={days} shuffle={daysShuffle} />
					<FlipUnitContainer unit={'hours'} digit={hours} shuffle={hoursShuffle} />
					<FlipUnitContainer unit={'minutes'} digit={minutes} shuffle={minutesShuffle} />
					<FlipUnitContainer unit={'seconds'} digit={seconds} shuffle={secondsShuffle} />
				</div>
				<div className='grid grid-rows-1 grid-cols-5 gap-1 text-base w-full md:w-[764px] mt-3 text-center lg:text-xl font-bold text-white'>
					<div>mes</div>
					<div>días</div>
					<div>hrs</div>
					<div>min</div>
					<div>seg</div>
				</div>
			</>
		);
	}
}

export default FlipClock;

import React from 'react';
import ReactDOM from 'react-dom';
import DateDifference from './DateDifference.js';

class InfoDiffDate extends React.Component{
	constructor(props){
		super(props);
	
		this.date = new DateDifference(this.props.dataDate); 
		this.state = {numDay: this.date.getNumDay(), numWeek: this.date.getWeek(), dateDiff: this.date.getDiffDate(new Date())}
		this.intervalId = null;
	}
	componentDidMount() {
		setInterval(() =>{
			this.setState({dateDiff: this.date.getDiffDate(new Date())});
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId)
	}

	render(){
		return( 
			<div className={"info"}>
				<p><b>Номер дня в году:</b> {this.state.numDay}</p>
				<p><b>Номер недели:</b> {this.state.numWeek}</p>
				<p><b>Разница с текущей датой:</b> {this.state.dateDiff.years} лет {this.state.dateDiff.days} дней {this.state.dateDiff.hours} часов {this.state.dateDiff.minutes} минут {this.state.dateDiff.seconds} секунд</p>
			</div>
		);
	}
}
export default InfoDiffDate;
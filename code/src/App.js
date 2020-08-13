import React from 'react';
import ReactDOM from 'react-dom';
import Error from './components/Error';
import InfoDiffDate from './components/InfoDiffDate';
import DateDifference from './components/DateDifference.js';
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {errorMessage: "", dataDate: null}; 
		this.onChange = this.onChange.bind(this);
	}
	onChange(e){	
		let proccesData = DateDifference.processingDateString(e.target.value); //получаем сообщение об ошибке, если есть, и дату в формате Date()(null, если есть ошибка при вводе)
		this.setState({errorMessage: proccesData.errorMessage});
		this.setState({dataDate: proccesData.dataDate});
	}
	render(){
	  return (
		<div>
			<input className={"input-date"} placeholder="dd.mm.yyyy" onChange={this.onChange}/>
			<div>
				{this.state.errorMessage != "" ? <Error message={this.state.errorMessage} /> : //если есть ошибка, то выводи её
				this.state.dataDate != null ? <InfoDiffDate dataDate={this.state.dataDate} />: ""/*если нет ошибки и поле input не пусто, то выводим информацию*/}
			</div>
		</div>
		);
	}
}

export default App;

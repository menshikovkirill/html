class DateDifference{
	constructor(date){
		this.date = date;
	};
	static convertDateString(stringData){
		let dataDate = stringData.split('.');//разбиваем дату на . - гаранитируется, что корректная дата в формате дд.мм.гггг
		
		//формируем числа
		let day = parseInt(dataDate[0]);
		let month = parseInt(dataDate[1]);
		let year = parseInt(dataDate[2]);
		
		let date =  new Date(year, month - 1, day);//создаем дату, месяц начинается с 0 при инициализации
		
		//проверка на совпадение с форматом и на корректность даты
		if(date instanceof Date && !isNaN(date) && dataDate[0].length == 2 && day >=1 && day <=31 && date.getDate() == day && 
		dataDate[1].length == 2 && month >=1 && month <=12 && date.getMonth() == month - 1 &&
		dataDate[2].length == 4)
			return date;
		else
			return null; 
	}
	static processingDateString(dateString){
		let errmsg = '';
		let date = null;
		
		if(dateString != '')
		{
			let now = new Date();
			date = DateDifference.convertDateString(dateString);//получаем дату в формате Date(), если она корректная, иначе null
			
			if(date != null)
			{
				if(now >= date)
					errmsg = 'Дата должна быть не позже ' + new Date().toDateString();
				if(date >= new Date(Date.parse(new Date()) + 315532800004.2889 ))//прибавляем десять лет
				{
					let d = new Date(Date.parse(new Date()) + 315532800004.2889 );
					errmsg = 'Разница между датами больше 10 лет. Максимальная дата: ' + d.toDateString();
				}
			}	
			else
				errmsg = 'Введите дату в корректном формате';
		}
		date = errmsg == "" ? date : null;
		return {errorMessage: errmsg, dataDate: date};
	}
}
DateDifference.prototype.getWeek = function(){
	var millisecsInDay = 86400000;
	var firstJan = new Date(this.date.getFullYear(),0,1);
	return Math.ceil((((this.date - firstJan) /millisecsInDay) + firstJan.getDay())/7);
};
DateDifference.prototype.getNumDay = function(){
	var start = new Date(this.date.getFullYear(), 0, 0);
	var diff = this.date - start;
	var oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
};
DateDifference.prototype.getDiffDate = function(CurrDate){
	var diff = Math.abs(this.date - CurrDate);
	return {
		seconds: Math.max(Math.ceil(diff / 1000 % 60 -1), 0),
		minutes: Math.max(Math.ceil(diff / 60000 % 60 -1),0),
		hours: Math.max(Math.ceil(diff / 3600000 % 24 -1 ), 0),
		days: Math.max(Math.ceil(diff / 86400000 % 365 -1  ), 0),
		years: Math.max(Math.ceil(diff / 31536000000 -1),0)
	};
};
export default DateDifference;
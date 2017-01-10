var util = require('./util.js');


function ethioCalandar(){
	if (!(this instanceof ethioCalandar)) {
		return new ethioCalandar();
	}
}

// Ethiopian Month Names
var monthName = util.monthName ;

var weekName = util.weekName;

var gdate = new Date();
var gmill = gdate.valueOf();
var eMillisecond = gmill -( 21884400000) + (6 * 3600000);

ethioCalandar.prototype._year = 1963 + Math.floor(eMillisecond / 1000/60/60/24/365.25);
ethioCalandar.prototype._month = Math.floor(dayOfYear() / 30);
ethioCalandar.prototype._day = Math.floor(dayOfYear() % 30 ) + 1 ;
ethioCalandar.prototype._dayOfYear = dayOfYear();
ethioCalandar.prototype._hour = Math.floor(util.milliToHours(eMillisecond) % 24);
ethioCalandar.prototype._minute = Math.floor(util.milliToMinutes(eMillisecond) % 60);
ethioCalandar.prototype._second = Math.floor(util.milliToSeconds(eMillisecond)%60);

function dayOfYear(){
	return Math.floor(util.milliToDays(eMillisecond)%365.25) ;
}


// get functions 

// this will give us how many milli seconds have passed since
// meskerem 1 1963 tewat 12 seat
ethioCalandar.prototype.getMilli = function() {
	return eMillisecond ;
};

// this method will give us the last to digits of the year
ethioCalandar.prototype.getYear = function() {
	var self = this;
	return self._year.toString().slice(-2);
};

// this method will give us the whole digit of the year
ethioCalandar.prototype.getFullYear = function() {
	var self = this;
	return self._year;
};

// this will give us a zero based month
// 0 - meskerem, 1 - tikimit, 2- hidar ......
ethioCalandar.prototype.getMonth = function() {
	return this._month;
};

// this will give us the day
ethioCalandar.prototype.getDay = function() {
	return this._day;
}

ethioCalandar.prototype.getDayOfYear = function(){
	var month = this._month;
	var day = this._day;
	var dayOfYear = this._month * 30 + this._day;
	return dayOfYear;
}

ethioCalandar.prototype.getHour = function() {
	return this._hour;
}
ethioCalandar.prototype.getMinute = function() {
	return this._minute;
}
ethioCalandar.prototype.getSecond = function() {
	return this._second;
}

ethioCalandar.prototype.getDate = function() {
	return monthName[this._month]+" "+this._day+" "+this._year+" "+this._hour+":"+this._minute+":"+this._second;
}


// set functions
ethioCalandar.prototype.setYear = function(year) {
	var self = this;
	return self._year = year;
}

ethioCalandar.prototype.setMonth = function(month) {
	return this._month = month ;
}

ethioCalandar.prototype.setDay = function(day) {
	return this._day = day ;
}

ethioCalandar.prototype.setHour = function(hour) {
	return this._hour = hour;
}
ethioCalandar.prototype.setMinute = function(minute) {
	return this._minute = minute;
}
ethioCalandar.prototype.setSecond = function(second) {
	return this._second = second;
}
ethioCalandar.prototype.setTime = function(){
	if(arguments.length == 1){
		var timeString = arguments[0];
		var timeArr = util.timeArray(timeString);
		if(timeArr){
			this._hour = timeArr[0];
			this._minute = timeArr[1];
			this._second = timeArr[2];
		}
	}else if(arguments.lenth == 3 && 
				util.isValidHour(arguments[0]) && 
				util.isValidMinute(arguments[1]) && 
				util.isValidSecond(arguments[2])){
		this._hour = arguments[0];
		this._minute = arguments[1];
		this._second = arguments[2];
	}
}

ethioCalandar.prototype.setDate = function(){
	var dateString = '';
	if(arguments.length == 1){
		dateString = arguments[0];
		var dateArr = dateString.split(' ');
		if(dateArr.length == 4 && 
				util.isValidMonth(dateArr[0]) && 
				util.isValidMonth(dateArr[0], dateArr[1])){
			var year = dateArr[2];
			var month = dateArr[0];
			var day = dateArr[1];
			console.log(dateArr);
			console.log(year +" "+month+" "+day);
			this._year = year;
			this._month = monthName.indexOf(month);
			this._day = day;
			this.setTime(dateArr[3]);
		}else{
			console.log('invalid date string')
		}
	}else if (arguments.length == 3) {
		this._year = arguments[0];
		this._month = arguments[1];
		this._day = arguments[2];
	}
	
}
ethioCalandar.prototype.dayOfWeek = function(){
	var year = this._year;
	var month = this._month;
	var day = this._day;
	var weekDay = util.meskerem1(year) + 2 * month + day -1;
	var weekDay = weekDay%7;
	return weekDay;
}
ethioCalandar.prototype.weekNumber = function(){
	var meskerem1 = util.meskerem1(this._year);
	var dayOfYear = this.getDayOfYear();
	var weekNum = Math.ceil((meskerem1 + dayOfYear)/7);
	return weekNum;
}

ethioCalandar.prototype.isSameWeek = function(date) {
	if(this.weekNumber == date.weekNumber){
		return true;
	}else{
		return false;
	}
}
module.exports = ethioCalandar();
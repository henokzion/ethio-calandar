// changes milliseconds to days
var numOfDaysInMonth = {
	'meskerem':30 ,
	'tikimit':30 ,
	'hidar':30 ,
	'tahisas':30 ,
	'tir':30 ,
	'yekatit':30 ,
	'megabit':30 ,
	'miyaziya':30 ,
	'ginbot':30 ,
	'sene':30 ,
	'hamle':30 ,
	'nehase':30 ,
	'pagume': 5
};
var monthName = [
	'meskerem',
	'tikimit',
	'hidar',
	'tahisas',
	'tir',
	'yekatit',
	'megabit',
	'miyaziya',
	'ginbot',
	'sene',
	'hamle',
	'nehase',
	'pagume'
];
exports.monthName = monthName;
var weekName = [
	'ehud',
	'segno',
	'maksegno',
	'rebue',
	'hamus',
	'areb',
	'kidame'
];
exports.weekName = weekName;
function isValidDay(month, day){
	if(day <= numOfDaysInMonth[month] && day > 0)
		return true;
	else
		return false;
}
exports.isValidDay = isValidDay;

function meskerem1(year){
	var eroYear = year+7;
	var eroDate = new Date(eroYear, 8, 11);
	console.log(eroDate);
	return eroDate.getDay();
}
exports.meskerem1 = meskerem1;

function isValidMonth(month){
	if(monthName.indexOf(month) == -1){
		return false;
	}else{
		return true;
	}
}
exports.isValidMonth = isValidMonth;

function isValidSecond(sec){
	if(sec >= 0 && sec< 60){
		return true;
	}else{
		return false;
	}
}
exports.isValidSecond = isValidSecond;
function isValidMinute(min){
	if(min >= 0 && min< 60){
		return true;
	}else{
		return false;
	}
}
exports.isValidMinute = isValidMinute;
function isValidHour(hour){
	if(hour >= 0 && hour< 24){
		return true;
	}else{
		return false;
	}
}
exports.isValidHour = isValidHour;
function timeArray(timeString){
	var timeArr = timeString.split(":");
	if(timeArr.length ==3 && isValidMinute(timeArr[1]) && isValidHour(timeArr[0])){
		return timeArr;
	}else{
		return false;
	}
}
exports.timeArray = timeArray;

function milliToDays(milliseconds) {
	return milliseconds / (1000*60*60*24);
}
exports.milliToDays = milliToDays;

function milliToHours(milliseconds) {
	return milliseconds /1000/60/60 ;
}
exports.milliToHours = milliToHours;

function milliToMinutes(milliseconds) {
	return milliseconds /1000/60 ;
}
exports.milliToMinutes = milliToMinutes;


function milliToSeconds(milliseconds) {
	return milliseconds /1000 ;
}
exports.milliToSeconds = milliToSeconds;
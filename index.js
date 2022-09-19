// Your code here

const createEmployeeRecord = (userDetailsArray) => {
	return {
		firstName: userDetailsArray[0],
		familyName: userDetailsArray[1],
		title: userDetailsArray[2],
		payPerHour: userDetailsArray[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
};

const createEmployeeRecords = (arrayOfUsers) => {
	const newArray = [];
	arrayOfUsers.map((item) => {
		newArray.push(createEmployeeRecord(item));
	});

	return newArray;
};

const createTimeInEvent = (record, dateStamp) => {
	let [date, hour] = dateStamp.split(' ');

	record.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(hour, 10),
		date,
	});

	return record;
};

const createTimeOutEvent = (record, dateStamp) => {
	let [date, hour] = dateStamp.split(' ');

	record.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(hour, 10),
		date,
	});

	return record;
};

const hoursWorkedOnDate = (employeeObj, dateStamp) => {
	//given a date, find the number of hours elapsed btwn that date's timeInEvents and timeOut Event
	let inEvent = employeeObj.timeInEvents.find(function (e) {
		return e.date === dateStamp;
	});

	let outEvent = employeeObj.timeOutEvents.find(function (e) {
		return e.date === dateStamp;
	});

	return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function (employee, dateSought) {
	let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
	return parseFloat(rawWage.toString());
};

let allWagesFor = function (employee) {
	let eligibleDates = employee.timeInEvents.map(function (e) {
		return e.date;
	});

	let payable = eligibleDates.reduce(function (memo, d) {
		return memo + wagesEarnedOnDate(employee, d);
	}, 0);

	return payable;
};

let findEmployeeByFirstName = function (srcArray, firstName) {
	return srcArray.find(function (rec) {
		return rec.firstName === firstName;
	});
};

let calculatePayroll = function (arrayOfEmployeeRecords) {
	return arrayOfEmployeeRecords.reduce(function (memo, rec) {
		return memo + allWagesFor(rec);
	}, 0);
};

let createEmployeeRecord = function(ele) { 
// return objects with keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3], 
        timeInEvents: [],
        timeOutEvents: []
    } 
}

let createEmployeeRecords = function(arrayOfArrays) {  // array of arrays
// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    return arrayOfArrays.map(function(ele) {
        return createEmployeeRecord(ele) // returns array of objects
    })
}

let createTimeInEvent = function(record, dateStamp) {
// add an object with keys to the timeInEvents array on the record object
// type: set to "TimeIn", hour: derived from arg, date: derived from arg
    let [date, hour] = dateStamp.split(' ')
    record.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    return record // returns employee record
}

let createTimeOutEvent = function(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    record.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return record
}

let hoursWorkedOnDate = function(record, theDate) {
    // an integer, the hours worked
    // given a date, find the # of hours elasped b/w timIn and timeOut
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === theDate
    })
    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === theDate
    })
    let hoursWorked = (outEvent.hour - inEvent.hour) / 100
    return hoursWorked
}

let wagesEarnedOnDate = function(record, theDate) {
    // multiply the hours by the record's payRate to determine amount owed
    let wages = hoursWorkedOnDate(record, theDate) * record.payPerHour
    return parseFloat(wages.toString()) // Amount should be returned as a number.
}

let allWagesFor = function(record) {
    let rightDates = record.timeInEvents.map((e) => { return e.date })
    let allWages = rightDates.reduce((num, day) => { return num + wagesEarnedOnDate(record, day) }, 0)
    // return pay owed for all dates
    return allWages
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    // test the firstName field fo a match with the firstName arg
    // return matching record or undefined
    return srcArray.find((record) => { return record.firstName === firstName })
}

let calculatePayroll = function(arrayOfArrays){
          // accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
    // return sum of pay owed to all employees for all dates, as a #
    return arrayOfArrays.reduce((num, record) => { return num + allWagesFor(record) }, 0)
}

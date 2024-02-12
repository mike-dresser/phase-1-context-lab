/* Your Code Here */

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  const result = [];
  array.forEach((employee) => {
    result.push(createEmployeeRecord(employee));
  });
  return result;
}

function createTimeInEvent(timestamp) {
  // "YYYY-MM-DD HHMM"
  const newTimeIn = {
    type: 'TimeIn',
    hour: Number(timestamp.substring(11)),
    date: timestamp.substring(0, 10),
  };
  this.timeInEvents.push(newTimeIn);
  return this;
}

function createTimeOutEvent(timestamp) {
  // "YYYY-MM-DD HHMM"
  const newTimeOut = {
    type: 'TimeOut',
    hour: Number(timestamp.substring(11)),
    date: timestamp.substring(0, 10),
  };
  this.timeOutEvents.push(newTimeOut);
  return this;
}

function hoursWorkedOnDate(date) {
  let result = {
    in: 0,
    out: 0,
  };
  for (let workday of this.timeInEvents) {
    if (workday.date === date) {
      result.in = workday.hour;
    }
  }
  for (let workday of this.timeOutEvents) {
    if (workday.date === date) {
      result.out = workday.hour;
    }
  }
  return (result.out - result.in) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  for (let employee of srcArray) {
    if (employee.firstName === firstName) {
      return employee;
    }
  }
}

function calculatePayroll(array) {
  let total = 0;
  for (let employee of array) {
    total += allWagesFor.call(employee);
  }
  return total;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// -------- functions --------
function read_file(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch (err) {
        return null;
    }
}
// -------- main --------
var dataFilePath = "data/01.txt";
var data = read_file(dataFilePath);
if (data === null) {
    console.log("Error reading file: ".concat(dataFilePath));
    process.exit(1);
}
var array = data.split(/\r?\n/).map(function (line) { return line.trim().split(/\s+/); });
var column0 = array.map(function (row) { return Number(row[0]); });
var column1 = array.map(function (row) { return Number(row[1]); });
// Sort the array by column0 and adjust column1 accordingly
array.sort(function (a, b) { return Number(a[0]) - Number(b[0]); });
column0 = array.map(function (row) { return Number(row[0]); });
column1 = array.map(function (row) { return Number(row[1]); });
// Ensure the columns have the same length
if (column0.length !== column1.length) {
    console.log("Error: columns have different lengths");
    process.exit(1);
}
// -------- task 1 --------
var diff = 0;
for (var i = 0; i < column0.length; i++) {
    diff += Math.abs(column0[i] - column1[i]);
}
console.log("Total difference: ".concat(diff));
// -------- task 2 --------
var column1Frequency = {};
for (var i = 0; i < column1.length; i++) {
    column1Frequency[column1[i]] = (column1Frequency[column1[i]] || 0) + 1;
}
var results = [];
for (var i = 0; i < column0.length; i++) {
    var value = column0[i];
    var rr = column1Frequency[value] || 0;
    results.push(value * rr);
}
console.log("Total results: ".concat(results.reduce(function (a, b) { return a + b; }, 0)));

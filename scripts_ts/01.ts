import * as fs from 'fs';

// -------- functions --------
function read_file(filePath: string): string | null {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return null;
    }
}

// -------- main --------
let dataFilePath: string = "data/01.txt";
let data: string | null = read_file(dataFilePath);
if (data === null) {
    console.log(`Error reading file: ${dataFilePath}`);
    process.exit(1);
}

let array = data.split(/\r?\n/).map(line => line.trim().split(/\s+/));
let column0 = array.map(row => Number(row[0]));
let column1 = array.map(row => Number(row[1]));

// Sort the array by column0 and adjust column1 accordingly
array.sort((a, b) => Number(a[0]) - Number(b[0]));
column0 = array.map(row => Number(row[0]));
column1 = array.map(row => Number(row[1]));

// Ensure the columns have the same length
if (column0.length !== column1.length) {
    console.log("Error: columns have different lengths");
    process.exit(1);
}

// -------- task 1 --------
let diff = 0;
for (let i = 0; i < column0.length; i++) {
    diff += Math.abs(column0[i] - column1[i]);
}
console.log(`Total difference: ${diff}`);

// -------- task 2 --------
const column1Frequency: { [key: number]: number } = {};
for (let i = 0; i < column1.length; i++) {
    column1Frequency[column1[i]] = (column1Frequency[column1[i]] || 0) + 1;
}

const results: number[] = [];
for (let i = 0; i < column0.length; i++) {
    const value = column0[i];
    const rr = column1Frequency[value] || 0;
    results.push(value * rr);
}

console.log(`Total results: ${results.reduce((a, b) => a + b, 0)}`);

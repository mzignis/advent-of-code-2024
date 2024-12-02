import * as fs from 'fs';

// -------- functions --------
function read_file(filePath: string): string | null {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return null;
    }
}

function isSortedAscending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false; // If an element is greater than the next one, it's not sorted.
        }
    }
    return true;
}


function isSortedDescending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false; // If an element is smaller than the next one, it's not sorted.
        }
    }
    return true;
}

function getDifferences(arr: number[]): number[] {
    const differences: number[] = [];
    for (let i = 1; i < arr.length; i++) {
        differences.push(arr[i] - arr[i - 1]);
    }
    return (differences);
}

function isDifferenceValid(difference: number[]): boolean {
    return (Math.max(...difference.map(Math.abs)) <= 3 && Math.min(...difference.map(Math.abs)) >= 1)
}

function isValid(arr: number[]): boolean {
    return (isSortedAscending(arr) || isSortedDescending(arr)) && isDifferenceValid(getDifferences(arr));
}


// -------- main --------
const dataFilePath: string = "data/02.txt";
const data = read_file(dataFilePath);
if (data === null) {
    console.log(`Error reading file: ${dataFilePath}`);
    process.exit(1);
}

const lines = data.split(/\r?\n/).map(line => line.trim().split(/\s+/));

// -------- task 1 --------
let safe_reports: number = 0;
for (let ii = 0; ii < lines.length; ii++) {
    const line = lines[ii].map(Number);

    if (line.length <= 1) {
        continue;
    }

    if (isValid(line)) {
        safe_reports++;
    }

}
console.log(`Safe reports: ${safe_reports}`);

// -------- task 2 --------
let safeReports = 0;

for (let line of lines) {
    if (isValid(line.map(Number))) {
        safeReports += 1;
        continue;
    }

    for (let ii = 0; ii < line.length; ii++) {
        let tmpLine = [...line];
        tmpLine.splice(ii, 1);
        if (isValid(tmpLine.map(Number))) {
            safeReports += 1;
            break;
        }
    }
}
console.log(`Safe reports: ${safeReports}`);

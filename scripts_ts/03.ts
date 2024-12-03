import * as fs from 'fs';

// -------- functions --------
function read_file(filePath: string): string | null {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return null;
    }
}

const filepath: string = "data/03.txt";
const data: string = read_file(filepath);
if (data === null) {
    console.log(`Error reading file: ${filepath}`);
    process.exit(1);
}

// -------- task 1 --------
const pattern_task1: RegExp = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
let match: RegExpExecArray | null;
const multiplications: Array<[number, number]> = [];

while ((match = pattern_task1.exec(data)) !== null) {
    const a = parseInt(match[1], 10); // First number
    const b = parseInt(match[2], 10); // Second number
    multiplications.push([a, b]);
}

const results: number = multiplications.map(
    ([a, b]) => a * b
).reduce(
    (acc, val) => acc + val, 0
);
console.log(results);

// -------- task 2 --------
const pattern_task2 = /(mul\(\s*\d+\s*,\s*\d+\s*\)|do\(\)|don't\(\))/g;
let match_task2: RegExpExecArray | null;
let is_enabled: boolean = true;
const result_task2: number[] = [];

while ((match_task2 = pattern_task2.exec(data)) !== null) {
    if (match_task2[0] === 'do()') {
        is_enabled = true;
    }
    else if (match_task2[0] === 'don\'t()') {
        is_enabled = false;
    }

    if (is_enabled) {
        if (match_task2[0].startsWith('mul')) {
            const numbers: string[] = match_task2[0].replace(
                'mul(', ''
            ).replace(
                ')', ''
            ).split(
                ','
            );
            const a = parseInt(numbers[0], 10);
            const b = parseInt(numbers[1], 10);
            result_task2.push(a * b);
        }
    }
}
console.log(result_task2.reduce((acc, val) => acc + val, 0));

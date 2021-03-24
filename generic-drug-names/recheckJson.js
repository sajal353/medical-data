import fs from 'fs';

let results = [];
const search = 'paracetamol';

fs.readFile('./output/generic_names.json', (err, data) => {
    let parsed = JSON.parse(data);
    for (let i in parsed) {
        console.log(parsed[i]);
        if (parsed[i].toLowerCase().includes(search)) {
            results.push(parsed[i]);
        }
    };
    console.log(results);
    console.log(`${results.length} entries includes '${search}'`);
});
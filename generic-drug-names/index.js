/* Extract zip in dataset */

const time = Date.now();

import fs from 'fs';

let cleanedData = [];

fs.readFile('./dataset/drug-ndc-0001-of-0001.json', (err, data) => {

    console.log('Parsing Data...');
    const dataset = JSON.parse(data);
    console.log('Parsing Complete.');

    let resultsArray = dataset.results;

    let checkMultiple;

    console.log('Extracting generic names...');
    for (let i in resultsArray) {
        let genericName = resultsArray[i].generic_name;
        if (typeof genericName == 'string') {
            checkMultiple = genericName.match(/[-,/]/) ? false : true;
            if (checkMultiple) {
                cleanedData.push(resultsArray[i].generic_name.toUpperCase());
            };
        };
    };
    console.log('Extraction Complete.');

    let beforeFilter = cleanedData.length;
    console.log(`Found ${beforeFilter} generic names.`);

    console.log('Filtering Duplicates...');
    cleanedData = cleanedData.filter((a, b) => cleanedData.indexOf(a) === b);
    console.log(`${beforeFilter - cleanedData.length} duplicates removed. \n${cleanedData.length} generic names added to array. `);

    let dataObject = Object.assign({}, cleanedData);
    console.log('Created obejct.');

    let jsonData = JSON.stringify(dataObject);
    console.log('Converted to JSON.');

    console.log('Creating JSON file.')
    fs.writeFile('./output/generic_names.json', jsonData, (err) => {
        if (err) throw err;
        console.log('File created.');

        console.log(`Operation completed in ${(Date.now() - time) / 1000}sec. 😀`);
    });

});



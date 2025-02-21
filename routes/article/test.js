const fs = require('fs');
const {readFile, writeFile} = require("../../helper/file");

let data;

(async function() {
    // const a = await readFile('test.json')
    // a.push({"second": "pushinf"})
    await writeFile('test1.json', [{"1": "2"}])
})()
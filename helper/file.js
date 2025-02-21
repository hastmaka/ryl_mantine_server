const fs = require("fs");
const path = require('path');
const BASE_PATH = path.resolve(__dirname, '../data');

module.exports = {
    readFile: (fileName) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${BASE_PATH}/${fileName}`, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const result = eval(data); // Be cautious with eval!
                        resolve(result);
                    } catch (evalError) {
                        reject(evalError);
                    }
                }
            });
        });
    },
    writeFile: async (fileName, data) => {
        await fs.writeFile(
            `${BASE_PATH}/${fileName}`,
            JSON.stringify(data, null, 2),
            'utf-8',
            (err) => {
                return err
            }
        );
    },
    updateRecord: (fileName, recordId, data) => {

    },
    deleteRecord: (recordId) => {

    }
}
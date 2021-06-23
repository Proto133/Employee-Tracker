//Display open png in console.
const png = require('console-png');

const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');

png(image, function(err, string) {
    if (err) throw err;
    console.log(string);
});
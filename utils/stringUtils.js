/**
 * Summary. Multi Line Stringify
 * @link https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
 * @param {string[]} strings 
 * @param  {...string} values 
 * @return {string} The input template string, merging parameters, preserving newlines.
 */
function mls(strings, ...values) {
    // Merge the strings with the
    // substitution vars first.
    let output = '';
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    // Split on newlines.
    const lines = output.split(/(?:\r\n|\n|\r)/);
    // Rip out the leading whitespace.
    return lines
        .map((line) => {
            return line.replace(/^\s+/gm, '');
        })
        .join('\n')
        .trim(); 
}
/**
 * Summary. Single Line Stringify
 * @link https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
 * @param {string[]} strings 
 * @param  {...string} values 
 * @return {string} The input template string, merging parameters, replacing any newlines with spaces.
 */
function sls(strings, ...values) {
    let output = '';
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    const lines = output.split(/(?:\r\n|\n|\r)/);
    return lines
        .map((line) => {
            return line.replace(/^\s+/gm, '');
        })
        .join(' ') 
        .trim(); 
}

module.exports = {mls: mls, sls: sls};
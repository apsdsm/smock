/**
 * the matcher searches a config file for a path, and if it finds a match it 
 * returns the data asoociated with that match.
 */
var exports = module.exports = {};

exports.getMatch = function(input, matchlist) {

  if (input !== undefined && matchlist !== undefined) {
    for (var key in matchlist) {
      if (!matchlist.hasOwnProperty(key)) { 
        continue; 
      }

      if (key == input) {
        return matchlist[key];
      }
    }
  }

  return null;
};
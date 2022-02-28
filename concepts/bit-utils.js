module.exports = { 
    // For display purposes
    toBinary: function(decimal) {
        return (decimal >>> 0).toString(2);
    },

    toDecimal: function(num) {
        return parseInt(num,2);
    }
}
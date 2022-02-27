module.exports = { 
    // For display purposes
    toBinary: function(num) {
        return new Number(num).toString(2);
    },

    toDecimal: function(num) {
        return parseInt(num,2);
    }
}
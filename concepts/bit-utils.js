module.exports = { 
    toBinary: function(decimal) {
        // Number.toString(radix) - where radix is int through 2-36 specifying base for numeric value
        // 1, or 001 >>> 0 == 001, as the unsigned right shift shifts in zero bits from the left.
        return (decimal >>> 0).toString(2);
    },

    toDecimal: function(num) {
        return Number("0b" + num);
    }
}
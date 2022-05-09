// Simplified: Shorten prefix until it is found within other string
function LongestCommonPrefix(stringArray) {
    if(stringArray.length == 0) return "";

    var prefix = stringArray[0];

    for(var i = 1; i < stringArray.length; i++) {
        // indexOf will return -1 if we can't find prefix within current string
        while(stringArray[i].indexOf(prefix) == -1) {
            // shorten prefix so we can try to find it again in next loop
            prefix = prefix.substring(0, prefix.length - 1);
            if(prefix == "") return "";
        }
    }

    return prefix;
}

input = ["flower", "flow", "flight"];

console.log(LongestCommonPrefix(input));
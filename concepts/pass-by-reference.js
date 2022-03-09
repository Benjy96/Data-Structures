/**
 * 
 * Same as Java; you are passing a copy of the address. You are not altering the original pointer/address
 * if you reassign it within a method.
 * 
 * However, when you use dot . notation, you follow the address and can then alter the actual properties.
 * 
 */


class x {
    age;
    name;

    constructor(age, name) {
        this.age = age;
        this.name = name;
    }
}

function alterProperties(object) {
    object.age = 15;
    object.name = "Tester Two";     // accesses the address and alters properties of original testObject
}

function reassignObj(object) {
    object = new x(28, "Mr Test Ickle, PhD");   // doesn't alter testObj, but a copy of testObj
}

function clearObj(object) {
    object = null;      // doesn't clear testObj pointer (which points to testObj), 
                        // but a copy of testObj (which points to testObj)
                        // i.e., testObj will still point to testObj, but object will be null
}

var testObj = new x(5, "Tester JUAN");
console.log("CREATED OBJECT");
console.log(testObj);   // 5, Tester Juan

alterProperties(testObj);
console.log("CALLED ALTER PROPERTIES");
console.log(testObj);   // 15, Tester Two

reassignObj(testObj);
console.log("CALLED REASSIGN OBJECT");
console.log(testObj);   // 15, Tester Two

clearObj(testObj);
console.log("CALLED CLEAR OBJECT");
console.log(testObj);   // 15, Tester Two
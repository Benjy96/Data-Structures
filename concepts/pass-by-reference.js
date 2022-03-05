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
    object.name = "Tester Two";
}

function reassignObj(object) {
    object = new x(28, "Mr Test Ickle, PhD");   // doesn't alter testObj, but a copy of testObj
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

/**
 * 
 * Same as Java. You are passing a copy of the address. You are not altering the original pointer/address
 * if you reassign it within a method.
 * 
 */

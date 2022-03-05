package concepts;

class Main {
    public static void main(String[] args){ 
    
        test testObj = new test("Tester Juan", 5);  // testObj equal to some address pointing to our object
        System.out.println("Age " + testObj.age);   // 5
        System.out.println("Name " + testObj.name);

        alterProperties(testObj);   // pass the address to the function                     
        
        System.out.println("---- ALTER PROPERTIES HAS BEEN CALLED ----");
        System.out.println("Age " + testObj.age);   // 10 - method accessed address and changed values at the address
        System.out.println("Name " + testObj.name);

        reassignObj(testObj);       // pass the address to the function

        System.out.println("---- ALTER OBJECT HAS BEEN CALLED ----");
        System.out.println("Age " + testObj.age);   // 10 - but now nothing changed... why is this?
        System.out.println("Name " + testObj.name); // we passed a COPY of the address to the function

        // WTF is a copy of the address? What does that mean?
        /**
         * 
         * Imagine x == 123456789, which is an address
         * We pass x into function alterProperties
         * What alterProperties gets is NOT x, but a copy of x, x2, with the same value
         * When we access x2.name, x2.age, we are USING the copy's address to find those properties, then
         * altering the original object.
         * 
         * We pass x into function alterObject
         * But what alterObject gets is x2, which is a copy of x
         * So when we assign x = new Object(), what we're really doing is x2 = new Object("Mr Joe Bloggs")
         * So when we exit the function, and print x.name, we do NOT get Mr Joe Bloggs, as we didn't alter x,
         * we altered a copy of x.
         * 
         * If we access the address (pointed to by x and its copy), we can alter its properties
         * If we reassign the copy of x... well then nothing has happened to x, has it?
         * 
         */
    }

    public static void alterProperties(test obj) {
        obj.age = 10;
        obj.name = "tester TWO";
    }

    public static void reassignObj(test obj) {
        test newObject = new test("Mr Test Ickle, PhD", 28);
        obj = newObject;
    }
}

class test {
    int age;
    String name;

    test(String name, int age) {
        this.name = name;
        this.age = age;
    }
}


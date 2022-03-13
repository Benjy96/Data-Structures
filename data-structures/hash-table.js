/**
 * Hash table removes need to search because it's like a brain just remembering where something is
 * instantly. It computes where the thing should be the same way each time to do this.
 * 
 * Hash table essentially lets you have O(1) access of an array, without needing to remember
 * what the index is for every item yourself, as the hash table will compute it for you based on the key.
 * ------------
 * Hash table for storing price of an apple:
 * Data (of key) -> int
 * Array[int] == Value, with O(1) access
 * 
 * Example - Key: Apple, Value: £0.50
 * Hash[Apple] = £0.50;
 * Apple -> 3
 * Array[3] = £0.50
 * ------------
 * Time Complexity:
 * Average: O(1) Search, Update, Delete
 * Worst: O(n) Search, Update, Delete (because if key collision, may store elements in a linked list)
 * ------------
 * Avoid Collisions? 
 * - Good hash function - evenly spaces items out across the underlying array; bad one groups/causes collisions
 * - Low load factor (num items / num slots), i.e., need more slots than items
 *      Load factor of 0.5 would be 2x the slots of items.
 */
 const map1 = new Map();

 map1.set('a', 1);
 map1.set('b', 2);
 map1.set('c', 3);
 
 console.log(map1.get('a')); // expected output: 1
 
 map1.set('a', 97);
 
 console.log(map1.get('a')); // expected output: 97
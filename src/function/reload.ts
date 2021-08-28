type Combinable = string | number;

/* function add(a: Combinable, b: Combinable) {
  return a + b;
} */

// add(1, 2); // 3
// add("1", "2"); //"12"


/* function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
} */


function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}


const result = add('Semlinker', ' Kakuqo');
result.split(' ');
export function fizzBuzz (n: number) {

  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';

  return n.toString();
}

fizzBuzz(15)

export function factorial (n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(7);
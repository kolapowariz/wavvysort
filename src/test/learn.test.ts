import { factorial, fizzBuzz } from "@/components/learntest";
import { describe, it, expect } from "vitest";

describe('Learning test', () => {
  it('should return FizzBuzz if n is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
  it('should return fizz if n is divsible by 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  })
  it('should return buzz if n is divisible by 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  })
  it('should return string of n if its not divisible by 3 or 5 or both', () => {
    expect(fizzBuzz(4)).toBe('4');
  })
})


describe('Factorial', ()=> {
   it('should return 0 as factorial of 0', () => {
    expect(factorial(0)).toBe(0)
  })
  it('should return 1 as factorial of 1', () => {
    expect(factorial(1)).toBe(1)
  })
  it('should return 2 as factorial of 2', () => {
    expect(factorial(2)).toBe(2)
  })
  it('should return 6 as factorial of 3', () => {
    expect(factorial(3)).toBe(6)
  })
  it('should return 120 as factorial of 5', () => {
    expect(factorial(5)).toBe(120)
  })
  it('should return 24 as factorial of 4', () => {
    expect(factorial(4)).toBe(24)
  })
})
export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "yijin2";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "yijin2";
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const largest = Math.max(...numbers.map(Number));
      return largest.toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("plus")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const sum = numbers.map(Number).reduce((a, b) => a + b, 0);
      return sum.toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("multiplied")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const product = numbers.map(Number).reduce((a, b) => a * b, 1);
      return product.toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const results = numbers
        .map(Number)
        .filter((num) => Number.isInteger(Math.sqrt(num)) && Number.isInteger(Math.cbrt(num)));
      return results.join(", ");
    }
    return "";
  }

  if (query.toLowerCase().includes("minus")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const sum = numbers.map(Number).reduce((a, b) => a - b, 0);
      return sum.toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("fibonacci")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const n = parseInt(numbers[0], 10);
      if (n <= 0) return "0";
      if (n === 1) return "1";
      let a = 0,
        b = 1,
        temp;
      for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
      }
      return b.toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("power")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const base = parseInt(numbers[0], 10);
      const exponent = parseInt(numbers[1], 10);
      return Math.pow(base, exponent).toString();
    }
    return "";
  }

  if (query.toLowerCase().includes("primes")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const isPrime = (num: number): boolean => {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) return false;
        }
        return true;
      };
      const primes = numbers.map(Number).filter(isPrime);
      return primes.length > 0 ? primes.join(", ") : "";
    }
    return "";
  }

  return "";
}

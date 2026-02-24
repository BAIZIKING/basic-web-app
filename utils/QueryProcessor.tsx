function evaluateArithmetic(query: string): string | null {
  const numbers = query.match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;

  const lowerQuery = query.toLowerCase();
  const operations: Array<{ op: string; symbol: string }> = [
    { op: "multiplied", symbol: "*" },
    { op: "divided", symbol: "/" },
    { op: "plus", symbol: "+" },
    { op: "minus", symbol: "-" },
  ];

  const tokens: (number | string)[] = [];
  let operationCount = 0;

  // Replace operation keywords with symbols
  let processed = query;
  for (const { op, symbol } of operations) {
    const regex = new RegExp(op, "gi");
    if (regex.test(processed)) {
      operationCount++;
      processed = processed.replace(regex, symbol);
    }
  }

  // If no operations or only one number, not applicable
  if (operationCount === 0 || numbers.length < 2) return null;

  // Build token array: [num, op, num, op, num, ...]
  let numIndex = 0;
  let currentPos = 0;

  for (const num of numbers) {
    tokens.push(Number(num));
    // Look for next operation
    const nextNumIndex = processed.indexOf(num, currentPos);
    if (nextNumIndex !== -1) {
      currentPos = nextNumIndex + num.length;
      const nextPart = processed.substring(currentPos).match(/^[+\-*/]/);
      if (nextPart) {
        tokens.push(nextPart[0]);
      }
    }
  }

  // Evaluate with proper order of operations
  // First pass: handle * and /
  for (let i = 1; i < tokens.length; i += 2) {
    if (tokens[i] === "*") {
      tokens.splice(i - 1, 3, (tokens[i - 1] as number) * (tokens[i + 1] as number));
      i -= 2;
    } else if (tokens[i] === "/") {
      tokens.splice(i - 1, 3, (tokens[i - 1] as number) / (tokens[i + 1] as number));
      i -= 2;
    }
  }

  // Second pass: handle + and -
  let result = tokens[0] as number;
  for (let i = 1; i < tokens.length; i += 2) {
    if (tokens[i] === "+") {
      result += tokens[i + 1] as number;
    } else if (tokens[i] === "-") {
      result += -(tokens[i + 1] as number);
    }
  }

  return result.toString();
}

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

  // Check for complex arithmetic expressions
  const hasMultipleOps =
    (query.toLowerCase().includes("plus") || query.toLowerCase().includes("minus")) &&
    (query.toLowerCase().includes("multiplied") || query.toLowerCase().includes("divided"));

  if (hasMultipleOps) {
    const result = evaluateArithmetic(query);
    if (result !== null) return result;
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
      const nums = numbers.map(Number);
      const difference = nums[0] - nums[1];
      return difference.toString();
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
      const result = Math.pow(base, exponent);
      return result.toLocaleString('en-US', { useGrouping: false });
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

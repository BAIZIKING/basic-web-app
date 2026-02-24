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

  return "";
}

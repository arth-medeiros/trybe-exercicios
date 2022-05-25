let primeNumber = 0;

for (let index = 0; index <= 50; index += 1) {
  let isPrime = true;
  for (let counter = 2; counter < index; counter += 1) {
      if (index % counter == 0) {
          isPrime = false;
          break;
      }
  }
  if (index > 1 && isPrime && primeNumber < index) {
      primeNumber = index;
  }
}

console.log(primeNumber);
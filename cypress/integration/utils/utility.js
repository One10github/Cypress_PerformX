function generateString() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const numbers = "0123456789";

  // Generate a random number between 0 and 25 for the first alphabet

  const randomAlphabetIndex = Math.floor(Math.random() * 26);

  // Generate a random number between 0 and 9 for the number

  const randomNumberIndex = Math.floor(Math.random() * 10);

  // Generate a random number between 0 and 25 for the second alphabet

  let randomAlphabetIndex2;

  do {
    randomAlphabetIndex2 = Math.floor(Math.random() * 26);
  } while (randomAlphabetIndex2 === randomAlphabetIndex);

  // Create the random string

  const randomString =
    alphabet.charAt(randomAlphabetIndex) +
    numbers.charAt(randomNumberIndex) +
    alphabet.charAt(randomAlphabetIndex2);

  return randomString;
}

export default generateString;

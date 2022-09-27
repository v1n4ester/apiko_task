export function getFirstLetters(str) {
    const firstLetters = str
      .split(' ')
      .map(word => word[0])
      .join('');
  
    return firstLetters.toUpperCase();
  }
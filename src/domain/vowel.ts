export type Vowel = 'a' | 'e' | 'i' | 'o' | 'u' | 'v';

const vowels = new Set<Vowel>([ 'a', 'e', 'i', 'o', 'u', 'v' ]);

export function isPriorityVowel(letter: string): letter is Vowel {
  return letter === 'a'
      || letter === 'e'
}

export function isVowel(letter: string): letter is Vowel {
  return vowels.has(letter as Vowel);
}

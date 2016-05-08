import { Question } from './question';
import { Character, toBasic } from '../lang-item/index';

export const normalize = (str: string): string => {
    return str.toLowerCase().trim();
}

export const validateSolution = (solution: string, question: Question): boolean => {
    if(question.type === 'english') {
        const transform = normalize;
        const comparison: (a: string, b: string | string[]) => boolean =
              (typeof question.english === 'string')
            ? (provided: string, answer: string): boolean => provided === transform(answer)
            : (provided: string, answer: string[]) => answer.map(transform).indexOf(provided) !== -1;
            
       return comparison(normalize(solution), question.english);
    } else if(question.type === 'pinyin') {
        const transform = (a: string) => normalize(a).replace(' ', '');
        
        return transform(solution) === transform(question.characters.map((character: Character) => toBasic(character.pinyin)).join());
    }
}

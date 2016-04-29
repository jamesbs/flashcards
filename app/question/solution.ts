import { Injectable } from 'angular2/core';
import { Question } from './question';

export const normalize = (str: string): string => {
    return str.toLowerCase().trim();
}

export const validateSolution = (solution: string, question: Question): boolean => {
    if(question.type === 'english') {
        const transform = normalize;
        const comparison: (a: string, b: string | string[]) => boolean =
              (typeof question.langItem.english === 'string')
            ? (provided: string, answer: string): boolean => provided === transform(answer)
            : (provided: string, answer: string[]) => answer.map(transform).indexOf(provided) !== -1;
            
       return comparison(normalize(solution), question.langItem.english);
    } else if(question.type === 'pinyin') {
        const transform = (a: string) => normalize(a).replace(' ', '');
        
        return transform(solution) === transform(question.langItem.pinyin);
    }
}

import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

interface getWordsPerProps {
  text?: string | null;
  numberOfWords?: number | null;
}

const numberOfWordsfromText = (text: string): number => {
  return text.split(' ').length;
};

const WORDS_PER_SECOND = 4;

export const getWordsPer = ({ text, numberOfWords = 0 }: getWordsPerProps) => {
  if (text === null && numberOfWords === null) {
    throw Error('"text" or "numberOfWords" should be provided');
  }

  dayjs.extend(duration);

  let numOfWords = numberOfWords;

  if (text) {
    numOfWords = numberOfWordsfromText(text);
  }

  const timeToRead = numOfWords! / WORDS_PER_SECOND;

  dayjs.duration(timeToRead, 'seconds').humanize();
};

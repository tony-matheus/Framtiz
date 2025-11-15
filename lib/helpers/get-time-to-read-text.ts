import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

interface getWordsPerProps {
  text?: string | null
  numberOfWords?: number | null
}

const numberOfWordsfromText = (text: string): number => {
  return text.split(" ").length
}

const WORDS_PER_SECOND = 4

export const getTimeToReadText = ({
  text,
  numberOfWords = 0,
}: getWordsPerProps) => {
  if (text === null && numberOfWords === null) {
    throw Error('"text" or "numberOfWords" should be provided')
  }

  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  let numOfWords = numberOfWords

  if (text) {
    numOfWords = numberOfWordsfromText(text)
  }

  const timeToRead = numOfWords! / WORDS_PER_SECOND

  return dayjs.duration(timeToRead, "seconds").locale("en").humanize()
}

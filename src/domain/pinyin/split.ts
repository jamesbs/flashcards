/** Splits a string of pinyin into a flat array of each syllable */
export const splitPinyin = (pinyin: string) => {
  let index = 0
  let pinyins: string[] = []
  let current = ''

  pinyin.split(/(\d)/)
    .filter(token => token !== '')
    .map(token => token.trim())
    .forEach(token => {
      if(index === 0) {
        current = token
        index = 1
      } else {
        pinyins.push(current + token)
        index = 0
      }
    })

  return pinyins
}

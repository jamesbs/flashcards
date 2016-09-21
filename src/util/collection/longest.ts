export const longest: (strings: string[]) => { match: string, index: number }
  = (strings: string[]) => {
    const result = strings.reduce(
      ({ match, index }, current, currentIndex) =>
        current.length > match.length
          ? { match: current, index: currentIndex }
          : { match, index },
        { match: '', index: -1 })

    return result.index === -1 ? undefined : result
  }


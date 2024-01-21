export interface CheckListItem {
  id: number
  label: string
}

export type CheckListItemState = Set<number>

export interface CheckListState {
  showCompleted?: boolean
  completed: CheckListItemState
}

export function isRangeComplete(
  state: CheckListItemState,
  startId: number,
  rangeLength: number,
) {
  for (let i = startId; i < startId + rangeLength; ++i) {
    if (!state.has(i)) {
      return false
    }
  }

  return true
}

const youVersionBookMap: Record<string, string> = {
  JOHN: 'JHN',
  JUDGES: 'JDG',
  PHILEMON: 'PHM',
}

const bookChapterRegEx = /(.*) (\d+(?:-\d+)?)$/

export function versionLink(label: string) {
  const [, book = label, chapters = '1'] = bookChapterRegEx.exec(label) ?? []
  const [ch1] = chapters.split('-')
  const bookUc = book.toUpperCase()
  const chAbbrev = youVersionBookMap[bookUc] ?? bookUc
  return `youversion://bible?reference=${chAbbrev.substring(0, 3)}.${ch1}`
}

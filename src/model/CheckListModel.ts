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

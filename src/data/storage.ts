import { CheckListItemState, CheckListState } from '../model'

const LOCAL_STORAGE_KEY = 'CHECK_LIST_STATE'

export function loadCheckListState(): CheckListState {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
  try {
    const {
      showCompleted,
      completed,
    }: { showCompleted?: boolean; completed: number[] } = JSON.parse(
      raw ?? '{}',
    )

    return { showCompleted, completed: new Set(completed) }
  } catch {}

  return {
    completed: new Set(),
  }
}

export function saveCheckListState({
  showCompleted,
  completed,
}: CheckListState): void {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      showCompleted,
      completed: [...completed],
    }),
  )
}

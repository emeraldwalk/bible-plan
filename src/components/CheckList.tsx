import { For, createEffect, createSignal } from 'solid-js'
import styles from './CheckList.module.scss'
import planText from '../data/five-day.txt?raw'
import { CheckListItem, isRangeComplete, versionLink } from '../model'
import { loadCheckListState, saveCheckListState } from '../data'
import { CheckBox } from './CheckBox'
import logo from '../assets/favicon-32x32.png'

export function CheckList() {
  const checkList: CheckListItem[] = planText
    .split('\n')
    .map((label, id) => ({ id, label }))

  const [checkListState, setCheckListState] = createSignal(loadCheckListState())

  const isWeekComplete = (weekStartId: number) => {
    return isRangeComplete(checkListState().completed, weekStartId, 5)
  }

  const showCompleted = () => {
    return checkListState().showCompleted ?? false
  }

  createEffect(() => {
    saveCheckListState(checkListState())
  })

  return (
    <div class={styles.CheckList}>
      <span>
        <img src={logo} />
        <span>ible Plan</span>
        <CheckBox
          isChecked={showCompleted()}
          onChange={() =>
            setCheckListState((s) => ({
              ...s,
              showCompleted: !s.showCompleted,
            }))
          }>
          Show Completed
        </CheckBox>
      </span>

      <ul>
        <For each={checkList}>
          {({ id, label }) => (
            <>
              {id % 5 === 0 ? (
                showCompleted() || !isWeekComplete(id) ? (
                  <li>
                    <label class={styles.WeekLabel}>Week {id / 5 + 1}</label>
                  </li>
                ) : null
              ) : null}
              {showCompleted() || !checkListState().completed.has(id) ? (
                <li>
                  <CheckBox
                    class={styles.CheckBox}
                    isChecked={checkListState().completed.has(id)}
                    onChange={(isChecked) => {
                      setCheckListState(({ showCompleted, completed }) => {
                        if (isChecked) {
                          completed.add(id)
                        } else {
                          completed.delete(id)
                        }

                        return {
                          showCompleted,
                          completed: new Set<number>(completed),
                        }
                      })
                    }}>
                    <span>{id + 1}</span>
                    {/* <span>{label}</span> */}
                    {label.split('; ').map((l) => (
                      <a href={versionLink(l)}>{l}</a>
                    ))}
                  </CheckBox>
                </li>
              ) : null}
            </>
          )}
        </For>
      </ul>
    </div>
  )
}

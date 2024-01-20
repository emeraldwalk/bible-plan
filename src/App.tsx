import type { Component } from 'solid-js'

import styles from './App.module.css'
import { CheckList } from './components'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <CheckList />
    </div>
  )
}

export default App

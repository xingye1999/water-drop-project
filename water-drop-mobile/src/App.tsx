import { Outlet } from "react-router-dom"

import styles from "./App.module.less"
import Bottom from "./component/Bottom"
import Header from "./component/Header"

/**
 * 公共组件，用于处理 header 和 bottom
 * @returns
 */
const App = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Bottom />
  </div>
)

export default App

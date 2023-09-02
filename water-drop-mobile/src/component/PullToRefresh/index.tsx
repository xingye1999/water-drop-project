import { AutoCenter } from "antd-mobile"
import { STATUS, TIPS, usePullToRefresh } from "./hooks"
import style from "./index.module.less"
interface IProps {
  children: React.ReactNode
  onRefresh: () => void
}
/**
 * 下拉刷新组件
 * @returns
 */

const PullToRefresh = ({ children, onRefresh }: IProps) => {
  const { status, containerRef } = usePullToRefresh(onRefresh)
  return (
    <div
      className={style.container}
      ref={containerRef}
    >
      {status !== STATUS.FINISH && <AutoCenter>{TIPS[status]}</AutoCenter>}
      {children}
    </div>
  )
}

export default PullToRefresh

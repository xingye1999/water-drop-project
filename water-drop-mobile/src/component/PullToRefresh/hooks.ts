import { useEffect, useRef, useState } from "react"
//最大偏移量
const MAX_Y = 100

//刷新状态
export const STATUS = {
  START: "start", //开始下拉刷新
  AWAIT: "await", //释放下拉刷新
  LOADING: "loading", //正在刷新
  SUCCESS: "success", //刷新成功
  FINISH: "finish", //完成
}

//刷新提示

export const TIPS = {
  [STATUS.START]: "开始下拉刷新",
  [STATUS.AWAIT]: "释放立即刷新",
  [STATUS.LOADING]: "正在刷新",
  [STATUS.SUCCESS]: "刷新成功",
}

export const usePullToRefresh = (onRefresh: () => void) => {
  //监听的dom
  const containerRef = useRef<HTMLDivElement>(null)
  //不同状态
  const [status, setStatus] = useState(STATUS.FINISH)
  //原来y偏移量
  const y = useRef(0)

  //组件加载完后，绑定监听事件 touchstart touchmove touchend
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.ontouchstart = (e) => {
      //阻止默认行为，防止下拉留白
      e.preventDefault()
      //判断当前页面滚动位置，0才可以进行下拉刷新
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY
      }
    }
    containerRef.current.ontouchmove = (e) => {
      e.preventDefault()
      if (document.documentElement.scrollTop === 0) {
        //计算是否达到最大偏移量
        if (e.touches[0].pageY - y.current > MAX_Y) {
          //触发刷新状态
          setStatus(STATUS.AWAIT)
          return
        }

        if (e.touches[0].pageY - y.current > 0) {
          //只要开始就设置开始下拉刷新状态
          setStatus(STATUS.START)
        }
      }
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchstart = null
        containerRef.current.ontouchmove = null
      }
    }
  }, [])

  useEffect(() => {
    //触发下拉结束事件
    if (!containerRef.current) return
    containerRef.current.ontouchend = async (e) => {
      e.preventDefault()
      //判断是否进行刷新
      if (status === STATUS.AWAIT) {
        setStatus(STATUS.LOADING)
        await onRefresh()
        setStatus(STATUS.SUCCESS)
        //过一段时间，显示完成
        setTimeout(() => {
          setStatus(STATUS.FINISH)
        }, 500)
        return
      }
      setStatus(STATUS.FINISH)
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchend = null
      }
    }
  }, [status]) //不加status永远是初始化的值

  return {
    status,
    containerRef,
  }
}

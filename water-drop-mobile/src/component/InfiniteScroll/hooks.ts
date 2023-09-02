import { useEffect, useState } from "react"
import _ from "lodash"
const OFFSET = 90

export const useDownLoad = ({ hasMore = false, loadMore = () => {} }) => {
  const [tips, setTips] = useState("")

  useEffect(() => {
    //监听scroll事件
    window.onscroll = _.debounce(async () => {
      //拿到可视区高度和距离顶部的高度
      const { clientHeight, scrollTop } = document.documentElement
      //整个内容区域的高度
      const { scrollHeight } = document.body
      if (hasMore && scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setTips("加载中...")
        await loadMore()
        setTips("加载完成")
        setTimeout(() => {
          setTips("")
        }, 1000)
      }
    }, 500)
    return () => {
      window.onscroll = null
    }
  }, [hasMore])

  return {
    tips,
  }
}

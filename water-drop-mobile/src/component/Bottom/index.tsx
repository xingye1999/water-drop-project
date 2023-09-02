import { TabBar } from "antd-mobile"
import { routes } from "@/routes/menus"
import { useGoTo, useMatchedRoute } from "@/hooks"

import style from "./index.module.less"
import SvgWrapper from "../SvgWrapper"

/**
 *  底部菜单组件
 */
const Bottom = () => {
  const route = useMatchedRoute()
  const { go } = useGoTo()
  // 菜单选择之后调用，然后跳转不同的路由
  const onTabChangeHandler = (key: string) => {
    console.log("route", route)
    go(key)
  }

  // 只有有菜单标记的页面需要底部的菜单选择器
  if (!route?.isMenu) {
    return null
  }

  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={is ? "#01979a" : "#999999"}
    />
  )

  return (
    <div className={style.container}>
      <TabBar
        onChange={onTabChangeHandler}
        activeKey={route?.key}
      >
        {routes
          .filter((it) => it.isMenu)
          .map((item) => (
            <TabBar.Item
              key={item.key}
              icon={(is) => iconRender(is, item.icon)}
              title={item.name}
            />
          ))}
      </TabBar>
    </div>
  )
}

export default Bottom

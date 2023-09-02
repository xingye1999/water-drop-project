import { MenuDataItem, ProLayout } from "@ant-design/pro-components"
import { Link, useNavigate, useOutlet } from "react-router-dom"
import style from "./index.module.less"
import { useUserContext } from "@/hooks/userHooks"
import { AUTH_TOKEN } from "@/utils/constants"
import { ROUTE_KEY, routes } from "@/routes/menu"
import { useGoTo, useIsOrgRoute } from "@/hooks"
import { Space, Tooltip } from "antd"
import { LogoutOutlined, ShopOutlined } from "@ant-design/icons"
import OrgSelect from "../OrgSelect"

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || "/"}>{dom}</Link>
)

/**
 * 外层框架
 */
const Layout = () => {
  //路由插槽
  const outLet = useOutlet()
  const { store } = useUserContext()
  const isOrg = useIsOrgRoute()
  const { go } = useGoTo()

  const nav = useNavigate()
  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, "")
    localStorage.setItem(AUTH_TOKEN, "")
    nav("/login")
  }

  const goToOrg = () => {
    go(ROUTE_KEY.ORG)
  }

  return (
    <ProLayout
      layout="mix"
      siderWidth={150}
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: "small",
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space
          size={20}
          onClick={logoutHandler}
        >
          <LogoutOutlined />
          退出
        </Space>,
      ]}
      title={false}
      logo={
        <img
          src="https://water-drop-xingye.oss-cn-hangzhou.aliyuncs.com/images/1691336501652.png"
          alt="logo"
        />
      }
      className={style.container}
      onMenuHeaderClick={() => nav("/")}
      route={{
        path: "/",
        routes: routes,
      }}
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title="门店管理">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      {/* key变化会自动重新渲染组件 */}
      <div key={store.currentOrg}>{outLet}</div>
    </ProLayout>
  )
}

export default Layout

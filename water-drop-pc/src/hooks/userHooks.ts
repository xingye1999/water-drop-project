import { useQuery } from "@apollo/client"
import { connectFactory, useAppContext } from "../utils/contextFactory"
import { GET_USER } from "../graphql/user"
import { IUser } from "../utils/type"
import { useLocation, useNavigate } from "react-router-dom"

const KEY = "userInfo"
const DEFAULT_VALUE = {}
export const useUserContext = () => useAppContext<IUser>(KEY)
//拿高阶组件
export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContext()
  const location = useLocation()
  const nav = useNavigate()
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, name, tel, desc, avatar } = data.getUserInfo
        setStore({ id, name, tel, desc, avatar, refetchHandler: refetch })
        if (
          location.pathname.startsWith("/login/") ||
          location.pathname === "/login"
        ) {
          nav("/")
        }
        return
      }
      setStore({ refetchHandler: refetch })
      // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
      if (location.pathname !== "/login") {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch })
      // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
      if (location.pathname !== "/login") {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    },
  })
  return { loading }
}

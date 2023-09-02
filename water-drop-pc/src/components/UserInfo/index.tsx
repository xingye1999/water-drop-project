import { IPropChild } from "@/utils/type"
import { connect, useGetUser } from "@/hooks/userHooks"
import { Spin } from "antd"

//获取用户信息组件
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser()
  return (
    <Spin spinning={loading}>
      <div>{children}</div>
    </Spin>
  )
}
export default connect(UserInfo)

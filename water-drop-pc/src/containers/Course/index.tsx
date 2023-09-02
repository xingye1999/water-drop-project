import { ICourse } from "@/utils/type"
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { getColumns } from "./constants"
import { useCourses } from "@/services/course"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useRef, useState } from "react"
import EditCourse from "./components/EditCourse"
import OrderTime from "./components/OrderTime"
import ConsumeCard from "./components/ConsumeCard"

const Course = () => {
  const actionRef = useRef<ActionType>()
  const { refetch } = useCourses()
  const [showInfo, setShowInfo] = useState(false)
  const [showOrderTime, setShowOrderTime] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [curId, setCurId] = useState("")
  console.log("course render")
  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id)
    } else {
      setCurId("")
    }
    setShowInfo(true)
  }

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false)
    if (isReload) {
      actionRef.current?.reload()
    }
  }

  const onOrderTimeHandler = (id: string) => {
    setCurId(id)
    setShowOrderTime(true)
  }

  const onCardHandler = (id: string) => {
    setCurId(id)
    setShowCard(true)
  }

  return (
    <PageContainer header={{ title: "当前门店下开设的课程" }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onOrderTimeHandler,
          onCardHandler,
        })}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button
            key="add"
            onClick={() => onClickAddHandler()}
            type="primary"
            icon={<PlusOutlined />}
          >
            新建
          </Button>,
        ]}
        request={refetch}
      />
      {showInfo && (
        <EditCourse
          id={curId}
          onClose={closeAndRefetchHandler}
        />
      )}
      {showOrderTime && (
        <OrderTime
          id={curId}
          onClose={() => setShowOrderTime(false)}
        />
      )}
      {showCard && (
        <ConsumeCard
          id={curId}
          onClose={() => setShowCard(false)}
        />
      )}
    </PageContainer>
  )
}

export default Course

import { ChromeOutlined, RedoOutlined } from "@ant-design/icons"
import { EditableProTable } from "@ant-design/pro-components"
import { Button, Col, Drawer, Row, Space, Tabs } from "antd"
import style from "./index.module.less"
import { DAYS, IDay, getColumns, getMaxKey, isWorkDay } from "./constants"
import { useState } from "react"
import { IOrderTime } from "@/utils/type"
import _ from "lodash"
import { useOrderTime } from "./hooks"

interface IProps {
  id: string
  onClose: (isReload?: boolean) => void
}

const OrderTime = ({ onClose, id }: IProps) => {
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0])

  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key) as IDay
    setCurrentDay(current)
    console.log("current", current)
  }

  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key)

  return (
    <Drawer
      title="编辑预约时间"
      width={720}
      open
      onClose={() => onClose()}
    >
      <Tabs
        type="card"
        items={DAYS}
        onChange={onTabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        loading={loading}
        recordCreatorProps={{
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: "12:00:00",
            endTime: "12:30:00",
          }),
        }}
        value={orderTime}
        editable={{
          onSave: async (rowKey, d) => {
            console.log("rowKey", rowKey)
            let newData = []
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) =>
                item.key === rowKey ? _.omit(d, "index") : { ...item }
              )
            } else {
              newData = [...orderTime, _.omit(d, "index")]
            }
            console.log("newData", newData)
            onSaveHandler(newData)
          },
          onDelete: async (key) => {
            onDeleteHandler(key as number)
          },
        }}
        headerTitle={
          <Space>
            选择
            <span className={style.name}>{currentDay.label}</span>
            的课开放预约的时间
          </Space>
        }
        rowKey="key"
        columns={getColumns(onDeleteHandler)}
      />
      <Row
        gutter={20}
        className={style.buttons}
      >
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: "100%" }}
            disabled={!isWorkDay(currentDay.key)}
            type="primary"
            onClick={allWorkDaySyncHandler}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: "100%" }}
            type="primary"
            onClick={allWeekSyncHandler}
            danger
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  )
}
export default OrderTime

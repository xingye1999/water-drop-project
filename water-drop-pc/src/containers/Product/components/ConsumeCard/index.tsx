import { Modal, Result, Row, Space, Typography } from "antd"
import { CheckCard } from "@ant-design/pro-components"

import { useLazyCards } from "@/services/card"
import style from "./index.module.less"
import { useEffect, useMemo, useState } from "react"
import { useEditProductInfo, useProductInfo } from "@/services/product"
import CourseSearch from "@/components/CourseSearch"
import _ from "lodash"
import { CreditCardOutlined } from "@ant-design/icons"
import { getCardName } from "@/utils/constants"

interface IProps {
  id: string
  onClose: (isReload?: boolean) => void
}

/**
 * 消费卡
 */
const ConsumeCard = ({ onClose, id }: IProps) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const { data: product, loading: getProductLoading } = useProductInfo(id)
  const [edit, editLoading] = useEditProductInfo()
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards()

  //对已绑定的消费卡和课程搜索的消费卡进行去重
  const newCards = useMemo(
    () => _.unionBy(product?.cards || [], cards, "id"),
    [cards, product?.cards]
  )

  console.log("product?.cards", product?.cards)

  useEffect(() => {
    setSelectedCards(product?.cards?.map((item) => item.id) || [])
  }, [product?.cards])

  const onOkHandler = () => {
    console.log(selectedCards)
    edit(
      id,
      {
        cards: selectedCards,
      },
      () => onClose()
    )
    console.log("newCards", newCards)
  }
  const onSelectedHandler = (courseId: string) => {
    getCards(courseId)
  }
  return (
    <Modal
      title="绑定消费卡"
      width="900"
      open
      onOk={onOkHandler}
      onCancel={() => onClose()}
    >
      <Row justify="end">
        <CourseSearch onSelected={onSelectedHandler} />
      </Row>
      <Row
        justify="center"
        className={style.content}
      >
        {newCards.length === 0 && (
          <Result
            status="warning"
            title="请搜索课程并选择对应的消费卡"
          />
        )}
        <CheckCard.Group
          multiple
          loading={getProductLoading || editLoading || getCardsLoading}
          onChange={(value) => {
            setSelectedCards(value as string[])
          }}
          value={selectedCards}
        >
          {newCards.map((item) => (
            <CheckCard
              key={item.id}
              value={item.id}
              size="small"
              avatar={<CreditCardOutlined />}
              title={[
                <Space direction="vertical">
                  <Space.Compact>
                    <Typography.Text
                      ellipsis
                      className={style.course}
                    >
                      {item.course?.name}
                    </Typography.Text>
                    {getCardName(item.type)}
                  </Space.Compact>
                  <Space.Compact>
                    <div>{item.name}</div>
                  </Space.Compact>
                </Space>,
              ]}
              description={
                <Space>
                  <span>
                    次数：
                    {item.time}
                  </span>
                  <span>
                    有效期：
                    {item.validityDay}
                  </span>
                </Space>
              }
            />
          ))}
        </CheckCard.Group>
      </Row>
    </Modal>
  )
}

export default ConsumeCard

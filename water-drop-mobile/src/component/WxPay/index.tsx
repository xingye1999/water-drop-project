import { NumberKeyboard, PasscodeInput, Popup, Toast } from "antd-mobile"
import { useMockOrder } from "@/services/order"
import style from "./index.module.less"

interface IProps {
  onClose: () => void
  amount: number
  visible: boolean
  productId: string
  quantity: number
  onFinish: () => void
}
/**
 * 微信支付窗
 */
const WxPay = ({
  onClose,
  visible,
  amount,
  productId,
  quantity,
  onFinish,
}: IProps) => {
  const { get } = useMockOrder()
  const onChangeHandler = (value: string) => {
    if (value.length > 5) {
      Toast.show({
        content: "购买成功",
      })
      get(productId, quantity, amount)
      onFinish()
    }
  }

  return (
    <Popup
      visible={visible}
      showCloseButton
      onMaskClick={() => {
        onClose()
      }}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      <div className={style.container}>
        <div className={style.title}>请输入支付密码</div>
        <div className={style.desc}>黑石支付服务平台</div>
        <div className={style.amount}>¥{amount}</div>
        <PasscodeInput
          seperated
          onChange={onChangeHandler}
          keyboard={<NumberKeyboard />}
        />
      </div>
    </Popup>
  )
}
export default WxPay

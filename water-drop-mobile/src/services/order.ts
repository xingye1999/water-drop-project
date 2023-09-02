import { GET_WXPAY_CONFIG, MOCK_ORDER } from "@/graphql/order"
import { TWxConfigQuery } from "@/utils/types"
import { useMutation } from "@apollo/client"

export const useWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxConfigQuery>(GET_WXPAY_CONFIG)

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    })

    return res.data?.getWxpayConfig.data
  }

  return {
    getWxConfig: getHandler,
    loading,
  }
}

/**
 * mock 订单数据
 */
export const useMockOrder = () => {
  const [get, { loading }] = useMutation(MOCK_ORDER)

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    })

    return res.data?.mockOrderGenerator.data
  }

  return {
    get: getHandler,
    loading,
  }
}

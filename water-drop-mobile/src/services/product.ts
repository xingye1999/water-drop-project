import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ORG_ID,
  GET_PRODUCT_TYPES,
} from "@/graphql/product"
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from "@/utils/constants"
import {
  IProduct,
  TProductQuery,
  TProductTypeQuery,
  TProductsQuery,
} from "@/utils/types"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Toast } from "antd-mobile"
import { useEffect, useRef, useState } from "react"

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES)

  return {
    data: data?.getProductTypes.data || [],
    loading,
  }
}

// 获取当前定位
export const getPosition = () =>
  new Promise<{ latitude: number; longitude: number }>((r) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        console.log("pos", pos)

        r({ latitude, longitude })
      },
      () => {
        r({ latitude: 0, longitude: 0 })
      },
      {
        timeout: 3000,
        maximumAge: 1000 * 60 * 30,
      }
    )
  })

/**
 * 获取商品列表
 * @param pageNum
 * @param pageSize
 * @param type
 */

export const useProducts = (name = "", type = "") => {
  //记住当前的页码
  const pn = useRef(1)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<IProduct[]>([])
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS)

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: "loading",
      content: "加载中…",
    })
    const { latitude, longitude } = await getPosition()
    console.log("latitude", latitude)
    console.log("longitude", longitude)
    const res = await get({
      fetchPolicy: "network-only",
      variables: {
        name,
        type: type === DEFAULT_TYPE ? "" : type,
        latitude,
        longitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted() {
        toast.close()
      },
    })

    return res.data?.getProductsForH5.data || []
  }

  const onRefreshHandler = async () => {
    // 重新初始化设置
    pn.current = 1
    //第一次加载用
    const res = await init()
    // 这里要提前对于更多值(hasMore)加一个判断，
    // 防止切换 type 的时候，hasMore 没有变成默认值
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
    setData(res)
  }
  const loadMoreHandler = async () => {
    //请求下一页值
    const res = await init(pn.current + 1)
    if (res.length > 0) {
      //当前页码加一
      pn.current += 1
      setHasMore(true)
      setData((old) => [...old, ...res])
    } else {
      setHasMore(false)
    }
  }

  useEffect(() => {
    onRefreshHandler()
  }, [name, type])

  return {
    data,
    onRefresh: onRefreshHandler,
    hasMore,
    loadMore: loadMoreHandler,
  }
}

export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(GET_PRODUCTS_BY_ORG_ID, {
    variables: {
      orgId,
    },
  })

  return data?.getProductsByOrgIdForH5.data
}

/**
 * 获取单个商品
 * @param id
 * @returns
 */
export const useProductInfo = (id?: string) => {
  const { data, loading } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  })

  return { data: data?.getProductInfo.data, loading }
}

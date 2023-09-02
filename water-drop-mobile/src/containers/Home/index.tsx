import { SearchBar } from "antd-mobile"
import style from "./index.module.less"
import { useState } from "react"
import TypeSelect from "./TypeSelect"
import { useProducts } from "@/services/product"
import ProductList from "./ProductList"

/**
 *
 */
const Home = () => {
  //模糊搜索
  const [name, setName] = useState("")
  //类别
  const [type, setType] = useState("")

  const onSearchHandler = (val: string) => {
    setName(val)
  }

  const onTypeChangeHandler = (key: string) => {
    setType(key)
  }

  return (
    <div className={style.container}>
      <SearchBar
        placeholder="搜索课程试试"
        onSearch={onSearchHandler}
      />
      <TypeSelect onChange={onTypeChangeHandler} />
      <ProductList
        name={name}
        type={type}
      />
    </div>
  )
}

export default Home

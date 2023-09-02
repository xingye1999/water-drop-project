import { LOCAL_CURRENT_ORG } from "./constants"

export const currentOrg = () => {
  try {
    const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || "")
    return res
  } catch (error) {
    return undefined
  }
}

import Home from "@/containers/Home"
import { ROUTE_KEY } from "./menu"
import My from "@/containers/My"
import Page404 from "@/containers/Page404"
import Org from "@/containers/Org"
import NoOrg from "@/containers/NoOrg"
import Course from "@/containers/Course"
import Student from "@/containers/Student"
import Product from "@/containers/Product"
import Teacher from "@/containers/Teacher"

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.PRODUCT]: Product,
  [ROUTE_KEY.TEACHER]: Teacher,
  [ROUTE_KEY.PAGE_404]: Page404,
}

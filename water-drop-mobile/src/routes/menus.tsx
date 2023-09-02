import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: string;
  isMenu?: boolean;
  hideHeader?: boolean; // 是否隐藏 header
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG_INFO: 'orgInfo',
  PRODUCT_INFO: 'productInfo',
  BUY: 'buy',
  EDIT_INFO: 'editInfo',
  MY_COURSE: 'myCourse',
  ORDER_COURSE: 'orderCourse',
  MY_CARD: 'myCard',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '',
    name: '精品课程',
    isMenu: true,
    icon: courseSvg,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '我的',
    isMenu: true,
    icon: mySvg,
  },
  [ROUTE_KEY.EDIT_INFO]: {
    path: 'editInfo',
    name: '编辑个人信息',
    isMenu: false,
  },
  [ROUTE_KEY.ORG_INFO]: {
    path: 'orgInfo/:id',
    name: '门店详情',
    isMenu: false,
  },
  [ROUTE_KEY.PRODUCT_INFO]: {
    path: 'productInfo/:id',
    name: '商品详情',
    isMenu: false,
  },
  [ROUTE_KEY.BUY]: {
    path: 'buy/:id',
    name: '购买信息',
    isMenu: false,
  },
  [ROUTE_KEY.MY_COURSE]: {
    path: 'myCourse',
    name: '我的课程表',
    isMenu: false,
  },
  [ROUTE_KEY.MY_CARD]: {
    path: 'myCard',
    name: '我的消费卡',
    isMenu: false,
  },
  [ROUTE_KEY.ORDER_COURSE]: {
    path: 'orderCourse',
    name: '预约课程',
    isMenu: false,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];

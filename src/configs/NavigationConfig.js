import { 
  DashboardOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'wasl',
  path: `${APP_PREFIX_PATH}/wasl`,
  title: 'WASL SERVICES',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'inquiry',
  path: `${APP_PREFIX_PATH}/inquiry`,
  title: 'Vehicle Inquiry',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'operation',
  path: `${APP_PREFIX_PATH}/operation`,
  title: 'Rental Operation Registration ',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'location',
  path: `${APP_PREFIX_PATH}/location`,
  title: 'Update Current Location',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
}

]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;

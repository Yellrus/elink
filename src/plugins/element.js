import Vue from 'vue';
import {
  Button,
  Link,
  Badge,
  Input,
  Select,
  Option,
  Radio,
  RadioGroup,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Icon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tooltip,
  Form,
  FormItem,
  Dialog,
  Row,
  Col,
  Card,
  Avatar,
  Tabs,
  TabPane,
  Loading,
  Notification,
  Message,
  Alert,
  Popover,
  Popconfirm,
  Drawer,
  DatePicker,
  InputNumber,
  Tag,
  Pagination,
  Scrollbar,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Button);
Vue.use(Link);
Vue.use(Badge);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Tooltip);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Avatar);
Vue.use(Alert);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Drawer);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(DatePicker);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Scrollbar);

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

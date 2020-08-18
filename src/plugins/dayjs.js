import dayjs from 'dayjs';
//import relativeTime from 'dayjs/plugin/relativeTime';
//import duration from 'dayjs/plugin/duration';
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

import 'dayjs/locale/ru';

dayjs.locale('ru');

//dayjs.extend(relativeTime);
//dayjs.extend(duration);

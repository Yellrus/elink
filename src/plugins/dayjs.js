import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

import 'dayjs/locale/ru';

dayjs.locale('ru');

dayjs.extend(relativeTime);

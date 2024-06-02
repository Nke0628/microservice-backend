import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import ja from 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo'); // デフォルトのタイムゾーンを東京に設定

export default dayjs;

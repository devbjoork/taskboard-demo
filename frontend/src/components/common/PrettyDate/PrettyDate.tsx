import { DateText } from './PrettyDate.styled';

const INTERVAL_SECOND = 1000;
const INTERVAL_MINUTE = 1000 * 60;
const INTERVAL_HOUR = 1000 * 60 * 60;
const INTERVAL_DAY = 1000 * 60 * 60 * 24;
const INTERVAL_MONTH = 1000 * 60 * 60 * 24 * 31;
const INTERVAL_YEAR = 1000 * 60 * 60 * 24 * 31 * 12;
const INTERVAL_INFINITE = Infinity;

const intervals = [
  INTERVAL_SECOND,
  INTERVAL_MINUTE,
  INTERVAL_HOUR,
  INTERVAL_DAY,
  INTERVAL_MONTH,
  INTERVAL_YEAR,
  INTERVAL_INFINITE,
];

const intervalText = ['second', 'minute', 'hour', 'day', 'month', 'year'];

/*
 < 1000ms * 1-59  (just now) 
 < 1000ms * 60 * 1-59 (1-59 minutes ago) 
 < 1000ms * 60 * 60 * 1-24 (1-24 hours ago) 
 < 1000ms * 60 * 60 * 24 * 1-31 (1-31 days ago) 
 < 1000ms * 60 * 60 * 24 * 31 * 1-12 (1-12 months ago)
 < 1000ms * 60 * 60 * 24 * 31 * 12 * n (n years ago) 
*/

const PrettyDate: React.FC<{ date: Date; isRaw?: boolean }> = ({
  date,
  isRaw = false,
}) => {
  const getRawTime = (date: Date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  const getPrettyTime = (date: Date) => {
    const dNow = new Date();
    const d = new Date(date);
    const delta = dNow.getTime() - d.getTime();
    let res = '';
    for (let i = 1; i < intervals.length; i++) {
      if (delta <= intervals[i]) {
        const timeNum = Math.floor(delta / intervals[i - 1]);
        const timeType =
          timeNum > 1 ? `${intervalText[i - 1]}s` : `${intervalText[i - 1]}`;
        res = i == 1 ? 'just now' : `${timeNum} ${timeType} ago`;
        break;
      }
    }

    return res;
  };

  return <DateText>{isRaw ? getRawTime(date) : getPrettyTime(date)}</DateText>;
};

export default PrettyDate;

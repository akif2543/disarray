const dateDiff = (date, now = Date.now()) => {
  const messageDate = date.getTime();
  return (now - messageDate) / (24 * 3600 * 1000);
};

const isYesterday = (now, notNow) => {
  const today = now.getDate();
  const notToday = notNow.getDate();
  if (today === 1) {
    const thisMonth = now.getMonth();
    switch (thisMonth) {
      case 2:
        const year = now.getYear();
        return year % 4 ? notToday === 28 : notToday === 29;
      case 3:
      case 5:
      case 8:
      case 10:
        return notToday === 31;
      default:
        return notToday === 30;
    }
  } else {
    return today - notToday === 1;
  }
};

export const sameDay = (prev, now) => {
  const last = new Date(prev);
  const curr = new Date(now);
  const diff = dateDiff(last, curr.getTime());
  return Math.floor(diff) === 0 && last.getDate() === curr.getDate();
};

export const formatDate = (date) => {
  const mDate = new Date(date);
  const diff = dateDiff(mDate);

  let dStr = mDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  dStr = dStr[0] === "0" ? dStr.slice(1) : dStr;

  const today = new Date();

  switch (Math.floor(diff)) {
    case 0:
      return mDate.getDate() === today.getDate()
        ? `Today at ${dStr}`
        : `Yesterday at ${dStr}`;
    case 1:
      return isYesterday(today, mDate)
        ? `Yesterday at ${dStr}`
        : mDate.toLocaleDateString();
    default:
      return mDate.toLocaleDateString();
  }
};

export const shortDate = (date) => {
  const dStr = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return dStr[0] === "0" ? dStr.slice(1) : dStr;
};

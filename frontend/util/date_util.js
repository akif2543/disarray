const dateDiff = (date) => {
  const now = Date.now();
  const messageDate = date.getTime();
  return Math.floor((now - messageDate) / (24 * 3600 * 1000));
};

export const formatDate = (date) => {
  const mDate = new Date(date);
  const diff = dateDiff(mDate);

  let dStr = mDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  dStr = dStr[0] === "0" ? dStr.slice(1) : dStr;

  const now = new Date();

  switch (diff) {
    case 0:
      return mDate.getDate() === now.getDate()
        ? `Today at ${dStr}`
        : `Yesterday at ${dStr}`;
    case 1:
      return `Yesterday at ${dStr}`;
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

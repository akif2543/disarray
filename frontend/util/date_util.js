const dateDiff = (date) => {
  const now = Date.now();
  const messageDate = date.getTime();
  return Math.floor((now - messageDate) / (24 * 3600 * 1000));
};

export const formatDate = (date) => {
  const mDate = new Date(date);
  const diff = dateDiff(mDate);

  switch (diff) {
    case 0:
      return `Today at ${mDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    case 1:
      return `Yesterday at ${mDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    default:
      return mDate.toLocaleDateString();
  }
};

export const shortDate = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

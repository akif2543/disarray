export const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

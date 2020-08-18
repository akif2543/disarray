export const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export const channelName = (input) =>
  input
    .replace(/[^\w\s-]/g, "")
    .replace(" ", "-")
    .replace("--", "-")
    .replace(/^-/, "")
    .toLowerCase();

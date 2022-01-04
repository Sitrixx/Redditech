export const BGCOLOR = "#0D4872"
export const DATA = [
    {
      id: "my_feed",
      title: "My feed",
    },
    {
      id: "popular",
      title: "Popular",
    },
    {
      id: "all",
      title: "All",
    },
  ];

export const SUB_URL = (str, start, end) => {
  return String(str.substring(start, end))
}
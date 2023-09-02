export const filterWhiteSpace = (string) =>
  string.replace(/(\r\n|\n|\r|\s)/gm, "", "").replace(" ", "");

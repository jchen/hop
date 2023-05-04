import { QuerySearch } from "../types";

export default class Google extends QuerySearch {
  static invocations = ["g"];
  static site = new URL("https://www.google.com");
  static searchUrl = new URL("https://www.google.com/search");
  static queryKey = "q";
  static doc = "Google Search";
}

import { paginate, querify } from "../utils";

describe("Utils", () => {
  describe("Querify", () => {
    test("should return a query string", () => {
      const object = {
        a: "b",
        c: "d"
      };

      const query = querify(object);

      expect(query).toBe("a=b&c=d");
    });
  });

  describe("Paginate", () => {
    test("should return same array if less than 10 pages", () => {
      const array = [1, 2, 3, 4, 5];
      const pages = paginate(1, array);
      expect(pages).toEqual(array);
    });

    test("should return shifted array if starting page is more than 5", () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      const pages = paginate(6, array);
      expect(pages).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    test("should return end of array if starting page >= length - 5", () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      const pages = paginate(13, array);
      expect(pages).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });
  });
});

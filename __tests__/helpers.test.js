const { format_date } = require("../utils/helpers");

test("format_date() returns clear date string", () => {
    const date = new Date("2021-03-19 14:57:04");

    expect(format_date(date)).toBe("3/19/2021");
});
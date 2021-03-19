const { format_date, format_plural } = require("../utils/helpers");

test("format_date() returns clear date string", () => {
    const date = new Date("2021-03-19 14:57:04");

    expect(format_date(date)).toBe("3/19/2021");
});

test("format_plural() returns string(s) correctly pluralized", () => {

    expect(format_plural(1, "Teddy Bear")).toBe("Teddy Bear");
    expect(format_plural(3, "Teddy Bear")).toBe("Teddy Bears");
});
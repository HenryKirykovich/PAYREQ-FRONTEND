import {daysUntil, timeInUTC} from "./date-utils"

it('timeInUTC test', () => {
    expect(timeInUTC("")).toEqual("");
    expect(timeInUTC("2021-03-23T00:00:00.000Z")).toEqual("2021-03-22T13:00:00.000Z");
});

it('days until - today', () => {
    expect(daysUntil("2021-03-23T00:00:00.000Z")).toEqual(0);
});

it('days until - tomorrow', () => {
    expect(daysUntil("2021-03-24T00:00:00.000Z")).toEqual(1);
});

it('days until - another month', () => {
    expect(daysUntil("2021-04-23T00:00:00.000Z")).toEqual(31);
});
import {getWaitPeriod, shouldSchedulePoll} from "./index";
import {JOB_STATUSES} from "./InboxDownloadResultView";

it('getWaitPeriod test', () => {
    expect(getWaitPeriod(1)).toEqual(1000);
    expect(getWaitPeriod(2)).toEqual(2000);
    expect(getWaitPeriod(3)).toEqual(3000);
    expect(getWaitPeriod(4)).toEqual(4000);
    expect(getWaitPeriod(5)).toEqual(5000);
    expect(getWaitPeriod(6)).toEqual(6000);
    expect(getWaitPeriod(7)).toEqual(7000);
    expect(getWaitPeriod(8)).toEqual(8000);
    expect(getWaitPeriod(9)).toEqual(9000);
    expect(getWaitPeriod(10)).toEqual(10000);
    expect(getWaitPeriod(11)).toEqual(10000);
    expect(getWaitPeriod(12)).toEqual(10000);
});

it('should scheduled poll while in progress', () => {
    expect(shouldSchedulePoll({job: {status: JOB_STATUSES.IN_PROGRESS}}, 1)).toEqual(true);
});

it('should not schedule poll when hits execution limit', () => {
    expect(shouldSchedulePoll({job: {status: JOB_STATUSES.IN_PROGRESS}}, 54)).toEqual(true);
    expect(shouldSchedulePoll({job: {status: JOB_STATUSES.IN_PROGRESS}}, 55)).toEqual(false);
});

it('should not schedule poll when job complete', () => {
    expect(shouldSchedulePoll({job: {status: JOB_STATUSES.DONE}}, 1)).toEqual(false);
});

it('should not schedule poll when job has errored', () => {
    expect(shouldSchedulePoll({job: {status: JOB_STATUSES.ERROR}}, 1)).toEqual(false);
});

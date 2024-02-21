import {getPITReportFiles} from "../src/filetools";
import {expect, test} from '@jest/globals';
import path from "node:path"

test('getPITREportFiles should find the test files with globs', async () => {
    const reports = await getPITReportFiles("**/mutations.xml");
    expect(reports.length).toBe(2);
    expect(reports[0]).toBe(path.normalize("__tests__/resources/mutations.xml"))
    expect(reports[1]).toBe(path.normalize("__tests__/resources_other/mutations.xml"))
 })
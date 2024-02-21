import {parseMutationReport} from "../src/pit_report";
import {expect, test} from '@jest/globals';
import fs from "fs/promises";

test('parseMutationReport should parse valid mutations.xml', async () => {
    const report = parseMutationReport(await fs.readFile("__tests__/resources/mutations.xml", {encoding: 'utf8'}));
    expect(report.mutations.mutation.length).toBe(8);
 })
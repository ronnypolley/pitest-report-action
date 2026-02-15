import {getPITReportFiles} from "../src/filetools";
import {expect, test, describe} from '@jest/globals';
import path from "node:path"

describe('getPITReportFiles', () => {
    test('should find the test files with glob pattern', async () => {
        const reports = await getPITReportFiles("**/mutations.xml");
        expect(reports.length).toBe(2);
        expect(reports[0]).toBe(path.normalize("__tests__/resources/mutations.xml"))
        expect(reports[1]).toBe(path.normalize("__tests__/resources_other/mutations.xml"))
    });

    test('should find single file with specific path', async () => {
        const reports = await getPITReportFiles("__tests__/resources/mutations.xml");
        expect(reports.length).toBe(1);
        expect(reports[0]).toBe(path.normalize("__tests__/resources/mutations.xml"))
    });

    test('should find files in specific directory', async () => {
        const reports = await getPITReportFiles("__tests__/resources/*.xml");
        expect(reports.length).toBe(1);
        expect(reports[0]).toBe(path.normalize("__tests__/resources/mutations.xml"))
    });

    test('should find all mutations.xml files in __tests__ directory', async () => {
        const reports = await getPITReportFiles("__tests__/**/mutations.xml");
        expect(reports.length).toBe(2);
        expect(reports).toContain(path.normalize("__tests__/resources/mutations.xml"));
        expect(reports).toContain(path.normalize("__tests__/resources_other/mutations.xml"));
    });

    test('should throw error when no files are found', async () => {
        await expect(getPITReportFiles("nonexistent/**/*.xml")).rejects.toThrow(
            'No matching files found for nonexistent/**/*.xml'
        );
    });

    test('should return relative paths from current working directory', async () => {
        const reports = await getPITReportFiles("__tests__/resources/mutations.xml");
        expect(reports[0]).not.toMatch(/^[A-Z]:/); // Should not be absolute path on Windows
        expect(reports[0]).not.toMatch(/^\//); // Should not be absolute path on Unix
    });
});


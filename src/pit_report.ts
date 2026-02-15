import { X2jOptionsOptional, XMLParser } from "fast-xml-parser";

export enum MutationStatus {
    KILLED, SURIVED, NO_COVERAGE
}

export interface Mutation {
    detected: boolean;
    status: MutationStatus;
    numberOfTestsRun: number;
    sourceFile: string;
    mutatedClass: string;
    mutatedMethod: string;
    methodDescription: string;
    lineNumber: number;
    mutator: string;
    indexes: Array<{index: number}>;
    blocks: Array<{block: number}>;
    killingTest: string;
    description: string;
}

export interface Mutations {
    mutation : Array<Mutation>;
}

export class Report{
    mutations: Mutations;

}

export function parseMutationReport(data: string): Report {
    const arrays = [
        "mutations.mutation",
        "mutations.mutation.indexes",
        "mutations.mutation.blocks"
    ]
    const options: X2jOptionsOptional = {
        ignoreAttributes: false,
        parseAttributeValue: true,
        isArray: (tagName, jPath, isLeafNode) => arrays.indexOf(jPath) !== -1
    }

    return new XMLParser(options).parse(data);
}
declare module 'jest-axe' {
    import { AxeResults } from 'axe-core';

    export interface JestAxe {
        (html: Element | string, options?: any): Promise<AxeResults>;
        configure: (options: any) => JestAxe;
    }

    export const axe: JestAxe;
    export const toHaveNoViolations: any;
}

import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

/// <reference types="vite/client" />

/**
 * Vite environment variables
 */
interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    readonly VITE_APP_URL?: string;
    readonly VITE_API_URL?: string;
}

/**
 * ImportMeta with Vite-specific properties
 */
interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: <T = unknown>(
        pattern: string,
        options?: { eager?: boolean; import?: string }
    ) => Record<string, () => Promise<T>>;
}

/**
 * Global window interface
 */
declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}

/**
 * Module declarations for asset imports
 */
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}

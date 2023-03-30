/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { BaseOperatingContext } from "./BaseOperatingContext";
import { IBridgeProxy } from "../naa/IBridgeProxy";
import { BridgeProxy } from "../naa/BridgeProxy";

export class TeamsAppOperatingContext extends BaseOperatingContext {

    protected bridgeProxy: IBridgeProxy | undefined = undefined;

    /*
     * TODO: Once we have determine the bundling code return here to specify the name of the bundle
     * containing the implementation for this operating context
     */
    static readonly MODULE_NAME: string = "";

    /**
     * Unique identifier for the operating context
     */
    static readonly ID: string = "TeamsAppOperatingContext";

    /**
     * Return the module name.  Intended for use with import() to enable dynamic import
     * of the implementation associated with this operating context
     * @returns
     */
    getModuleName(): string {
        return TeamsAppOperatingContext.MODULE_NAME;
    }
    /**
     * Returns the unique identifier for this operating context
     * @returns string
     */
    getId(): string {
        return TeamsAppOperatingContext.ID;
    }

    /**
     * Checks whether the operating context is available.
     * Confirms that the code is running a browser rather.  This is required.
     * @returns Promise<boolean> indicating whether this operating context is currently available.
     */
    async initialize(): Promise<boolean> {
        /*
         * TODO: Add implementation to check for presence of inject Nested App Auth Bridge JavaScript interface
         *
         */
        try {
            if (typeof window !== "undefined") {
                const bridgeProxy: IBridgeProxy = await BridgeProxy.create();
                this.bridgeProxy = bridgeProxy;
                this.available = bridgeProxy !== undefined;
            } else {
                console.log("window is undefined");
                this.available = false;
            }
        } catch (e) {
            console.log(e);
            this.available = false;
        } finally {
            return this.available;
        }
    }
}

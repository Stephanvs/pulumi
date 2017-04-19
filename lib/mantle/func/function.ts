// Copyright 2017 Pulumi, Inc. All rights reserved.

import * as arch from "../arch";
import * as config from "../config";
import * as aws from "@coconut/aws";
import {asset} from "@coconut/coconut";

// Function is a cross-cloud function abstraction whose source code is taken from a string, file, or network asset.
// For example, `https://gist.github.com/pulumi/fe8a5ae322ffe63fac90535eb554237f` will use a Gist published on GitHub,
// while `file://./hello.js` will load the code from a file named hello.js in the current working directory.  The
// default protocol is file://, so `hello.js` alone will likewise load a file named hello.js at deployment time.
export class Function {
    private readonly name: string;      // the function name.
    private readonly code: asset.Asset; // the function's code asset.

    constructor(name: string, code: asset.Asset) {
        this.name = name;
        this.code = code;
        this.initCloudResources();
    }

    // initCloudResources sets up the right resources for the given cloud and scheduler target.
    private initCloudResources(): void {
        let target: arch.Arch = config.requireArch();
        if (target.scheduler === arch.schedulers.Kubernetes) {
            this.initKubernetesResources();
        }
        else {
            switch (target.cloud) {
                case arch.clouds.AWS:
                    this.initAWSResources();
                    break;
                case arch.clouds.GCP:
                    this.initGCPResources();
                    break;
                case arch.clouds.Azure:
                    this.initAzureResources();
                    break;
                default:
                    throw new Error("Unsupported target cloud: " + target.cloud);
            }
        }
    }

    private initKubernetesResources(): void {
        throw new Error("Kubernetes FaaS not yet implemented");
    }

    private initAWSResources(): void {
        // TODO: don't hardcode the handler and runtime names.
        new aws.lambda.Function(this.name, {
            code:    this.code,
            handler: "index.handler",
            runtime: "nodejs6.10",
            role:    config.getAWSLambdaRole(),
        });
    }

    private initGCPResources(): void {
        throw new Error("Google Cloud Functions not yet implemented");
    }

    private initAzureResources(): void {
        throw new Error("Azure Functions not yet implemented");
    }
}

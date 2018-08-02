// Copyright 2016-2018, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package apitype

// CLIUpdateCheckRequest is the shape of the request we send to the service to see if the CLI version is out of
// date. We send the current version as part of the request, so the server can decide if it is old enough to
// show an outdated warning or not.
type CLIUpdateCheckRequest struct {
	CurrentVersion string `url:"currentVersion,omitempty"`
}

// CLIUpdateCheckResponse is the response from the server for checking version information about the CLI. When
// `ShowOutdatedWarning` is true, the CLI should print a warning advertising an upgrade to `LatestVersion`.
type CLIUpdateCheckResponse struct {
	LatestVersion       string `json:"latestVersion"`
	ShowOutdatedWarning bool   `json:"showOutdatedWarning"`
}

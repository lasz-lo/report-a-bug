# report-a-bug

**report-a-bug** aims to be an easy to use tool to get feedback from any web application or webpage. The client side is implemented with pure html/css/js, to ensure a maximum of compatibility to all clients.
Each report is saved to an individual file containing a timestamp and the app-identifier.

## Getting Started
### Setup
First step of setting up **report-a-bug** is to integrate the html/css component into your webpage. You can have a look at /src/client/index.html to get familiar with the structure and also tweak the looks by your liking.
Keep in mind to also put the script.js file into your desired directory.

Setup for the server is as simple as just running the application. Keep in mind that node.js is required to do so. I'm developing on version 8.12.0 but chances are that this works under different versions too. I have not tested it, though. If you happen to use another release I'd be happy to receive your feedback.

### Configuration
The configuration can simply be done via the two properties.json files, each located in /src/client or /src/server. Following is a list of properties, with a brief description.

- Client-Side:
    - app: supplies the app-identifier. Is matched against 'apps' on the server side.
    - server: contains the ip + port of the server component.
    - path: the individual path that is configured in the server properties.
    - maxChars: the maximum characters that a report might contain. This must not match with the maxChars of the server properties, but beware that a report will be rejected if exceeding the servers maximum characters property.

- Server-Side:
    - path: the individual path that a request must use.
    - port: the port that the server is listening on.
    - timeoutPerIp: the time in ms that must pass before the server accepts another report from one ip.
    - maxChars: the maximum characters that a report may contain. Beware that a report, exceeding this limit, will not be saved and instead dumped forever. You may want to set this to the same value as in the client properties or vice versa.
    - apps: an array containing valid app-identifiers. Every identifier in this list will be accepted when supplied by a request from the client-side.
## TODOs

- https support

### Notes

This software is free for everyone under the GPL v3. Note that this also excludes any warranty on completion or quality of the code. For further information read on the LICENSE file or look up GPL v3 using a search engine of your choice.
# report-a-bug

## Concept
**report-a-bug** aims to be an easy to use tool to get feedback from any web application. The client side is implemented with pure html/css/js, to ensure a maximum of compatibility to all clients.

The report is posted to /report and contains the actual text, that is entered by the user, as well as an app-identifier, that is saved alog the report with a timestamp.

To prevent massive spam from happening, the server only accepts one report per IP every 30 seconds. This can be changed in the index.js file of the server.

## Setup
To set up **report-a-bug**, you have to integrate the client-side component from /src/client. You can have a look at the index.html to get an idea of how to setup the client-side. You can also edit the **app** variable, to set it to your unique app-identifier. Make sure you also add it to the list of allowed apps in the index.js of the server. Note that you also have to supply the ip-adress of your server.

To set up the serve-side however, you just have to set the port and specify a list of identifier(s), which your apps may use. Make sure to test this properly, as the report gets dumped if not supplying a valid identifier. If done correctly, you just have to start the server via node.js.

## TODOs

- Properties file for the server. More information on which values one actually might want to change.


### Notes

This software is free for everyone under the GPL v3. Note that this also excludes any warranty on completion or quality of the code. For further information read on the LICENSE file or look up GPL v3 using a search engine of your choice.
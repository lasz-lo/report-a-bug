# report-a-bug

## Concept
**report-a-bug** aims to be an easy to use tool to get feedback from any web application. The client side is implemented with pure html/css/js, to ensure a maximum of compatibility to all clients.
___
## Setup
To set up **report-a-bug**, you have to integrate the client-side component from /src/client. You can have a look at the index.html to get an idea of how to setup the client-side. You can also edit the **app** variable, to set it to your unique app-identifier. Make sure you also add it to the list of allowed apps in the index.js of the server. Note that you also have to supply the ip-adress of your server.

To set up the serve-side however, you just have to set the port and specify a list of identifier(s), which your apps may use. Make sure to test this properly, as the report gets dumped if not supplying a valid identifier. If done correctly, you just have to start the server via node.js.
___
## TODOs

- migrate the js from src/client/index.html into a seperate script.js file.
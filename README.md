#LAN - Local Area Netflix

A simple project to create a React html/js browser hosted video playerfor local files

Takes a local file repository and sorts by folder tree, and displays cards with an image if found, additional subfolders if found a list of episodes, and then a video player

---------------------------------------------
ISSUES -

JS does not support local file access without user permission so the choice was between having it crash after the array reached capacity, or having it request file access for each individual file at event time, which was unfriendly to the user, so for now the data has been commented out.


---------------------------------------------
Dependencys -

Node
React- Icons

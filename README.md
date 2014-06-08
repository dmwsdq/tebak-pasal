tebak-pasal
===========

Quiz on UUD 1945 articles.
See the demo: http://tebakpasal.uphero.com/

The UUD 1945 text are taken from Wikisource ( http://id.wikisource.org/wiki/Undang-Undang_Dasar_Negara_Republik_Indonesia_Tahun_1945 )

#Instructions
Put all the files in the same folder. And these files as well:
+ plus jquery.min.js ( https://github.com/jquery/jquery )
+ plus toastr.min.js, toastr.min.css ( https://github.com/CodeSeven/toastr )

and you're good to go.

If you'd like to set up your own highscore database in your own server, do these to your MySQL database:

CREATE TABLE highscores(timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, name TEXT, ip TEXT, score INT)

make a table named "highscores", with fields of:
+ timestamp, type: TIMESTAMP, default: CURRENT_TIMESTAMP
+ name, type: TEXT
+ ip, type: TEXT
+ score, type: INT

Edit the php files inside xxxx folder with your details and upload them to your own server.
Then edit the ajax at fungsitp.js -> TERMINATION FUNCTIONS -> xxxx() and highScores(),
their url key should have the value of their respective php script url in your server.

#Changelogs
9 Jun 2014: changing the text to speech service to kumandang.com and fixing bugs on text to speech (i forgot to add the closing ' )

CC BY-NC-SA Darmawan Sidiq 2014

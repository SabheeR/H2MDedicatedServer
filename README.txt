Here is a step by step guide on how to create your own dedicated Modern Warfare 2 Remastered Server!


Download MWR from Steam: 

* you first need to purchase and download the official copy of Modern Warfare Remastered from the steam store:
https://store.steampowered.com/app/393080/Call_of_Duty_Modern_Warfare_Remastered_2017/

* In this tutorial, I'm using the official copy, but you are more than welcome to use the free H1 MWR version.

Download H2M Mod:

* After downloading MWR, you need to install the H2M mod using this link: https://github.com/V3nilla/H2M-MOD-Torrent-File

* You will need bitTorrent to download this version. There are zip versions out there, but this is the safest and easiest way to set this up.

* You can also install the free H1 version of MWR from this link.

* After downloading, move all H2M files in the MWR file directory. This directory can be found in the settings option in steam.

Download all the files from the 'Server Setup Files' directory in this repo.

H2M Server Setup:

* Move 'server_default.bat' and 'server_default.cfg' in the MWR directory.

* If you want bots in your server, move the 'user_scripts' folder in the H2M folder in your MWR directory.

* Open server_default.cfg to change server settings (server password, game details, etc.)

* The defualt password is 'yourpassword' and the defualt server name is '^2Default ^7Server'

* After making your changes, save the file and run the 'server_default.bat'

* This will reset any live servers and open up H2M. Give this a few minutes to run.

* Next, open powershell or cmd in admin mode and run this script:
netsh advfirewall firewall add rule name="H2M Mod allow" dir=in action=allow protocol=UDP localport=27016

* You can also look up your IP address using ipconfig. This will be the address you will use to connect to your server.

IWM4 Software Setup: 

* Next, you need to setup IWM4 Admin for your server. You can use the version in my repo, but for the latest version, use this link:
https://github.com/RaidMax/IW4M-Admin/releases/tag/2024.8.16.1-prerelease

* extract the files and open up 'StartIWM4Admin.bat' and follow these default steps:
(your options may be different based on the type of server you're making. For the sake of this tutorial, set everything to 'n')

- Enable webfronts? n
- Enable multiple owners? n
- Display social media link on webfront? n
- Enable server-side anti-cheat? n
- Enable profanity deterring? n

* let the migration run

- Enter Game Parser: 6 (H2M)
- Would you like IW4Admin to try to auto-determine server IP? n
- Enter server IP Address: (your IP, usually by default, it's localhost)
- server port: 27016 (may be different if you set server to different port)
- server RCon password: yourpassword (default password, may be different if you set a new password)
- Configuration saved, add another? n (unless you are setting up multiple servers)

* Let IWM4 establish connection with your server

If you run into an error, IWM4 will give you a link for troubleshooting.

After IWM4 has established a connection, you are ready to join your server!

Simply open up H2M, press ` on your keyboard to open up the command line, and type 'connect [your server IP]'

Enjoy playing COD like the old days!
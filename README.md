# MPM2
## Multiple People Making Music

Multiple users collaborate on an interactive audio/visual art exhibit.

Here are some demos and documents related to the project:
* Project Demo Video: [MPM2 Demo Video – YouTube](https://www.youtube.com/watch?v=lDrPAQl78dc)
* MPM2 MVP Document: [MPM2 MVP – Google Docs](https://docs.google.com/document/d/1JbRhZaKWOODtXd37rOMaf0eFnQ-lcVgyZ77g5flP2Tc/)
* Video of my Demo Day presentation: [Awesome Inc Demo Day – YouTube](https://www.youtube.com/watch?v=qnKe355iV3o)

## Getting Started

The site is currently being hosted locally. Users navigate to the provided web address to receive one of the following 7 parameters:
- Toggle synth (on - off)
- Pitch (100 - 1000Hz)
- Ping Pong Delay Feedback (0 - 150% --> any value over 100% will create a feedback loop)
- Chebyshev Waveshaper Dry/Wet (0 - 100%)
- Reverb Dry/Wet (0 - 50%)
- Toggle visualizer squares (fill - stroke only)
- Change visualizer square sizes (1 - 50)

Any user who joins in position 8 or later is added to the queue and sees an hourglass emoji. To clear out the user queue, simply refresh the "view" page. Users will once again be assigned new parameters when they refresh their page.

### Installing

Currently, the code only runs locally. If you want to run the program yourself, you may have to download the code and host locally.

**How to host locally**:

To host locally you will need to install the following software and packages:
- [PHP](https://www.php.net/downloads.php)
- [NPM](https://www.npmjs.com/get-npm)
- [MAMP](https://www.mamp.info/en/mamp/)
- [MySQL](https://www.mysql.com/downloads/)

1. Download the code from the [MPM2 GitHub Repo](https://github.com/robbiegay/mpm2)
2. In command line, navigate to the downloaded code directory. Run: `php artisan serve` to start the database server. Keep this running.
3. In a new terminal instance (same directory), run: `npm run watch`. This packages up you code, and watches for any updates. Keep this running as well.
4. Start MAMP. Under MAMP>Preference, make sure that POSTS->MySQL Port is set to "8889"
5. Create your database. In terminal (again, still in project directory) run: `php artisan migrate:fresh --seed`
6. (optional) To use a custom domain name:
  - Install Local Tunnel. In terminal: `npm install -g localtunnel`
  - Terminal: `lt --port 8000 --subdomain mpm2`
      - Port should be equal to the 4 digit number given to you when you ran php artisan serve (ex. 127.0.0.1:8000 --> set port to `--port 8000`). Change mpm2 to whatever custom subdomain you want to use (ex. `--subdomain myurl`).
      - If you get a permissions error, you may have to run `sudo npm install -g localtunnel`. Please only use Sudo after reading about the risks: [Don't use sudo with npm... still](https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-still-66e609f5f92)
7. Using either the URL given to you with `artisan serve` (ex. 127.0.0.1:8000) or from Local Tunnel (ex. https://test.localtunnel.me/), replace code in 3 files:
  - resources/js/components/Controller.js --> change all 9 instances. 
    - Note: you will need to keep keep the domain information after the "/" the same. Ex. https://test.localtunnel.me/api/newuser --> https://myurl.localtunnel.me/api/newuser
  - resources/js/components/SynthVisuals.js --> change all 3 instances
  - .env --> line 10, set `DB_HOST=` to your custom domain (ex. `DB_HOST=https://myurl.localtunnel.me/view`)
8. Start MySQL. Login using "localhost" and the username and password found in lines 13 and 14 of the .env file.
9. You can now load the "view" page on your device --> https://myurl.localtunnel.me/view Direct users to visit https://myurl.localtunnel.me to control the synth/visualizer.
  - Note: your device and all users must be on the same WIFI network

## Next Build

Known bugs:
- Until the user queue is implemented, a user will be able to press refresh 7 times and lock out any other users from controlling the device.

Features that I would like to add on the next build:
- Hosting on Google Cloud: Up until the code freeze deadline, I was attempting to get Google Cloud hosting to work. It appeared to be an issue with my choice of combining both React and Laravel in one project directory.
- User Queue: In the current implementation, the only way to clear the user queue is to refresh the "view" page — this clears users from the database. I began working on a timer function that would kick users out in certain scenarios, and would love to implement this in my next build. When users are kicked out:
  - [x] After 30 seconds of inactivity the user times out
  - [ ] If the user leaves the page, their parameter is opened up for a different user to control
- Styling of the user controllers: The original plan was to create unique control interfaces for each user. I think that this really enhances the artistic experience for each user.

## Built With

* [Laravel 6](https://laravel.com/) - The PHP framework used
* [React.js](https://reactjs.org/) - The JS library used
* [Bootstrap](https://getbootstrap.com/) - The CSS framework used
* [Tone.js](https://tonejs.github.io/) - The framework used to create the interactive synthesizer
* [Pts.js](https://ptsjs.org/) - The javascript library used to create the sound visualizer

## Contributing

If you've found a bug in my code, please feel free to send me an Issue!

## Authors

* **Robbie Gay** - [Robbie's Blog](https://robbiegay.github.io)

## Acknowledgments

* Thanks to [Justin](https://www.justinhall.com/) and [Ian](http://ianrios.me/) for helping me work through some major (11th hour) blockers!

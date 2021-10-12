## Code Snippets

### CSS

#### Select IDs starting with a number

```CSS
#12345       { /* Doesn't work!  */ }
[id="12345"] { /* Does work!     */ }
#\31 2345    { /* Works as well. */ }
```

Taken from this [CSS-Tricks article](https://css-tricks.com/ids-cannot-start-with-a-number/).

### HTML

#### Fix video thumbnails on iOS devices

In some cases, iOS devices will not display video thumbnails. To fix this, add `#t=0.001` to `src`, for example:

```HTML
<video src="video.mp4#t=0.001"></video>
```

Thanks to [Stanko Tadić](https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail/).

#### Theme-based stylesheets

```HTML
<link rel="stylesheet" href="light.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="dark.css" media="(prefers-color-scheme: dark)">
```

This is [not supported](https://caniuse.com/#feat=prefers-color-scheme) by IE and other lesser known browsers.

### JavaScript

#### Asynchronous functions in loops

```JS
const start = 0;
const end = 5;

for (i = start; i < end; i++) {
    setTimeout(() => {
        console.log(i); // -> 5, 5, 5, 5, 5
    });
};

function forSync(i) {
    setTimeout(() => {
        console.log(i); // -> 0, 1, 2, 3, 4
        if (i + 1 < end) forSync(i + 1);
    });
};
forSync(start);
```

This allows for asynchronous functions by placing the callback within that function.

#### Check if executable exists in PATH

```JS
const path = require("path");
const fs = require("fs");

process.env.PATH.split(path.delimiter).some(x => fs.existsSync(path.join(x, "node")));
```

#### Convert duration to seconds

```JS
input.split(":").reduce((p, c) => p * 60 + Number(c));

//       1 -> 1
//    1:00 -> 60
// 1:00:00 -> 3600
```

#### Expand Bootstrap accordions via URL

```JS
$(".collapsed[data-target='" + window.location.hash + "']")?.click();
```

Did I mention that [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) absolutely rocks?

#### Export promise with arguments

```JS
const module = require("./module");
module("Hello!").then(console.log); // -> Hello!

module.exports = (input) => {
    return new Promise((resolve, reject) => resolve(input));
};
```

`exports` won't work, only `module.exports` will!

#### Get DOM element from jQuery element

```JS
$("#foo")[0];
$("#foo").get(0);
```

Use either, see the [jQuery FAQ](https://learn.jquery.com/using-jquery-core/faq/how-do-i-pull-a-native-dom-element-from-a-jquery-object/).

#### insertAdjacentHTML() positions

```HTML
<!-- beforebegin -->
<parent>
	<!-- afterbegin -->
	<child></child>
	<!-- beforeend -->
</parent>
<!-- afterend -->
```

Copied from the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML).

#### Swap out variable values

```JS
var a = 1;
var b = 2;

[a, b] = [b, a];

console.log(a); // -> 2
console.log(b); // -> 1
```

You can also specify more (or less) than two variables.

#### Write to clipboard

```JS
navigator.clipboard.writeText("Text").then(function() {
    // Success!
}, function() {
    // Error!
});
```

This is not supported in IE, and Firefox [hides it behind a flag](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write#Browser_compatibility) in some cases.

### PHP

#### Temporarily disable Composer cache

```Bash
COMPOSER_CACHE_DIR=/dev/null composer
```

See the [Composer documentation](https://getcomposer.org/doc/03-cli.md#composer-cache-dir) for details.

#### Use PHP variables in variable names

```PHP
$foo = "bar";
$$foo = "baz";
echo $bar; // -> baz
```

Here, `$$foo` resolves to `$bar`!

### Other

#### Connect via ZOC from WinSCP

WinSCP → Options → Preferences → Applications → PuTTY/Terminal client path:

```CMD
"zoc.exe" /CONNECT:!U:!P@!@:!# "/RUN:%USERPROFILE%\Documents\ZOC8 Files\REXX\cd.zrx" "/RUNARG:!/"
```

%USERPROFILE%\Documents\ZOC8 Files\REXX\cd.zrx:

```
CALL ZocSend "cd '"ARG(1)"'^M"
```

#### Copy input to output on Linux

```Bash
cat input > output
cp input output
dd if=input of=output
tee < input > output
```

#### Change video framerate without interpolation or re-encoding

To convert a video with X FPS to a video with Y FPS, divide X by Y, and use the result like so:

```Bash
ffmpeg -itsscale X/Y -i input.mp4 -c copy output.mp4
```

This only accounts for video frames; the audio will not speed up or slow down.

#### Create new PostgreSQL user and database

```SQL
CREATE DATABASE database;
CREATE USER user WITH ENCRYPTED PASSWORD password;
GRANT ALL PRIVILEGES ON DATABASE database TO user;
```

#### Don't kill process when logging out

First, press CTRL+Z on the running command. Then:

```Bash
bg
disown -h
```

To bring it back after, for example, logging out and back in:

```Bash
fg
```

#### Don't kill user systemd units when logging out

```Bash
loginctl enable-linger
```

#### Fix error 0x80073D05 when installing Ubuntu on Windows

```PowerShell
Remove-Item -Recurse $env:LOCALAPPDATA/Packages/CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc
```

#### Install Docker on Raspberry Pi

```Bash
curl https://get.docker.com | sh
sudo usermod -aG docker $USER
sudo reboot
```

#### Open .URL files with default browser on Linux via Nemo

Right-click on any .URL file, select "Open With", "Other Application" and enter the following in the "Enter a custom command..." field:

```Bash
sh -c "cat %F | grep URL= | cut -d '=' -f2- | xargs xdg-open"
```

#### Pin retweets to Twitter profile

1. If applicable, undo the retweet of the respective tweet.
2. Open the browser's network inspector and retweet it again.
3. Open the response of the POST request to `retweet.json`.
4. Copy the root `id_str`.
5. Run `twurl -d "tweet_mode=extended&id=id_str" /1.1/account/pin_tweet.json`, replacing the `id_str` placeholder.

#### Re-use blocks in Caddyfile

```JS
(foo) {
    log
}

example.com {
    import foo
}
```

See the [Caddy documentation](https://caddyserver.com/docs/caddyfile/directives/import) for details.

#### Set up X11 on WSL 2

First, start an X11 server on the host machine, for example:

```CMD
vcxsrv.exe -ac -multiwindow
```

Then, update the DISPLAY variable with the appropriate IP address:

```Bash
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0
```

#### Use video as wallpaper on Linux

```Bash
xwinwrap -fdt -g 1920x1080      -ni -- mpv -wid WID --loop  LEFT.MP4 &
xwinwrap -fdt -g 1920x1080+1920 -ni -- mpv -wid WID --loop RIGHT.MP4 &
```

This example is optimized for my two-minitor setup and uses [xwinwrap](https://github.com/mmhobi7/xwinwrap) as well as [mpv](https://mpv.io/).

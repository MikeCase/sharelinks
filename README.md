# sharelinks
Simple chrome extension that allows you to scan a QRCode with your phone and open that link on your phone. 

# Tutorial

### How to write a simple, and useful chrome extension.

So first of all this is really my first tutorial, if you can call it that. So go easy on me. And now, onward.. I am going to show you how to create a chrome extension that is both simple, and useful.

### What's it do?

Have you ever needed to send a link from your browser to your mobile device? Well I've needed to (or wanted to rather). And this turns out to be a fairly simple process with a chrome extension. This will sit in your extensions bar, and when you click on it will display a QRCode of the link in the active tab. You will then be able to scan it with the QRCode scanner of your choice on your mobile device, and voila! The link opens on your phone.

### The concept and needed files. 

Google Chrome extensions are just extra bits of javascript that run in the background of your browser allowing you to accomplish medial tasks while you browse. This particular extension only needs a few pieces. 

First you'll need a `manifest.json` file. This file will configure your extension. 

The next files you will need is `popup.html` and `popup.js`. this file will be your view and logic. 

and the last file you will need is `qrcode.js`. This file a js library that allows you to generate a QRCode. You can get this file from [davidshimjs on github](https://github.com/davidshimjs/qrcodejs).

 ### Piecing it all together

`manifest.json` should have the following contents. 
```json
{
    "name": "Link Connector",
    "version": "0.1.0",
    "description": "Connect to links open on your computer, in you mobile device.",
    "permissions": ["tabs"],
    "background": {
        "scripts": ["qrcode.js"],
        "persistent": false
    },
    "browser_action": {
        "default_popup": "popup.html"
    },
    "manifest_version": 2
}
```

`popup.html` should have the following contents
```html
<!doctype html>
<html>
    <head>
        <title>Share Page Link</title>
    </head>
    <body>
        <div id="qrcode"></div>
        <div id="url"></div>
    </body>
        <script src="qrcode.js"></script>
        <script src="popup.js"></script>
</html>
```
In the above file contents you will see that you have two div's with id's of `qrcode` and `url`. These two lines are what our javascript in popup.js will be looking for to embed it's code. 

The two lines below the div's are to load the qrcode.js library and our popup.js into the html. You can read more about this here [W3C Script Tags](https://www.w3schools.com/tags/tag_script.asp)

last but not least, `popup.js` should have the following contents
```javascript
document.addEventListener('DOMContentLoaded', function(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var url = tabs[0].url;
        var qrcode = new; QRCode(document.getElementById('qrcode'), url);
        var link = document.getElementById('url').innerText = url;
    });

});
```
And last but not least our logic. There's not really as much going on here as it looks. Lets break this one down a little more than the others. 

1. We have `document.addEventListener('DOMContentLoaded', function(){` This tells javascript not to do anything until the content of the DOM (Document Object Model) is loaded. So when you click on the icon in your browser extension bar you will get a popup, but not until then. 

2. Next we give the callback function `chrome.tabs.query({active: true, currentWindow: true}, tabs => {` Inside of this callback function we will start generating our QRCode. 

3. Now we generate the QRCode itself.
```javascript
        var url = tabs[0].url;
        var qrcode = new; QRCode(document.getElementById('qrcode'), url);
```
In the above piece of code, we create a url variable, and create and show the qrcode variable. (creating the QRCode is basically an exact copy from the documentation at [davidshimjs on github](https://github.com/davidshimjs/qrcodejs) with the exception that we changed the hard coded link to the url variable we set earlier. 

4. Now all that's left to do is to display it. 
```javascript
var link = document.getElementById('url').innerText = url;
    });

});
```
This creates a variable called link that will be placed inside the html div with an id of url, the content of that innerText is the url variable we set earlier, which gives us essentially a label underneath the QRCode.

### The end

So that about sums it up. Pretty simple, all the code is right there for you to create this extension and use it, add to it make it better etc etc. If there's any questions or if you need some help let me know below. I will post the code to this on github in the next few days. [Github repository for tutorial](https://github.com/MikeCase/sharelinks)

Finally added a link to the project on github... That only took forever. If you want to clone the repository as a starting point for your own extension, feel free to do so.
Here's how to do that.
```
git clone https://github.com/MikeCase/sharelinks.git
```

Again please let me know if you have issues, see issues or want to offer advice, criticism(Constructive of course) leave a message!  


If you've made it this far, thank you for reading, and if you have any advice feel free to share it. As I said this is my first tutorial and I hope someone besides myself finds it useful. 

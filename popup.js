document.addEventListener('DOMContentLoaded', function(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var url = tabs[0].url;
        var qrcode = new QRCode(document.getElementById('qrcode'), url);
        // var link = document.getElementById('url').innerText = url;
    });

});
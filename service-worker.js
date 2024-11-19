var gainNode;
var audioCtx;
var streamer;
var source;
var prevFullScreen = false;
var startValue = 1; //100%
chrome.action.setPopup({ popup: "popup.html" });

chrome.runtime.onConnect.addListener(async (tab) => {
    chrome.runtime.onMessage.addListener(function (msg) {
        if (msg.action === 'give value') {
            port.postMessage(startValue);
            console.error('sent val' + startValue);
        }
        if (msg.action === 'start') {
            console.error("prev sound level: " + startValue);
        }
    });

    const existingContexts = await chrome.runtime.getContexts({}); //gets all the information associated with the browser, in this case looking for an offscreen document
    let streamer = false;

    const offscreenDocument = existingContexts.find(
        (c) => c.contextType === 'OFFSCREEN_DOCUMENT'
    );

    //Look for offscreen document, if none, create one
    if (!offscreenDocument) {
        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['USER_MEDIA'],
            justification: 'Streaming from chrome.tabCapture API'
        });
    } else {
        streamer = offscreenDocument.documentUrl.endsWith('#streaming');
    }

    // Get a MediaStream for the active tab.
    const streamId = await chrome.tabCapture.getMediaStreamId({
        targetTabId: tab.id
    });

    // Send the stream ID to the offscreen document to start streaming.
    chrome.runtime.sendMessage({
        type: 'start-streaming',
        target: 'offscreen',
        data: streamId
    });
});
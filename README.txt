Volume Controller

Limitations: Bar value does not save when closing the extension popup and re-opening, but volume level does.

Add to manifest.json: 
    "permissions": ["tabCapture", "activeTab", "offscreen"],
    "background": {"service_worker": "service-worker.js"}

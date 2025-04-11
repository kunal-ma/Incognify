chrome.action.onClicked.addListener(tab => {
    chrome.windows.getAll({ populate: false }, windows => {
        // Toggle between normal and incognito mode
		const targetIncognito = !tab.incognito; 

        // Find an existing window of the desired type
        const existingWindow = windows.find(win => win.incognito === targetIncognito);

		// If a suitable window exists, open a new tab in that window and focus it
        if (existingWindow) {
            chrome.tabs.create({ windowId: existingWindow.id, url: tab.url, active: true }, () => {
                chrome.windows.update(existingWindow.id, { focused: true, state: "maximized" });
            });
        }

		// If no suitable window exists, create a new one and focus it
		else {
            
            chrome.windows.create({
                url: tab.url,
                incognito: targetIncognito,
                focused: true,
                state: "maximized"
            });
        }
    });
});

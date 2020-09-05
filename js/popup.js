$(function () {
    function copy(){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
                alert(response.book_title)
                var win = chrome.extension.getBackgroundPage();
                win.data = response;
            });
        });
    }

    function paste() {
        var win = chrome.extension.getBackgroundPage();
        if (win.data) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
                    console.log(response);
                });
            });
        }
    }
    function toggle(e){
        let box = $("#shortcut input")
        alert(box[0].checked)
        e.stopPropagation()
    }
    $("#btnCopy").click(() => { copy() });
    $("#btnPaste").click(() => { paste() });
    $("#shortcut").click((e) => { toggle(e) });
});
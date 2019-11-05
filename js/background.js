// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var rule = []
rule.push({
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: 'khome.wicp.vip'},
  })
  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
})
rule.push({
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: 'book.douban.com'},
  })
  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
})

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules(rule);
});

window.data = null;
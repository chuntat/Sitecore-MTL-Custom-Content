/* ----------- DO NOT EDIT BELOW ----------- */
// ==UserScript==
// @name         Sitecore Content Apps
// @version      1.0
// @author       Chun Tat Leow - (Special thanks to William Garrison)
// @match        https://p.socialstudio.radian6.com/publish/*
// @match        https://mc.s4.exacttarget.com/cloud/#app/Social%20Studio/*
// @grant        none
// ==/UserScript==

var replaceArry = [
/*
  _____ ____ ___ _____   _   _ _____ ____ _____
 | ____|  _ \_ _|_   _| | | | | ____|  _ \| ____|
 |  _| | | | | |  | |   | |_| |  _| | |_) |  _|
 | |___| |_| | |  | |   |  _  | |___|  _ <| |___
 |_____|____/___| |_|   |_| |_|_____|_| \_\_____|

Add strings into the replacement array in the form of
[/Words to find/gi,'Words to replace'],
*/

    [/NTO Drive/gi,'Sitecore CMS'],
    
/*
  _____ _   _ ____     ___  _____   _____ ____ ___ _____ ____
 | ____| \ | |  _ \   / _ \|  ___| | ____|  _ \_ _|_   _/ ___|
 |  _| |  \| | | | | | | | | |_    |  _| | | | | |  | | \___ \
 | |___| |\  | |_| | | |_| |  _|   | |___| |_| | |  | |  ___) |
 |_____|_| \_|____/   \___/|_|     |_____|____/___| |_| |____/
*/
];

var numTerms    = replaceArry.length;
var transTimer  = setInterval (translateTermsOnPage, 0);

function translateTermsOnPage () {

    var txtWalker   = document.createTreeWalker (
        document.body,
        NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (node.nodeValue.trim() ) {
                    if (node.tmWasProcessed)
                        return NodeFilter.FILTER_SKIP;
                    else
                        return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_SKIP;
            }
        },
        false
    );
    var txtNode     = null;
    while (txtNode  = txtWalker.nextNode()) {
        txtNode.nodeValue       = replaceAllTerms (txtNode.nodeValue);
        txtNode.tmWasProcessed  = true;
    }
    var placeholderNodes    = document.querySelectorAll ("[placeholder]");
    replaceManyAttributeTexts (placeholderNodes, "placeholder");

    var titleNodes          = document.querySelectorAll ("[title]");
    replaceManyAttributeTexts (titleNodes, "title");
}

function replaceAllTerms (oldTxt) {
    $('[data-id="3745fd8b-0a8e-4bd0-8d1e-e7c3d3048f46"]').remove(); //removes NTO Drive app-list-item

    $("[class='inspector__body apps-springboard']").find('ul').append("<li class='app-list-item' data-id='3745fd8b-0a8e-4bd0-8d1e-e7c3d3048f46'><div class='app-icon'><img width='100px' height='100px' src='http://image.s4.exct.net/lib/fe8e1574746203787c/m/1/fb94acb7-0d4b-4e86-87c2-a14c7a00c227.png'></div><h4 class='semibold'>Sitecore CMS</h4></li>");


    for (var J  = 0;  J < numTerms;  J++) {
        oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
    }
    return oldTxt;
}

function replaceManyAttributeTexts (nodeList, attributeName) {

    $('[class="apps-panel__head-logo"]').remove(); //removes inspector image when you click into the image repo

    for (var J = nodeList.length - 1;  J >= 0;  --J) {
        var node    = nodeList[J];
        var oldText = node.getAttribute (attributeName);
        if (oldText) {
            oldText = replaceAllTerms (oldText);
            node.setAttribute (attributeName, oldText);
        }
    }
}

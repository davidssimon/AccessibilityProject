/*
 * @param failedAuditKeywords is a JSON object. All the keys are links to dequeUniversity. All values are arrays of keywords relating to which accessibility features are affected. The array may be empty.
 * "screen_reader" means that text to speech is negatively impacted.
 * "aria" means that text to speech is negatively impacted.
 * "contrast" means that something does not have high enough contrast. (You should enable the contrast tool)
 * 
 */

function respondToFailedAudits(failedAuditKeywords) {
    for (const i of failedAuditKeywords) {
        // if (failedAuditKeywords[i].find("aria") != undefined) {console.log("A failed audit suggests that text-to-speech is negatively impacted")}
    }
}

// regex search query for 
const reAUDITDESCRIPTIONURL = /(?<=\()https\:\/\/dequeuniversity.com.+(?=\))/;
const failedAuditResponses = {
    // ARIA/screen reader WHITELIST failures (AKA screen reader has limited capability)
    "aria": ["`<html>` element does not have a `[lang]` attribute", "Buttons do not have an accessible name", "Tables do not use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.", "Links do not have a discernible name", "`<dl>`'s do not contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements."],
    // contrast WHITELIST faliures
    "contrast": ["Links rely on color to be distinguishable."],
    // illegibility, but not contrast, fWHITELIST failures
    "illegibility": [],

    // speech INPUT
    "speech": ["Elements with visible text labels do not have matching accessible names."],

    // magnifier related
    "size": ['`[user-scalable="no"]` is used in the `<meta name="viewport">` element or the `[maximum-scale]` attribute is less than 5.']
}

const dequeUniversityKeywords = {
    "https://dequeuniversity.com/rules/axe/4.10/label": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/landmark-one-main": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-meter-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/meta-refresh": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/heading-order": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/tabindex": [],
    "https://dequeuniversity.com/rules/axe/4.10/html-has-lang": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/frame-title": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/html-xml-lang-mismatch": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-required-children": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/link-name": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/select-name": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/valid-lang": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-treeitem-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/duplicate-id-aria": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/empty-heading": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/listitem": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/accesskeys": [],
    "https://dequeuniversity.com/rules/axe/4.10/table-fake-caption": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-text": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/input-button-name": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/form-field-multiple-labels": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/object-alt": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/td-headers-attr": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-required-parent": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/document-title": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-command-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/td-has-header": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/meta-viewport": [],
    "https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/target-size": [],
    "https://dequeuniversity.com/rules/axe/4.10/button-name": ["screen_reader", "aria"],
    "https://dequeuniversity.com/rules/axe/4.10/bypass": [],
    "https://dequeuniversity.com/rules/axe/4.10/image-redundant-alt": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/table-duplicate-name": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/image-alt": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/link-in-text-block": ["contrast"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/list": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/video-caption": [],
    "https://dequeuniversity.com/rules/axe/4.10/dlitem": [],
    "https://dequeuniversity.com/rules/axe/4.10/html-lang-valid": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose": [],
    "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/input-image-alt": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/color-contrast": ["contrast"],
    "https://dequeuniversity.com/rules/axe/4.10/skip-link": ["screen_reader"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-roles": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/aria-required-attr": ["aria"],
    "https://dequeuniversity.com/rules/axe/4.10/definition-list": ["screen_reader"]
}

/*
 * @param urlToCheck URL that will be audited
 * sets up the API fetch URL (querystring included)
 */
function setUpQuery(urlToCheck) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        category: "ACCESSIBILITY"
    };
    let query = `${api}?` + `url=${encodeURIComponent(urlToCheck)}`;
    for (key in parameters) {
        query += `&${key}=${parameters[key]}`;
    }
    return query;
}

/*
 * Returns a string with "psi.js"'s recognized failure type, if found. Returns "Other" otherwise.
 */
// function checkFailure(title) {
//     let array;
//     for (const failureType in failedAuditResponses) {
//         array = failedAuditResponses[failureType];
//         for (let i of array) {
//             if (title == i) {
//                 return failureType;
//             }
//         }
//     }

//     return "Other";
// }

// function findAuditType(dequeUniversityUrl) {
//     fetch(dequeUniversityUrl).then(response => {
//         switch (response.status) {
//             case 200: // OK
//                 console.log(response.text());
//                 break;
//             default:
//                 console.log(response);

//                 console.log("weird dequeuUniversityURL response");
//                 break;
//         }
//     });

//     // var xhr = new XMLHttpRequest();
//     // xhr.open('GET', dequeUniversityUrl, true);
//     // xhr.onreadystatechange = function () {
//     //     if (xhr.readyState === 4) {
//     //         console.log(xhr.responseText);
//     //     }
//     // };
//     // xhr.send(null);
// }

/*
 * @param urlToCheck
 * returns void.
 */
function run(urlToCheck) {
    // findAuditType("https://dequeuniversity.com/rules/axe/4.10/image-alt");
    const url = setUpQuery(urlToCheck);
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            // json = JSON.parse(JSON.stringify(json));
            // console.log(`Audit information received: ${json}`);

            // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
            // to learn more about each of the properties in the response object.
            // showInitialContent(json.id);


            const lighthouse = json.lighthouseResult;

            console.log("I'm starting to look at the audit results!");
            let currentElement;
            let currentAudit;
            let currentAuditTitle;
            let currentAuditType;
            let totalScore = 0;
            for (const key in lighthouse["audits"]) {

                currentElement = document.createElement("p");
                currentElement.textContent = `${lighthouse["audits"][key]["title"]}`;
                document.body.appendChild(currentElement);

                currentAudit = lighthouse["audits"][key];

                try {
                    if (currentAudit["score"] === 0) {
                        console.log(dequeUniversityKeywords[currentAudit["description"].match(reAUDITDESCRIPTIONURL)[0]]);
                    }
                } catch {
                    console.log("oof");
                    if (currentAudit["score"] != null) { // failure case (manual checks will have a "null" score)
                        console.log(`Failed regex search: ${currentAudit["description"]}`);

                    }
                }
            }

            // currentElement = document.createElement('p');
            // currentElement.textContent = `Total score: ${totalScore}`;
            // document.body.appendChild(currentElement);
            console.log(`I'm done looking at the audit results! The audit has a total score of: ${totalScore}`);
        });
}

// link is the param
// run("https://wikipedia.org");
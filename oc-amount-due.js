// ==UserScript==
// @name         Openclassrooms
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://openclassrooms.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    const autoFinancedStudents = ["Abderrazzak Bourmou", "Donovan Keribin", "Kenny Rotger"];

    function getSessionsAmount(sessions) {
        var total = 0;
        for(var i = 0; i<sessions.length; i++) {
            let amount = 0;
            if (sessions[i].status == 'canceled') {
                continue;
            }

            if (sessions[i].projectLevel == '1') {
                amount = 30;
            }

            if (sessions[i].projectLevel == '2') {
                amount = 35;
            }

            if (sessions[i].projectLevel == '3') {
                amount = 40;
            }

            if (autoFinancedStudents.includes(sessions[i].recipient.displayableName)) {
                amount = amount / 2;
            }

            if (sessions[i].type == 'presentation') {
                amount = 30;
            }

            total += amount;
        }

        return total;
    }

    async function getData(mindate, maxdate, page) {
        var headers = {"Authorization": "Bearer " + localStorage.getItem('7xPFDY3bB3ruX44z__oc-sdk-access-token')};
        var url = "https://api.openclassrooms.com/users/8858490/sessions?actor=expert&life-cycle-status=canceled%2Ccompleted%2Clate%20canceled%2Cmarked%20student%20as%20absent&before="+maxdate+"T23%3A00%3A00Z&after="+mindate+"T23%3A00%3A00Z";

        headers.range = 'items=' + ((page - 1) * 20) + '-' + (page * 20 - 1);
        return fetch(url, {headers: headers}).then(response => {
            return response.json();
        });

    }

    async function getMonthAmount(year, month) {
        var mindate = new Date(year, month, 0);
        var maxdate = new Date(year, month + 1 , 0);
        mindate = mindate.getFullYear()+'-'+(mindate.getMonth() + 1)+'-'+mindate.getDate();
        maxdate = maxdate.getFullYear()+'-'+(maxdate.getMonth() + 1)+'-'+maxdate.getDate();

        var sessionNumber = 20;
        var page = 1;
        var totalAmount = autoFinancedStudents.length * 30;
        while (sessionNumber == 20) {
            var sessions = await getData(mindate, maxdate, page);
            totalAmount += getSessionsAmount(sessions);

            sessionNumber = sessions.length;
            page++;
        }

        return totalAmount;
    }

    let previousMonthAmount = await getMonthAmount(new Date().getFullYear(), (new Date().getMonth() - 1));
    let currentMonthAmount = await getMonthAmount(new Date().getFullYear(), (new Date().getMonth()));

    let previousMonthHtml = `<hr><div style="padding: 4px 16px;">Total du mois précédent: ` + previousMonthAmount + `€</div>`;
    document.getElementById('main-header-menu').innerHTML += previousMonthHtml;

    let currentMonthHtml = `<hr><div style="padding: 4px 16px;">Total du mois en cours: ` + currentMonthAmount + `€</div>`;
    document.getElementById('main-header-menu').innerHTML += currentMonthHtml;
})();

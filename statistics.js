var statistics = {
    numDem: 0,
    numRep: 0,
    numInd: 0,
    withRep: 0,
    withDem: 0,
    leastloyalvotes: 0,
    mostloyalvotes: 0,
    leastengagedvotes: 0,
    mostengagedvotes: 0,
};

var data;
var members;
var tenpercent;

var numRep = [];
var numDem = [];
var numInd = [];
var total = [];
var leastloyalvotes = [];
var mostloyalvotes = [];
var leastengagedvotes = [];
var mostengagedvotes = [];

var withRep;
var withDem;

function calljson() {
    if (document.getElementById("house") != null) {
        fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
            method: "GET",
            headers: {
                'X-API-Key': 'JebvTH0Lq21PLdfWFIuBKejtHMcEmKRjW4Qq1txN'
            }

        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            members = data.results[0].members;
            var numMemb = members.length;
            var membersten = members.length * 0.1;
            var tenpercent = Math.round(membersten);
            memnumbers();
            mempercent();
            leastloyal();
            mostloyal();
            leastengaged();
            mostengaged();
            tablefillglance();
            conditions();


        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });
    } else if (document.getElementById("senate") != null) {
        fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
            method: "GET",
            headers: {
                'X-API-Key': 'JebvTH0Lq21PLdfWFIuBKejtHMcEmKRjW4Qq1txN'
            }

        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            members = data.results[0].members;
            var numMemb = members.length;
            var membersten = members.length * 0.1;
            var tenpercent = Math.round(membersten);
            memnumbers();
            mempercent();
            leastloyal();
            mostloyal();
            leastengaged();
            mostengaged();
            tablefillglance();
            conditions();


        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });

    }
}

calljson();

function memnumbers() {
    for (var m = 0; m < members.length; m++) {
        var numParty = members[m].party;
        if (numParty == "R") {
            numRep.push(members[m]);
        }
        if (numParty == "D") {
            numDem.push(members[m]);
        }
        if (numParty == "I") {
            numInd.push(members[m]);
        }
    }
    statistics.numRep = numRep.length;
    statistics.numDem = numDem.length;
    statistics.numInd = numInd.length;
}

function mempercent() {

    var temp = 0;
    var temp2 = 0;

    for (var p = 0; p < members.length; p++) {

        if (members[p].party == "R") {
            withRep = members[p].votes_with_party_pct;
            temp = temp + withRep;
        }

        if (members[p].party == "D") {
            withDem = members[p].votes_with_party_pct;
            temp2 = temp2 + withDem;
        }
    }

    var repTotal = Math.round(temp / statistics.numRep * 100) / 100;
    var demTotal = Math.round(temp2 / statistics.numDem * 100) / 100;
    //    console.log(repTotal);
    //    console.log(demTotal);

    statistics.withRep = repTotal;
    statistics.withDem = demTotal;
}

function leastloyal() {

    var memcopy = members.slice(0);

    memcopy.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    var membersten = members.length * 0.1;
    var tenpercent = Math.round(membersten);

    for (var v = 0; v < tenpercent; v++) {
        var missedV = memcopy[v];
        leastloyalvotes.push(missedV);
    }

    for (var j = 0; j < members.length; j++) {
        var more = members[j].missed_votes_pct;
        if (more == missedV[missedV.length - 1]) {
            leastloyalvotes.push(more);
        }
    }
    statistics.leastloyalvotes = leastloyalvotes;
}

function leastloyalvotestable() {

    var table = document.getElementById("senate-least-loyal");
    var tblBody = document.createElement("tbody");

    for (var least = 0; least < leastloyalvotes.length; least++) {
        var row = document.createElement("tr");

        var columnmost = document.createElement("td");
        columnmost.innerHTML = leastloyalvotes[least].first_name;
        var columnmost2 = document.createElement("td");
        columnmost2.innerHTML = leastloyalvotes[least].missed_votes;
        var columnmost3 = document.createElement("td");
        columnmost3.innerHTML = leastloyalvotes[least].missed_votes_pct;

        row.appendChild(columnmost);
        row.appendChild(columnmost2);
        row.appendChild(columnmost3);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
}

function mostloyal() {

    var memcopy2 = members.slice(0);

    memcopy2.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });

    var membersten = members.length * 0.1;
    var tenpercent = Math.round(membersten);
    
    for (var v = 0; v < tenpercent; v++) {
        var missedV2 = memcopy2[v];
        mostloyalvotes.push(missedV2);
    }

    for (var j = 0; j < members.length; j++) {
        var more2 = members[j].missed_votes_pct;
        if (more2 == missedV2[missedV2.length - 1]) {
            mostloyalvotes.push(more2);
        }
    }
    statistics.mostloyalvotes = mostloyalvotes;
}

function mostloyalvotestable() {

    var table = document.getElementById("senate-most-loyal");
    var tblBody = document.createElement("tbody");

    for (var most = 0; most < mostloyalvotes.length; most++) {
        var row = document.createElement("tr");

        var columnmost = document.createElement("td");
        columnmost.innerHTML = mostloyalvotes[most].first_name;
        var columnmost2 = document.createElement("td");
        columnmost2.innerHTML = mostloyalvotes[most].missed_votes;
        var columnmost3 = document.createElement("td");
        columnmost3.innerHTML = mostloyalvotes[most].missed_votes_pct;

        row.appendChild(columnmost);
        row.appendChild(columnmost2);
        row.appendChild(columnmost3);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
}

function leastengaged() {
    var memcopy3 = members.slice(0);
    memcopy3.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });
    var membersten = members.length * 0.1;
    var tenpercent = Math.round(membersten);

    for (var v = 0; v < tenpercent; v++) {
        var missedV = memcopy3[v];
        leastengagedvotes.push(missedV);
    }

    for (var j = 0; j < members.length; j++) {
        var more = members[j].votes_with_party_pct;

        if (more == missedV[missedV.length - 1]) {
            leastengagedvotes.push(more);
        }
    }
    statistics.leastengagedvotes = leastengagedvotes;
}

function leastengagedtable() {

    var table = document.getElementById("senate-least-engaged");
    var tblBody = document.createElement("tbody");

    for (var least = 0; least < leastengagedvotes.length; least++) {
        var row = document.createElement("tr");

        var columnleast = document.createElement("td");
        columnleast.innerHTML = leastengagedvotes[least].first_name;
        var columnleast2 = document.createElement("td");
        columnleast2.innerHTML = leastengagedvotes[least].missed_votes;
        var columnleast3 = document.createElement("td");
        columnleast3.innerHTML = leastengagedvotes[least].missed_votes_pct;

        row.appendChild(columnleast);
        row.appendChild(columnleast2);
        row.appendChild(columnleast3);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
}

function mostengaged() {

    var memcopy4 = members.slice(0);

    memcopy4.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });
    
    var membersten = members.length * 0.1;
    var tenpercent = Math.round(membersten);

    for (var v = 0; v < tenpercent; v++) {
        var missedV4 = memcopy4[v];
        mostengagedvotes.push(missedV4);
    }

    for (var j = 0; j < members.length; j++) {
        var more4 = members[j].missed_votes_pct;
        if (more4 == missedV4[missedV4.length - 1]) {
            mostengagedvotes.push(more4);
        }
    }
    statistics.mostengagedvotes = mostengagedvotes;
}

function mostengagedtable() {

    var table = document.getElementById("senate-most-engaged");
    var tblBody = document.createElement("tbody");

    for (var most = 0; most < mostengagedvotes.length; most++) {
        var row = document.createElement("tr");

        var columnmost = document.createElement("td");
        columnmost.innerHTML = mostengagedvotes[most].first_name;
        var columnmost2 = document.createElement("td");
        columnmost2.innerHTML = mostengagedvotes[most].missed_votes;
        var columnmost3 = document.createElement("td");
        columnmost3.innerHTML = mostengagedvotes[most].missed_votes_pct;

        row.appendChild(columnmost);
        row.appendChild(columnmost2);
        row.appendChild(columnmost3);
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
}

function tablefillglance() {

    document.getElementById("repreps").innerHTML = statistics.numRep;
    document.getElementById("demreps").innerHTML = statistics.numDem;
    document.getElementById("indreps").innerHTML = statistics.numInd;

    document.getElementById("repwith").innerHTML = statistics.withRep;
    document.getElementById("demwith").innerHTML = statistics.withDem;
}

function conditions() {
    if ((document.getElementById("senate-least-engaged") != null) && (document.getElementById("senate-most-engaged") != null)) {
        leastengagedtable();
        mostengagedtable();
    }
    
    if ((document.getElementById("senate-most-loyal") != null) && (document.getElementById("senate-least-loyal") != null)) {
        mostloyalvotestable();
        leastloyalvotestable();
    }
}
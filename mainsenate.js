var data;
var members;


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
    createStates();
    tablecreate();


}).catch(function (error) {
    console.log("Request failed:" + error.message);
});



function tablecreate() {

    var table = document.getElementById("senate-table");
    var tblBody = document.createElement("tbody");


    for (var i = 0; i < members.length; i++) {
        var row = document.createElement("tr");
        var columnName = document.createElement("td");
        if (members[i].middle_name == null) {
            var name = members[i].first_name + " " + members[i].last_name;

        } else {
            var name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }

        var url = members[i].url;
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.textContent = name;

        columnName.appendChild(a);

        row.appendChild(columnName);

        var columnParty = document.createElement("td");
        columnParty.innerHTML = members[i].party;
        row.appendChild(columnParty);
        var parties = members[i].party;
        if (parties == "R") {
            columnParty.parentElement.setAttribute("class", "R")
        } else if (parties == "D") {
            columnParty.parentElement.setAttribute("class", "D")
        } else if (parties == "I") {
            columnParty.parentElement.setAttribute("class", "I")
        }


        var columnState = document.createElement("td");
        columnState.innerHTML = members[i].state;

        row.appendChild(columnState);
        columnState.parentElement.classList.add("class", members[i].state)



        var columnSeniority = document.createElement("td");
        columnSeniority.innerHTML = members[i].seniority;
        row.appendChild(columnSeniority);

        var columnVotes = document.createElement("td");
        columnVotes.innerHTML = members[i].votes_with_party_pct;
        row.appendChild(columnVotes);

        tblBody.appendChild(row);

        table.appendChild(tblBody);
    }

}


function checkb() {

    var selectedv = document.getElementById("cstate").value;
    console.log(selectedv);
    var tds = document.getElementsByTagName("tr");
    console.log(tds);
    for (var s = 0; s < tds.length; s++) {
        tds[s].style.display = "none";

        if (tds[s].classList.contains("R") == true && document.getElementById("R").checked == true && (tds[s].classList.contains(selectedv) == true)) {
            tds[s].style.display = "table-row";
        }

        if (tds[s].classList.contains("D") == true && document.getElementById("D").checked == true && (tds[s].classList.contains(selectedv) == true)) {
            tds[s].style.display = "table-row";
        }

        if (tds[s].classList.contains("I") == true && document.getElementById("I").checked == true && (tds[s].classList.contains(selectedv) == true)) {
            tds[s].style.display = "table-row";
        }

        if (tds[s].classList.contains("R") == true && document.getElementById("R").checked == true && selectedv == "all") {
            tds[s].style.display = "table-row";
        }

        if (tds[s].classList.contains("D") == true && document.getElementById("D").checked == true && selectedv == "all") {
            tds[s].style.display = "table-row";
        }

        if (tds[s].classList.contains("I") == true && document.getElementById("I").checked == true && selectedv == "all") {
            tds[s].style.display = "table-row";
        }
    }

    var thead = document.getElementById("tablehead");
    thead.style.display = "table-row";

}

function filterbystates() {
    var selectedv = document.getElementById("cstate").value;
    console.log(selectedv);
    var tds = document.getElementsByTagName("tr");
    console.log(tds);
    for (var i = 0; i < tds.length; i++) {
        console.log(tds[i].classList.contains(selectedv));
        if (tds[i].classList.contains(selectedv) == false) {
            tds[i].style.display = "none";
        } else if (tds[i].classList.contains(selectedv) == true) {
            tds[i].style.display = "table-row";
        }
    }

    var thead = document.getElementById("tablehead");
    thead.style.display = "table-row";

}

function createStates() {
    var states = [];
    var uniqueStates = [];
    for (var s = 0; s < members.length; s++) {
        states.push(members[s].state);
    }

    uniqueStates = states.filter(function (item, pos) {
        return states.indexOf(item) == pos;
    })

//    console.log(uniqueStates);

    var stateoptions = document.getElementById("cstate");

    for (var x = 0; x < uniqueStates.length; x++) {
        var cstate = document.createElement("option");
        cstate.innerHTML = uniqueStates[x];
        stateoptions.appendChild(cstate);
    }

}



//createStates();
//
//tablecreate();

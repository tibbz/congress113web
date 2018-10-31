var app = new Vue({
    el: '#app',
    data: {
        data: [],
        members: [],
        tenpercent: [],
        numRep: [],
        numDem: [],
        numInd: [],
        total: [],
        withRep: [],
        withDem: [],
        leastloyalvotes: [],
        mostloyalvotes: [],
        leastengagedvotes: [],
        leastengagedvotespct: [],
        mostengagedvotes: [],

        statistics: {
            "numDem": 0,
            "numRep": 0,
            "numInd": 0,
            "withRep": 0,
            "withDem": 0,
            "leastloyalvotes": 0,
            "mostloyalvotes": 0,
            "leastengagedvotes": 0,
            "mostengagedvotes": 0,
        },

    },

    created: function () {
        //    llamadas this.
        this.calljson();
    },

    methods: {
        calljson: function () {
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
                    app.members = json.results[0].members;
                    app.memnumbers();
                    app.mempercent();
                    app.leastengaged();
                    app.mostengaged();
                    app.leastloyal();
                    app.mostloyal();


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
                    app.members = json.results[0].members;
                    app.memnumbers();
                    app.mempercent();
                    app.leastengaged();
                    app.mostengaged();
                    app.leastloyal();
                    app.mostloyal();


                }).catch(function (error) {
                    console.log("Request failed:" + error.message);
                });

            }
        },

        memnumbers: function () {
            for (var m = 0; m < this.members.length; m++) {
                var numParty = this.members[m].party;
                if (numParty == "R") {
                    this.numRep.push(this.members[m].party);
                }
                if (numParty == "D") {
                    this.numDem.push(this.members[m].party);
                }
                if (numParty == "I") {
                    this.numInd.push(this.members[m].party);
                }
            }

            this.statistics.numRep = this.numRep.length;
            this.statistics.numDem = this.numDem.length;
            this.statistics.numInd = this.numInd.length;

        },

        mempercent: function () {
            var temp = 0;
            var temp2 = 0;
            for (var p = 0; p < this.members.length; p++) {
                var numParty = this.members[p].party;
                if (numParty == "R") {
                    this.withRep = this.members[p].votes_with_party_pct;
                    temp = temp + this.withRep;
                }
                if (numParty == "D") {
                    this.withDem = this.members[p].votes_with_party_pct;
                    temp2 = temp2 + this.withDem;
                }
            }
            var repTotal = Math.round(temp / this.statistics.numRep * 100) / 100;
            var demTotal = Math.round(temp2 / this.statistics.numDem * 100) / 100;
            this.statistics.withRep = repTotal;
            this.statistics.withDem = demTotal;
        },

        leastengaged: function () {
            var memcopy3 = this.members.slice(0);
            memcopy3.sort(function (a, b) {
                return b.missed_votes_pct - a.missed_votes_pct
            });
            var membersten = this.members.length * 0.1;
            this.tenpercent = Math.round(membersten);

            for (var v = 0; v < this.tenpercent; v++) {
                var missedV = memcopy3[v];
                this.leastengagedvotes.push(missedV);
            }

            for (var j = 0; j < this.members.length; j++) {
                var more = this.members[j].votes_with_party_pct;

                if (more == missedV[missedV.length - 1]) {
                    this.leastengagedvotespct.push(more);
                }
            }
            this.statistics.leastengagedvotes = this.leastengagedvotes;
            this.statistics.leastengagedvotespct = this.leastengagedvotespct;
            console.log(this.leastengagedvotes);
        },

        mostengaged: function () {
            var memcopy4 = this.members.slice(0);
            memcopy4.sort(function (a, b) {
                return a.missed_votes_pct - b.missed_votes_pct
            });
            var membersten = this.members.length * 0.1;
            this.tenpercent = Math.round(membersten);
            for (var v = 0; v < this.tenpercent; v++) {
                var missedV4 = memcopy4[v];
                this.mostengagedvotes.push(missedV4);
            }
            for (var j = 0; j < this.members.length; j++) {
                var more4 = this.members[j].missed_votes_pct;
                if (more4 == missedV4[missedV4.length - 1]) {
                    this.mostengagedvotes.push(more4);
                }
            }
            this.statistics.mostengagedvotes = this.mostengagedvotes;
        },

        leastloyal: function () {
            var memcopy = this.members.slice(0);
            memcopy.sort(function (a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct
            });
            var membersten = this.members.length * 0.1;
            this.tenpercent = Math.round(membersten);
            for (var v = 0; v < this.tenpercent; v++) {
                var missedV = memcopy[v];
                this.leastloyalvotes.push(missedV);
            }
            for (var j = 0; j < this.members.length; j++) {
                var more = this.members[j].votes_with_party_pct;
                if (more == missedV[missedV.length - 1]) {
                    this.leastloyalvotes.push(more);
                }
            }
            this.statistics.leastloyalvotes = this.leastloyalvotes;
        },

        mostloyal: function () {
            var memcopy2 = this.members.slice(0);
            memcopy2.sort(function (a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct
            });
            var membersten = this.members.length * 0.1;
            this.tenpercent = Math.round(membersten);

            for (var v = 0; v < this.tenpercent; v++) {
                var missedV2 = memcopy2[v];
                this.mostloyalvotes.push(missedV2);
            }

            for (var j = 0; j < this.members.length; j++) {
                var more2 = this.members[j].votes_with_party_pct;
                if (more2 == missedV2[missedV2.length - 1]) {
                    this.mostloyalvotes.push(more2);
                }
            }
            this.statistics.mostloyalvotes = this.mostloyalvotes;
        },

    }

})

var app = new Vue({
    el: '#app',
    data: {
        //        variable global
        data: [],
        members: [],
        states: [],
        uniqueStates: [],
    },

    created: function () {
        document.body.className= "loader";
        this.calljson();

    },

    methods: {
        //        funciones
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
                    app.createStates();
                    document.body.className= "";


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
                    app.createStates();
                    document.body.className= "";

                }).catch(function (error) {
                    console.log("Request failed:" + error.message);
                });

            }
        },

        checkb: function () {
            var selectedv = document.getElementById("cstate").value;
            var tds = document.getElementsByTagName("tr");
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
        },

        createStates: function () {
            for (var s = 0; s < this.members.length; s++) {
                this.states.push(this.members[s].state);
            }

            this.uniqueStates = this.states.filter(function (item, pos) {
                return app.states.indexOf(item) == pos;
            })
        }
    }

})

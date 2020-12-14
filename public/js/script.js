console.log("Sanity Check!");

new Vue({
    el: "#main",
    data: {
        name: "Jasmine",
        cards: []

    },
    mounted: function() {
        var self = this;
        axios
            .get("/images")
            .then(function (response) {
                console.log("response: ", response);
                // console.log("this inside then: ", self);
                self.cards = response.data;
            }).catch(function (error) {
                console.log("error: ", error);
            });
    },
    methods: {
        carlosMethod: function (card) {
            console.log("Carlos' method: ", card);
            // this.name = card;
        }
    }
});
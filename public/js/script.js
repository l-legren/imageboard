console.log("Sanity Check!");

new Vue({
    el: "#main",
    data: {
        name: "Jasmine",
        cards: [],
    },
    mounted: function () {
        var self = this;
        axios
            .get("/images")
            .then(function (response) {
                // console.log("response: ", response);
                // console.log("this inside then: ", self);
                self.cards = response.data;
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    },
    methods: null
});

new Vue({
    el: "#uploader",
    data: {
        title: "",
        description: "",
        username: "",
        image: null
    },
    methods: {
        handleFileChange: function(e) {
            // console.log(e.target.files[0]);
            this.image = e.target.files[0];
        },
        upload: function (e) {
            e.preventDefault;

            var formData = new FormData();

            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("image", this.image);

            axios.post("/upload", FormData).then((res) => {
                console.log(res);
            });
        }
    }
});
console.log("Sanity Check!");

Vue.component("my-component", {
    template: "#template",
    props: ["imageClicked"],
    data: function () {
        return {
            name: "Layla"
        };
    },
    mounted: function () {
        var self = this;
        console.log("props: ", self);
    },
    methods: {
        changeName: function () {
            this.name = "Jasmine";
        },
        closeModal: function () {
            console.log("closeModal is about to emit an event from the comp");
            this.$emit("close");
        }
    }
}) ;


new Vue({
    el: "#main",
    data: {
        name: "Jasmine",
        images: [],
        idImage: null, 
    },
    mounted: function () {
        var self = this;
        axios
            .get("/images")
            .then(function ({ data }) {
                // console.log("data: ", data);
                for (let i = 0; i < data.length; i++) {
                    self.images.unshift(data[i]);
                    console.log(self.images);
                }
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    },
    methods: {
        showUp: function (id) {
            // console.log(id);
            this.idImage = id;
            // console.log(this.idImage);
        },
        closeMe: function () {
            console.log("closeMe in Parent is running!");
        }
    }
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
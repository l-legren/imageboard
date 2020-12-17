(function () {

    Vue.component("comments-component", {
        template: "#comments-template",
        props: ["id"],
        data: function () {
            return {
                comments: [],
                comment: "",
                username: "",
                imageId: this.id
            };
        },
        methods: {
            commentUpload: function(e) {
                e.preventDefault();

                let obj = {
                    comment: this.comment,
                    username: this.username,
                    imageId: this.imageId
                };
                // console.log(this);
                axios.post("/upload-comments",obj).then((res) => {
                    console.log(res);
                });
            }
        },
        mounted: function () {
            var self = this;
            axios.get("/comments/" + self.imageId)
                .then(({data}) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        self.comments.push(data[i]);
                    }
                }).catch((err) => console.log("Error retrieving comments"));
        }
    });

    Vue.component("my-component", {
        template: "#template",
        props: ["id"],
        data: function () {
            return {
                url: "",
                username: "",
                title: "",
                description: "",
                timestamp: ""
            };
        },
        mounted: function () {
            var self = this;
            axios.get("/image-selected/" + this.id)
                .then(({ data }) => {
                    // console.log(data[0]);
                    self.url = data[0].url;
                    self.username = data[0].username;
                    self.title = data[0].title;
                    self.timestamp = data[0].created_at;
                });
        },
        methods: {
            closeModal: function () {
                console.log("closeModal is about to emit an event from the comp");
                this.$emit("close");
            }
        }
    }) ;
    
    
    new Vue({
        el: "#main",
        data: {
            images: [],
            idImage: null,
            modal: null
        },
        mounted: function () {
            var self = this;
            axios
                .get("/images")
                .then(function ({ data }) {
                    // console.log("data: ", data);
                    for (let i = 0; i < data.length; i++) {
                        self.images.unshift(data[i]);
                        // console.log(self.images);
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
                console.log("this.idImage: ", this.idImage);

            },
            closeMe: function () {
                console.log("closeMe in Parent is running!");
                this.idImage = null;
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
})();
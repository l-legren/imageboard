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
                var self = this;
                let obj = {
                    comment: this.comment,
                    username: this.username,
                    imageId: this.imageId
                };
                // console.log(this);
                axios.post("/upload-comments",obj).then(({data}) => {
                    console.log("Res: ", data);
                    console.log(self);
                    self.comments.unshift(data[0]);
                    self.comment = "";
                    self.username = "";
                });
            },
            mounted: function () {
                var self = this;
                axios.get("/comments/" + self.imageId)
                    .then(({data}) => {
                        // console.log(data);
                        self.comments = data;
                    }).catch((err) => console.log("Error retrieving comments"));
            }},
        mounted: function mounted () {
            this.mounted();
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
                timestamp: "",
                prevImage: null,
                nextImage: null
            };
        },
        mounted: function () {
            this.mounted();
        },
        watch: {
            id: function () {
                this.mounted();
            }
        },
        methods: {
            closeModal: function () {
                console.log("closeModal is about to emit an event from the comp");
                this.$emit("close");
            },
            mounted: function () {
                var self = this;
                axios.get("/image-selected/" + this.id)
                    .then(({ data }) => {
                        console.log(data[0]);
                        self.url = data[1].url;
                        self.username = data[1].username;
                        self.title = data[1].title;
                        self.description = data[1].description;
                        self.timestamp = data[1].created_at;
                        self.prevImage = data[0];
                        self.nextImage = data[2];
                    });
            }
        }
    }) ;
    
    
    new Vue({
        el: "#main",
        data: {
            images: [],
            idImage: location.hash.slice(1),
            modal: null,
            lastId: null,
            moreButton: true
        },
        mounted: function () {
            var self = this;
            axios
                .get("/images")
                .then(function ({ data }) {
                    // console.log("data: ", data);
                    for (let i = 0; i < data.length; i++) {
                        self.images.push(data[i]);
                        // console.log("This is me the front end getting images when mounting: ", self.images);
                    }
                    console.log("Images mounted: ", self.images);
                })
                .catch(function (error) {
                    console.log("error: ", error);
                });
            addEventListener("hashchange", function (e) {
                console.log("Hash changed to this id!: ", this.idImage);
                self.idImage = location.hash.slice(1);
            });
        },
        methods: {
            closeMe: function () {
                console.log("closeMe in Parent is running!");
                this.idImage = null;
                history.pushState({}, "", "/");
            },
            loadMore: function () {
                console.log("loadMore is running, how many Images do we have?: ", this.images.length);
                // HERE I AM GETTING THE LAST IMAGE IN THE IMAGES ARRAY
                let lastImageId = this.images[this.images.length - 1].id;
                console.log("ID last Image: ", lastImageId);
                var self = this;
                axios
                    .get("/more-images/" + lastImageId) // DO NOT FORGET SLASH IN THE ROUTE AND SLASH IN THE END IF NEED PARAMETERS
                    .then(function ({ data }) {
                        console.log("This is me the front side retrieving more images: ",data);
                        // HERE I AM PUSHING THE NEW IMAGES TO THE ARRAY, UNSHIFT ONLY WHILE UPLOADING NEW ONES
                        for (let i = 0; i < data.length; i++) {
                            // THE LAST IMAGE TO RETRIEVE IS THE ONE WITH INDEX 1 BECAUSE I AM UNSHIFTING THE IMAGES!!!
                            if (data[i].id == 1) {
                                self.moreButton = null;
                            }
                            self.images.push(data[i]);
                        }
                    })
                    .catch((err) => console.log("ERROR retrieving more Images", err));
            }
        }
    });
    
    new Vue({
        el: "#uploader",
        data: {
            title: "",
            description: "",
            username: "",
            image: null,
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
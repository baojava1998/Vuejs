<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-0">Static Table</h5>
                    <router-link :to="{name: 'create'}" class="btn btn-success btn-sm text-white" style="float: right"><i class="me-2 mdi mdi-plus-box"></i>Create</router-link>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(product, key) in products">
                            <th scope="row">{{ ((paginate.current_page - 1) * paginate.per_page)  + key }}</th>
                            <td>{{ product.name }}</td>
                            <td>{{ product.detail }}</td>
                            <td>
                                <router-link :to="{name: 'edit', params: { id: product.id }}" class="btn btn-info btn-sm"><i class="me-2 mdi mdi-table-edit"></i>Edit</router-link>
                                <button type="button" class="btn btn-danger btn-sm text-white" @click="deleteProduct(product.id)">
                                    <i class="me-2 mdi mdi-delete-circle"></i>Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <paginate class="justify-content-end"
                              v-model="page"
                              :page="1"
                              :force-page="paginate.current_page"
                              :page-count="paginate.last_page"
                              :page-range="3"
                              :margin-pages="2"
                              :click-handler="clickCallback"
                              :prev-text="'Prev'"
                              :next-text="'Next'"
                              :container-class="'pagination'"
                              :page-class="'page-item'"
                              :prev-link-class="'page-link'"
                              :next-link-class="'page-link'"
                              :page-link-class="'page-link'">
                    </paginate>
                </div>
            </div>
        </div>
        <div v-for="(message, index) in messages" :key="index">
            {{ message.type }} : {{ message.message }}
        </div>
        <input type="text" v-model="text">
        <button @click="sendMessage">Send</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            products: {},
            detail: [],
            page: this.$route.query.page || 1,
            paginate:{
                'last_page': 1,
                'per_page': 1,
                'page': this.$route.query.page || 1,
                'current_page': this.$route.query.current_page || 1
            },
            text: '',
            messages: [],
        }
    },
    sockets: {
        statusRoom: function (message) {
            this.messages.push({
                message,
                type: 'status',
            })
        },
        receiveMessage: function (message) { //nhận tín nhắn từ ng khác trong phòng, push tin nhắn vào mảng ban đầu
            this.messages.push({
                message,
                type: 'receive',
            })
        },
    },
    props: ['data'],
    mounted(){
        this.listProduct();
    },
    methods: {
        sendMessage() {
            if(this.text !== '') {
                this.$socket.emit('sendMessage', this.text) // emit lên server
                this.messages.push({
                    message: this.text,
                    type: 'send',
                })
            }
            this.text = ''
        },
        deleteProduct(id) {
            this.axios
                .delete(`products/${id}`)
                .then(response => {
                    let i = this.products.map(data => data.id).indexOf(id);
                    this.products.splice(i, 1)
                });
        },
        detailProduct(id) {
            console.log(id)
            this.axios
                .get(`products/${id}`)
                .then(response => {
                    this.detail = response.data;
                });
        },
        async listProduct() {
            await axios
                .get('products?page=' + this.$route.query.page)
                .then(response => {
                    this.products = response.data.data;
                    this.paginate = response.data.paginate;
                });
        },
        async clickCallback(pageNum = 1) {
            await axios.get('products?page=' + pageNum)
                .then(response => {
                    this.products = response.data.data;
                    this.paginate = response.data.paginate;
                    this.$router.push({path: this.$route.path, query: {
                        page: this.paginate.current_page
                    }})
                });
            // return {
            //     path: this.$route.path,
            //     query: { ...this.$route.query, currentPage: pageNum }
            // }
        },
    },
}
</script>

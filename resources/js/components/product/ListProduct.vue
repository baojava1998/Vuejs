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
                              :page="1"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: {},
            detail: [],
            paginate:{
                'last_page': 1,
                'per_page': 1,
                'page': 1,
                'current_page': 1
            },
        }
    },
    props: ['data'],
    mounted(){
        this.listProduct();
        this.clickCallback();
    },
    methods: {
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
                .get('products/')
                .then(response => {
                    this.products = response.data.data;
                });
        },
        async clickCallback(pageNum = 1) {
            await axios.get('products?page=' + pageNum)
                .then(response => {
                    this.products = response.data.data;
                    this.paginate = response.data.paginate;
                });
        },
    }
}
</script>

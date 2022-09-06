<template>
    <div class="row">
        <div class=card>
            <form @submit.prevent="updateProduct">
                <FormProduct :product="product" :errors="errors" />
            </form>
        </div>
    </div>
</template>

<script>
import FormProduct from '../product/FormProduct';
export default {
    data() {
        return {
            product: {
                'name':'',
                'detail':'',
            },
            errors: {
                'name':'',
                'detail':'',
            },
        }
    },
    components: {
        FormProduct
    },
    mounted(){
        this.getData()
    },
    methods: {
        async updateProduct() {
            await this.axios
                .patch(`products/${this.$route.params.id}`, this.product)
                .then((res) => {
                    this.$router.push({ name: 'home' });
                })
                .catch(err => {
                    console.log(err.response.data.errors)
                    console.log(Array.isArray(err.response.data.error))
                    this.errors = err.response.data.errors
                });
        },
        async getData() {
            await this.axios
                .get(`products/${this.$route.params.id}`)
                .then((res) => {
                    this.product = res.data.data;
                });
        },
    }
}
</script>

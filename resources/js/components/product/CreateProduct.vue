<template>
    <div class="row">
        <div class=card>
            <form @submit.prevent="addProduct">
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
            product: {},
            errors: {
                'name':'',
                'detail':''
            },
        }
    },
    components: {
        FormProduct,
    },
    methods: {
        addProduct() {
            this.axios
                .post('products', this.product)
                .then(response => (
                    this.$router.push({ name: 'home' })
                ))
                .catch(err => {
                    this.errors = err.response.data.errors
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>

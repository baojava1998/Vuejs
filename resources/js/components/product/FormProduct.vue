<template>
    <div>
        <div v-for="(errorArray, idx) in errors" :key="idx">
            <div v-for="(allErrors, idx) in errorArray" :key="idx">
                <span class="text-danger">{{ allErrors}} </span>
            </div>
        </div>
        <div class="card-body">
            <h4 class="card-title">Forms Control</h4>
            <div class="form-group">
                <label for="hue-demo">Name</label>
                <div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom minicolors-position-left">
                    <input type="text" class="form-control demo minicolors-input" size="7" v-model="product.name">
                </div>
                <FormError v-if="errors.name" :errors="errors.name"/>
            </div>
            <div class="form-group">
                <label for="hue-demo">Name</label>
                <div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom minicolors-position-left">
                    <input type="text" class="form-control demo minicolors-input" size="7" v-model="product.detail">
                </div>
                <FormError v-if="errors.detail" :errors="errors.detail"/>
            </div>
            <br>
            <button type="submit" class="btn btn-success text-white">
                Save
            </button>
            <router-link :to="{name: 'home'}" class="btn btn-danger text-white">Cancel</router-link>
        </div>
    </div>
</template>

<script>
import FormError from '../FormError';
export default {
    props: {
        errors: {
            type: [Object,Array],
        },
        product : {
            type: Object
        },
    },
    components: {
        FormError,
    }
}
</script>

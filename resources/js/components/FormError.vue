<template>
    <span class="help-block">
        <div v-for="(errorArray, idx) in errors">
            <p class="error">{{errorArray}}</p>
        </div>
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        errors: {
            type: Object,
            required: true
        }
    }
}
</script>

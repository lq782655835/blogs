<template>
    <div>
        this is a demo
        {{ this.$site }}
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$site)
    }
}
</script>

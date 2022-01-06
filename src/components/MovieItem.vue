<template>
    <div>{{ movie }}</div>
</template>
<script>
export default{
    props:{
        movie:{
            type:Object,
            default:()=>({})
        }
    }
}
</script>

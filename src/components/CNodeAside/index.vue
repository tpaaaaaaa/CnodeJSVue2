<template>
    <div class="panel">
        <div class="header">
            <span class="col_fade">
                {{ id }}
                <slot name="header">标题部分</slot>
            </span>
        </div>
        <div class="inner">
            <slot name="inner">身体部分</slot>
        </div>

    </div>

</template>

<script>
export default {
    name: 'CNodeAside',
    props: ['id']
};
</script>

<style lang="less" scoped>
.panel {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    box-shadow: 0px -1px 6px 3px rgb(0 0 0 / 10%);
    background-color: #fff;
    font-size: 13px;

    .header {
        padding: 1rem;
        background-color: #f6f6f6;

        .col_fade {
            color: #444;
        }
    }

    .inner {
        padding: 1rem;

    }
}
</style>
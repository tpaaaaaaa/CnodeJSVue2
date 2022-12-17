<template>
    <!-- 主要内容的框架 --插槽放入内容和侧边栏 -->
    <div ref="top">
        <div class="main">
            <div class="content">
                <slot name="contentPanel"></slot>
            </div>
            <!-- 侧边栏 -->
            <div class="sidebar">
                <div class="fixed">

                    <slot name="sideBar"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CnodeMain',
    data() {
        return {
            observe: null
        };
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.main {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    // // width: 90vw;
    margin: 1rem 2rem;

    // 内容
    .content {
        flex: 1;
        width: 65vw;
        // box-shadow: 0px -1px 6px 3px rgb(0 0 0 / 10%);

        .panel {
            border-radius: 3px;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
    }

    // 侧边栏
    .sidebar {
        width: 35vw;
        max-width: 30rem;
        min-width: 25rem;
        // position: fixed;

        .fixed {
            // position: fixed;
            z-index: 0;
        }
    }
}


@media (max-width:900px) {
    .sidebar {
        display: none;
    }
}
</style>
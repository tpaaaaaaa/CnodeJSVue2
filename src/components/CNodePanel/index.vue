<template>
    <!-- 帖子组件 -插槽传入对应头部和内容 -->
    <div>
        <div class="panel">
            <!-- 主题 -->
            <slot name="panelHeader"></slot>
            <!-- 帖子 -->
            <slot name="panelInner"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CNodePanel',
};
</script>

<style lang="less" scoped>
.panel {
    margin-bottom: 1rem;
    border-radius: 3px;
    box-shadow: 0px -1px 6px 3px rgb(0 0 0 / 10%);
    border: 1px solid rgba(0, 0, 0, 0.1);

    // 内容标题
    .header {
        display: flex;
        align-items: center;
        gap: 2.5rem;
        padding: 1.2rem;
        background-color: #f6f6f6;
        white-space: nowrap;

        .topic-tab {
            color: #80bd01;

            &:hover {
                color: #000;
            }

            // 当前选中标题
            &.current-tab {
                padding: 3px 4px;
                border-radius: 3px;
                background-color: #80bd01;
                color: #fff;
            }
        }
    }

    // 内容
    .inner {
        background-color: #fff;

        a {
            color: #778087;
        }

        // .topic_list {}
    }
}
</style>
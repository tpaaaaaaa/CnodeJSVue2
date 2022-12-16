<template>
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
    border-radius: 3px;
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

        .topic_list {
            .cell {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-bottom: 1px solid rgba(128, 128, 128, 0.2);
                width: 100%;
                white-space: nowrap;

                &:hover {
                    background-color: #f5f5f5;
                }


                // 发布用户头像
                .user_avatar {

                    img {
                        width: 3rem;
                        height: 3rem;
                    }
                }

                // 回复数
                .reply_count {
                    width: 7rem;
                    text-align: center;

                    .count_of_replies {
                        color: #9e78c0;
                    }

                    .count_seperator {
                        font-size: 1rem;
                    }

                    .count_of_visits {
                        font-size: 1rem;
                        color: #b4b4b4;
                    }
                }

                // 回复时间
                .last_time {
                    display: flex;
                    gap: 1rem;
                    min-width: 8rem;
                    font-size: 1.1rem;

                    // 回复用户头像
                    .user_small_avatar {
                        width: 1.8rem;
                        height: 1.8rem;
                        border-radius: 3px;
                        vertical-align: middle;
                    }

                    .last_active_time {
                        margin-left: auto;
                    }

                }

                // 标题内容
                .topic_title_wrapper {
                    margin-right: auto;
                    // 让该元素不超出flex父元素的两个方式
                    // width: 0;
                    overflow: hidden;
                    flex: 1;



                    // 置顶
                    .put_top {
                        background-color: #80bd01;
                        border-radius: 3px;
                        padding: 2px 4px;
                        color: #fff;
                        font-size: 1.2rem;
                    }

                    .topiclist-tab {
                        background-color: #e5e5e5;
                        border-radius: 3px;
                        padding: 2px 4px;
                        color: #999;
                        font-size: 1.2rem;
                    }

                    .category_tab {
                        margin-right: 4px;
                    }

                    // 标题
                    .topic_title {
                        display: inline-block;
                        width: 90%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                        color: #333;


                        &:hover {
                            text-decoration: underline;
                        }
                    }

                }
            }
        }



    }

}
</style>
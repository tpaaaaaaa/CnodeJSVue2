<template>
    <div>
        <div class="main">

            <div class="content">
                <div class="content">
                    <div class="panel">
                        <!-- 主题 -->
                        <div class="header">
                            <a href="" class="topic-tab current-tab">全部</a>
                            <a href="" class="topic-tab">精华</a>
                            <a href="" class="topic-tab">分享</a>
                            <a href="" class="topic-tab">问答</a>
                            <a href="" class="topic-tab">招聘</a>
                            <a href="" class="topic-tab">客户端测试</a>
                        </div>
                        <!-- 帖子 -->
                        <div class="inner">
                            <div class="topic_list">
                                <div class="cell">
                                    <!-- 头像 -->
                                    <a href="#" class="user_avatar">
                                        <img
                                             src="https://avatars.githubusercontent.com/u/227713?v=4&s=120"
                                             alt="用户头像">
                                    </a>
                                    <!-- 回复 -->
                                    <span class="reply_count">
                                        <span class="count_of_replies" title="回复数">1</span>
                                        <span class="count_seperator">/</span>
                                        <span class="count_of_visits" title="点击数">55</span>
                                    </span>

                                    <!-- 标题内容 -->
                                    <div class="topic_title_wrapper">
                                        <span class="put_top">置顶</span>
                                        <a href="#" class="topic_title" title="标题内容">
                                            标题内容标题内容标题内容标题内容标题内容标题内容标lh3rem内容标题内容标lh3rem内容标题内容标lh3rem内容标题内容标lh3rem
                                        </a>
                                    </div>
                                    <!-- 最后回复时间 -->
                                    <a href="#" class="last_time">
                                        <img src="https://avatars.githubusercontent.com/u/68574208?v=4&s=120" alt=""
                                             class="user_small_avatar">
                                        <span class="last_active_time">13天前</span>
                                    </a>
                                </div>
                            </div>

                            <div class="pagination">
                                <ul>
                                    <li><a href="#" class="prev_page"> &lt;&lt;</a> </li>
                                    <li><a href="#" class="active">1</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#" class="next_page">&gt;&gt;</a></li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <!-- 侧边栏 -->
            <div class="sidebar">侧边栏</div>

        </div>
        <div class="backtotop"><span>回到顶部</span></div>
    </div>
</template>

<script>
export default {
    name: 'CnodeHome',
};
</script>

<style lang="less" scoped>
.main {
    display: flex;
    justify-content: space-between;
    // width: 90vw;
    margin: 1rem;

    // 侧边栏
    .sidebar {
        width: 25vw;
        margin-left: 1rem;
    }

    // 内容
    .content {
        flex: 1;
        max-width: 72vw;

        .panel {

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
                        gap: 1rem;
                        padding: 5px;
                        border-bottom: 1px solid rgba(128, 128, 128, 0.2);
                        max-width: 100%;
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
                            font-size: 1.1rem;

                            // 回复用户头像
                            .user_small_avatar {
                                margin-right: 1rem;
                                width: 1.8rem;
                                height: 1.8rem;
                                border-radius: 3px;
                                vertical-align: middle;
                            }

                            .last_active_time {}

                        }

                        // 标题内容
                        .topic_title_wrapper {
                            margin-right: auto;
                            max-width: 75%;

                            // 置顶
                            .put_top {
                                background-color: #80bd01;
                                border-radius: 3px;
                                padding: 2px 4px;
                                color: #fff;
                                font-size: 1.2rem;
                            }

                            // 标题
                            .topic_title {
                                vertical-align: middle;
                                max-width: 95%;
                                display: inline-block;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                color: #333;

                                &:hover {
                                    text-decoration: underline;
                                }
                            }

                        }
                    }
                }

                // 分页
                .pagination {
                    padding: 1rem;

                    ul {
                        display: flex;
                        justify-content: center;
                        gap: 1px;

                        li {
                            a {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 3.2rem;
                                height: 3rem;
                                border: 1px solid rgba(128, 128, 128, 0.2);
                                border-radius: 3px;

                                &:hover {
                                    background-color: #f6f6f6;
                                }

                                &.active {
                                    color: #9ad813;
                                }
                            }
                        }

                        .prev_page,
                        .next_page {
                            letter-spacing: -4px;
                        }
                    }
                }

            }
        }
    }
}

// 返回顶部按钮
.backtotop {
    position: absolute;
    top: 90vh;
    right: 3vw;
    width: 4rem;
    height: auto;
    font-size: 1.4rem;
    text-align: center;
    background-color: #eee;
    box-shadow: 1px 1px 1px rgba(128, 128, 128, 0.411);
    cursor: pointer;
}
</style>
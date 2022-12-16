<template>
    <div>
        <div class="main">

            <div class="content">
                <div class="panel">
                    <!-- 主题 -->
                    <div class="header" @click.prevent="switchTab($event)">
                        <router-link to="/home?tab=all" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'all' }">
                            全部
                        </router-link>
                        <router-link to="/home?tab=good" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'good' }">
                            精华
                        </router-link>
                        <router-link to="/home?tab=share" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'share' }">
                            分享
                        </router-link>
                        <router-link to="/home?tab=ask" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'ask' }">
                            问答
                        </router-link>
                        <router-link to="/home?tab=job" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'job' }">
                            招聘
                        </router-link>
                        <router-link to="/home?tab=dev" class="topic-tab "
                                     :class="{ 'current-tab': reqTopicInfo.tab === 'dev' }">
                            客户端测试
                        </router-link>
                    </div>
                    <!-- 帖子 -->
                    <div class="inner">
                        <div class="topic_list" @click.prevent="goTopicDetail">
                            <div class="cell" v-for="topic of topics" :key="topic.id">
                                <!-- 头像 -->
                                <a href="#" class="user_avatar">
                                    <img
                                         :src="topic.author.avatar_url"
                                         :title="topic.author.loginname">
                                </a>
                                <!-- 回复 -->
                                <span class="reply_count">
                                    <span class="count_of_replies" title="回复数">{{ topic.reply_count }}</span>
                                    <span class="count_seperator">/</span>
                                    <span class="count_of_visits" title="点击数">{{ topic.visit_count }}</span>
                                </span>
                                <!-- 标题内容 -->
                                <div class="topic_title_wrapper">
                                    <span
                                          :class="{ 'put_top': topic.top, 'topiclist-tab': !topic.top, 'category_tab': 1 }">
                                        {{ topic.top ? '置顶' : topic.tab }}
                                    </span>
                                    <a href="#" class="topic_title" :title="topic.title" :data-id="topic.id">
                                        {{ topic.title }}
                                    </a>
                                </div>
                                <!-- 最后回复时间 -->
                                <a href="#" class="last_time">
                                    <img src="https://avatars.githubusercontent.com/u/68574208?v=4&s=120" alt=""
                                         class="user_small_avatar">
                                    <span class="last_active_time">
                                        {{ distanceLastTime(topic.last_reply_at) }}前
                                    </span>
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
            <!-- 侧边栏 -->
            <div class="sidebar">
                <Aside>
                    <template #header>
                        CNode：Node.js专业中文社区
                    </template>
                    <template #inner>
                        您可以<a href="#">登录</a>或<a href="#">注册</a>，也可以
                        <a href="#"><span class="span-info">通过GitHub登录</span></a>
                    </template>
                </Aside>

                <Aside>
                    <template #header>
                        无人回复话题
                    </template>
                    <template #inner>
                        <ul class="unstyled">
                            <li>
                                <div><a href="#" class="topic_title">标题</a></div>
                            </li>
                            <li>
                                <div><a href="#" class="topic_title">标题</a></div>
                            </li>
                        </ul>
                    </template>
                </Aside>

                <Aside>
                    <template #header>
                        友情社区
                    </template>
                    <template #inner>
                        <ol class="friendship-community">
                            <li><a href="https://ruby-china.org/">
                                    <img src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png"
                                         alt=""></a>
                            </li>
                            <li><a href="http://golangtc.com/"><img
                                         src="https://static2.cnodejs.org/public/images/golangtc-logo.png" alt=""></a>
                            </li>
                            <li><a href="http://phphub.org/"><img
                                         src="https://static2.cnodejs.org/public/images/phphub-logo.png" alt=""></a>
                            </li>
                        </ol>
                    </template>
                </Aside>
            </div>

        </div>
        <div class="backtotop"><span>回到顶部</span></div>
    </div>
</template>

<script>
import Aside from '@/components/Aside';
// import SideBar from './SideBar';
import { mapState } from 'vuex';
export default {
    name: 'CnodeHome',
    components: { Aside },
    computed: {
        ...mapState(['topics']),

    },
    data() {
        return {
            reqTopicInfo: {
                page: 1,
                tab: 'all',
                limit: 10
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        /**
         * 获取数据
         */
        getData() {
            this.$store.dispatch('getTopices', { ...this.reqTopicInfo });
        },

        /**
         * 切换Tab类别
         * @param {Object} e -监听元素
         */
        switchTab(e) {
            if (!e.target.closest('a')) return;
            this.reqTopicInfo.tab = this.$route.query.tab;
            this.getData();
        },

        /**
         * 进入主题贴
         */
        goTopicDetail(e) {
            if (!e.target.dataset.id) return;
            this.$router.push({ name: 'topic', params: { id: e.target.dataset.id } });
        },
    }
};
</script>

<style lang="less" scoped>
.main {
    display: flex;
    justify-content: space-between;
    // width: 90vw;
    margin: 1rem;

    // 内容
    .content {
        flex: 1;
        max-width: 62vw;
        box-shadow: 0px -1px 6px 3px rgb(0 0 0 / 10%);

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

    // 侧边栏
    .sidebar {
        width: 35vw;
        max-width: 30rem;
        min-width: 25rem;
        margin-left: 1rem;


        .friendship-community {
            list-style: none;

            li {
                a {
                    img {
                        width: 15rem;
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
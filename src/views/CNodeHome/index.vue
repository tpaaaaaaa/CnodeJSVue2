<template>
    <div>
        <MainConponent>
            <template #contentPanel>
                <Panel>
                    <template #panelHeader>
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
                    </template>

                    <template #panelInner>
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
                                            {{ topic.top ? '置顶' : translaTabs[topic.tab] || '分享' }}
                                        </span>
                                        <a :href="`#/topic/${topic.id}`" class="topic_title" :title="topic.title"
                                           :data-id="topic.id">
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
                        </div>
                    </template>
                </Panel>
            </template>

            <template #sideBar>
                <Aside>
                    <template #header>
                        CNode：Node.js专业中文社区
                    </template>
                    <template #inner>
                        <div class="login_register">
                            您可以<a href="#">登录</a>或<a href="#">注册</a>，也可以
                            <a href="#"><span class="span-info">通过 GitHub 登录</span></a>
                        </div>
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
                                         src="https://static2.cnodejs.org/public/images/golangtc-logo.png"
                                         alt=""></a>
                            </li>
                            <li><a href="http://phphub.org/"><img
                                         src="https://static2.cnodejs.org/public/images/phphub-logo.png" alt=""></a>
                            </li>
                        </ol>
                    </template>
                </Aside>
            </template>
        </MainConponent>
        <!-- 加载 -->
        <div class="bottom" ref="updateElement">
            <template>
                <div v-show="loading">


                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6 loading">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span class="loading-text">加载中...</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import MainConponent from '@/components/CNodeMain';
import Panel from '@/components/CNodePanel';
import Aside from '@/components/CNodeAside';
// import Pagination from '@/components/Pagination';
import { mapState } from 'vuex';
export default {
    name: 'CnodeHome',
    components: { Panel, MainConponent, Aside, },
    computed: {
        ...mapState(['topics', 'translaTabs']),

    },
    watch: {
        topics() {
            this.loading = false;
        }
    },
    data() {
        return {
            reqTopicInfo: {
                page: 1,
                tab: 'all',
                limit: 15
            },
            observe: null,
            loading: ''
        };
    },
    mounted() {
        this.getData();
        this.observeLoading(this.$refs.updateElement);
    },
    beforeDestroy() {
        this.observe().unobserve(this.$refs.updateElement);
        IntersectionObserver.disconnect();
    },
    methods: {
        /**
         * 获取数据
         */
        getData() {
            this.$store.dispatch('getTopices', { ...this.reqTopicInfo });
        },

        //监听加载
        observeLoading(element) {
            this.observe = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.loading = true;
                    this.reqTopicInfo.page += 1;
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                }
            }, { root: null, threshold: 0.5 });
            this.observe.observe(element);
        },

        /**
         * 切换Tab类别
         * @param {Object} e -监听元素
         */
        switchTab(e) {
            if (!e.target.closest('a')) return;
            this.reqTopicInfo = this.$options.data().reqTopicInfo;
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

        //分页
        // changePage(...data) {
        //     console.log(data);
        // }
    }
};
</script>

<style lang="less" scoped>
@keyframes loading {
    from {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.bottom {
    margin: 1rem;
    text-align: center;
    color: #444;
    width: 62vw;

    .loading {
        width: 3rem;
        animation-name: loading;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        vertical-align: middle;
    }

    // .loading-text {}
}

.login_register {
    a {
        color: #80db80;
        font-weight: 600;

        .span-info {
            display: inline-block;
            margin-top: 1rem;
            padding: 1rem;
            transition: all 0.2s;
            border-radius: 3px;
            background-color: #5bc0de;
            letter-spacing: 2px;
            color: #fff;
            box-shadow: 2px 1px 6px 1px rgba(0, 0, 0, 0.3);

            &:hover {
                background-color: #2f96b4;
                color: #fff;
            }
        }
    }
}

.friendship-community {
    list-style: none;

    li {
        margin-bottom: 1rem;

        a {
            img {
                width: 15rem;
            }
        }
    }
}
</style>
<template>
    <!-- 主页 -->
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
                            <div class="topic_list" @click="goTopicDetail">
                                <TopicCell :topics="topics" />
                            </div>
                        </div>
                    </template>
                </Panel>
            </template>

            <template #sideBar>
                <!-- <CNodeAside>
                    <template #header>
                        CNode：Node.js专业中文社区
                    </template>
                    <template #inner>
                        <div class="login_register">
                            您可以<a href="#">登录</a>或<a href="#">注册</a>，也可以
                            <a href="#"><span class="span-info">通过 GitHub 登录</span></a>
                        </div>
                    </template>
                </CNodeAside> -->

                <CNodeAssets />
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
// 内容面板组件
import Panel from '@/components/CNodePanel';
// 单个话题组件
import TopicCell from '@/components/CNodeTopicCell';
// 静态组件
import CNodeAssets from '@/components/CNodeAssets';

import { mapState } from 'vuex';
export default {
    name: 'CnodeHome',
    components: { Panel, TopicCell, CNodeAssets },
    computed: {
        // 使用mapState辅助函数返回请求回来的数据
        ...mapState(['topics']),
    },
    watch: {
        // 监听返回的话题，并将加载状态设置为false
        topics() {
            this.loading = false;
        }
    },
    data() {
        return {
            /**
             * 
             *  @param {Object} reqTopicInfo    --请求话题的信息
             *  @param {Object} observe         --监听器
             *  @param {string} loading         --加载状态
             */
            reqTopicInfo: {
                page: 1,
                tab: 'all',
                limit: 20
            },
            observe: null,
            loading: false
        };
    },
    mounted() {
        // 获取初始数据
        this.getData();
        // 开启监听元素
        this.observeLoading(this.$refs.updateElement);
    },
    beforeDestroy() {
        // 销毁监听对象
        this.observe().unobserve(this.$refs.updateElement);
        IntersectionObserver.disconnect();
    },
    methods: {
        /** 获取数据
         * 
         */
        getData() {
            this.$store.dispatch('getTopices', { ...this.reqTopicInfo });
        },

        // 监听加载
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

        /** 切换Tab类别
         * 
         * @param {Object} e -监听元素
         */
        switchTab(e) {
            if (!e.target.closest('a')) return;
            this.reqTopicInfo = this.$options.data().reqTopicInfo;
            this.reqTopicInfo.tab = this.$route.query.tab;
            this.getData();
        },

        /** 进入主题贴
         * 
         */
        goTopicDetail(e) {
            if (!e.target.dataset.id) return;
            this.$router.push({ name: 'topic', params: { id: e.target.dataset.id } });
        },

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
</style>
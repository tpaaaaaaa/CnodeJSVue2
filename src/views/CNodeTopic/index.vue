<!-- 话题详情 -->
<template>
    <div>
        <MainConponent>
            <template #contentPanel>
                <Panel>
                    <template #panelHeader>
                        <div class="topic_header">
                            <span class="topic_full_title">
                                <span class="put_top">{{ topicDetail.top ? '置顶' : topicDetail.tab }}</span>
                                <h2>{{ topicDetail.title }}</h2>
                            </span>
                            <div class="changes">
                                <span>发布于{{ distanceLastTime(topicDetail.create_at) }}前</span>
                                <span>作者
                                    <router-link :to="`/user/${topicDetail.author?.loginname}`">{{
                                            topicDetail.author?.loginname
                                    }}</router-link>
                                </span>
                                <span>{{ topicDetail.visit_count }}浏览</span>
                                <span>来自{{ topicDetail.tab }}</span>
                            </div>
                        </div>
                    </template>
                    <template #panelInner>
                        <div class="inner">
                            <div class="topic_content">
                                <!-- 设置markdown-body类名说明内部是 markdown -->
                                <div class="markdown-body" v-html="topicDetail.content"></div>
                            </div>
                        </div>
                    </template>
                </Panel>
                <Panel>
                    <template #panelHeader>
                        <div class="header">
                            <span class="col_fade">{{ topicDetail.replies?.length }} 回复</span>
                        </div>
                    </template>
                    <template #panelInner>
                        <div class="cell" v-for="(replie, index) of topicDetail.replies" :key="replie.id"
                             @click="goAnchor($event)"
                             :id="'id' + replie.id">
                            <div class="author_content">
                                <a :href="`#/user/${replie.author?.loginname}`" class="user_avatar">
                                    <img :src="replie.author.avatar_url" :alt="replie.author?.loginname">
                                </a>
                                <div class="user_info">
                                    {{ index + 1 }}楼
                                    <a :href="`#/user/${replie.author?.loginname}`" class="reply_author">{{
                                            replie.author?.loginname
                                    }}</a>
                                    <a :href="`/topic/${id}#id${replie.id}`" class="replytime" :data-id="replie.id">
                                        {{ distanceLastTime(replie.create_at) }}前</a>
                                </div>
                                <div class="user_action">
                                    <span v-if="replie.ups?.length > 0"><i>赞</i><span class="up-count">{{
                                            replie.ups?.length
                                    }}</span></span>
                                </div>
                            </div>
                            <div class="reply_content">
                                <div class="markdown-body" v-html="replie.content"></div>
                            </div>
                        </div>
                    </template>
                </Panel>
            </template>
            <template #sideBar>
                <!-- 作者 -->

                <UserCard :userInfo="userInfo" />
                <!-- 最近回复 -->
                <CNodeAside>
                    <template #header>
                        最近回复
                    </template>
                    <template #inner>
                        <OtherTopics @goTopic="goTopicById" :replies="userInfo.recent_replies">
                        </OtherTopics>
                    </template>
                </CNodeAside>
                <!-- 最近话题 -->
                <CNodeAside>
                    <template #header>
                        最近话题
                    </template>
                    <template #inner>
                        <OtherTopics @goTopic="goTopicById" :replies="userInfo.recent_topics?.slice(0, 5)">
                        </OtherTopics>
                    </template>
                </CNodeAside>
            </template>
        </MainConponent>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Panel from '@/components/CNodePanel';
import OtherTopics from '@/components/CNodeOtherTopics';
import UserCard from '@/components/CNodeUserCard';
export default {
    name: 'CnodeTopicDetail',
    components: { Panel, OtherTopics, UserCard },
    props: ['id'],
    computed: {
        ...mapState(['topicDetail', 'userInfo'])
    },
    watch: {
        topicDetail() {
            this.$store.dispatch('getUserByName', this.topicDetail.author?.loginname);
        },
        // 解决前进后退不刷新页面
        $route() {
            const tid = this.$route.params.id;
            if (tid)
                this.getData(tid);
        }
    },
    mounted() {
        this.getData(this.id);
    },
    methods: {
        getData(id) {
            this.$store.dispatch('getTopicById', id);
        },
        goAnchor(e) {
            e;
            if (!e.target.closest('.replytime')) return;
            document.querySelector(`#id${e.target.dataset.id}`).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        },
        goTopicById(e) {
            if (!e.target.dataset.id) return;
            this.$router.push({ name: 'topic', params: { id: e.target.dataset.id } });

        }
    }
};
</script>

<style lang="less" scoped>
.topic_header {
    padding: 1rem;

    .topic_full_title {
        .put_top {
            background-color: #80bd01;
            border-radius: 3px;
            padding: 2px 4px;
            color: #fff;
            font-size: 1.2rem;
        }

        h2 {
            margin-left: 5px;
            display: inline-block;
        }
    }

    .changes {
        margin: 1rem 0;
        color: #838383;
        font-size: 12px;

        span {
            margin-right: 1rem;

            &::before {
                content: '·';
                font-weight: 600;
                padding: 0 2px;
            }

            a {
                color: #838383;
            }
        }
    }
}

.inner {
    padding: 1rem;
    border-top: 1px solid #e5e5e5;
    width: 100%;

    .topic_content {
        width: 100%;


    }
}

// 回复
.header {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
    font-size: 13px;
}

.cell {
    padding: 2rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    .author_content {
        display: flex;
        gap: 1rem;

        .user_avatar {
            img {
                width: 3rem;
                border-radius: 3px;
            }
        }

        .user_info {
            color: #333;

            .reply_author {
                margin-right: 1rem;
                font-size: 12px;
                color: #666;
                font-weight: 600;
            }

            .replytime {
                color: #444;
                font-size: 11px;
            }
        }

        .user_action {
            margin-left: auto;

            .up-count {
                margin-left: 5px;
            }
        }
    }

    .reply_content {
        margin-left: 4rem;

        ::v-deep p {
            margin: 0;
        }
    }
}

.user_card {

    .user_avatar {
        img {
            width: 4.8rem;
            height: 4.8rem;
            vertical-align: middle;
        }
    }

    .user_name {
        margin-left: 1rem;

        a {
            font-size: 16px;
            color: #444;
        }
    }

    .board {
        margin-top: 1rem;
        font-size: 13px;
        color: #80bd01;
        font-weight: 600;
    }

    .create_time {
        margin-top: 1rem;
        font-size: 13px;
        color: #777;
    }
}

.unstyled {
    li {
        div {
            .topic_title {
                display: block;
                margin: 0.5rem 0;
                color: #778087;

                &:hover {
                    color: #333;
                }
            }
        }
    }
}
</style>
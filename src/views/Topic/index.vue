<template>
    <div class="topic_detail">
        <div class="main">
            <div class="content">
                <div class="panel">
                    <div class="topic_header">
                        <span class="topic_full_title">
                            <span class="put_top">{{ topicDetail.top ? '置顶' : topicDetail.tab }}</span>
                            <h2>{{ topicDetail.title }}</h2>
                        </span>
                        <div class="changes">
                            <span>发布于{{ distanceLastTime(topicDetail.create_at) }}前</span>
                            <span>作者
                                <a href="#">{{ topicDetail.author?.loginname }}</a>
                            </span>
                            <span>{{ topicDetail.visit_count }}浏览</span>
                            <span>来自{{ topicDetail.tab }}</span>
                        </div>
                    </div>
                    <div class="inner">
                        <div class="topic_content">
                            <!-- 设置markdown-body类名说明内部是 markdown -->
                            <div class="markdown-body" v-html="topicDetail.content"></div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="header">
                        <span class="col_fade">{{ topicDetail.replies?.length }} 回复</span>
                    </div>
                    <div class="cell" v-for="(replie, index) of topicDetail.replies" :key="replie.id"
                         @click.prevent="goAnchor($event)"
                         :id="'id' + replie.id">
                        <div class="author_content">
                            <a href="#" class="user_avatar">
                                <img :src="replie.author.avatar_url" :alt="replie.author?.loginname">
                            </a>
                            <div class="user_info">
                                {{ index + 1 }}楼
                                <a href="#" class="reply_author">{{ replie.author?.loginname }}</a>
                                <a :href="`/topic/${id}#id${replie.id}`" class="replytime" :data-id="replie.id">
                                    {{ distanceLastTime(replie.create_at) }}前</a>
                            </div>
                            <div class="user_action">
                                <span v-if="replie.ups?.length > 0"><i>赞</i><span class="up-count">{{ replie.ups?.length
                                }}</span></span>
                            </div>
                        </div>
                        <div class="reply_content">
                            <div class="markdown-body" v-html="replie.content"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aside">
                <!-- 作者 -->
                <Aside>
                    <!-- v-slot缩写： #  -->
                    <template #header>
                        作者
                    </template>
                    <template #inner>
                        <div class="user_card">
                            <a class="user_avatar" href="#">
                                <img :src="userInfo.avatar_url" :alt="userInfo.loginname">
                            </a>
                            <span class="user_name">
                                <a href="#">{{ userInfo.loginname }}</a>
                            </span>

                            <div class="board" title="积分">积分：{{ userInfo.score }}
                            </div>
                            <span class="create_time">
                                {{ distanceLastTime(userInfo.create_at) }}前创建
                            </span>
                        </div>
                    </template>
                </Aside>
                <!-- 最近回复 -->
                <Aside>
                    <template #header>
                        最近回复
                    </template>
                    <template #inner>
                        <ul class="unstyled" @click.prevent=goTopicById($event)>
                            <li v-for="topic of userInfo.recent_replies" :key="topic.id">
                                <div>
                                    <a href="#" class="topic_title" :data-id="topic.id" :title="topic.title">{{
                                            topic.title
                                    }}</a>
                                </div>
                            </li>
                        </ul>
                    </template>
                </Aside>
                <!-- 最近话题 -->
                <Aside>
                    <template #header>
                        最近话题
                    </template>
                    <template #inner>
                        <ul class="unstyled" @click.prevent=goTopicById($event)>
                            <li v-for="topic of userInfo.recent_topics?.slice(0, 5)" :key="topic.id">
                                <div>
                                    <a href="#" class="topic_title" :data-id="topic.id" :title="topic.title">{{
                                            topic.title
                                    }}</a>
                                </div>
                            </li>
                        </ul>
                    </template>
                </Aside>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Aside from '@/components/Aside';
export default {
    name: 'TopicDetail',
    props: ['id'],
    components: { Aside },
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
.topic_detail {

    .main {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin: 1rem 2rem;


        .content {
            margin-bottom: 4rem;
            width: 65vw;
            flex: 1;

            .panel {
                margin-bottom: 1rem;
                border-radius: 2px;
                box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
                background-color: #fff;

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

                // 深度选择器，以下是嵌入的html代码（已使用git-markdown-css渲染markdown）
                // ::v-deep .markdown-text {
                //     width: 100%;

                //     p {
                //         // text-align: center;

                //         img {
                //             width: 100%;

                //         }
                //     }

                //     a {
                //         color: #42b983;
                //         font-weight: 600;

                //         &:hover {
                //             text-decoration: underline;
                //         }
                //     }

                //     a.absent {
                //         color: #cc0000;
                //     }

                //     a.anchor {
                //         display: block;
                //         padding-left: 30px;
                //         margin-left: -30px;
                //         cursor: pointer;
                //         position: absolute;
                //         top: 0;
                //         left: 0;
                //         bottom: 0;
                //     }

                //     h1,
                //     h2,
                //     h3,
                //     h4,
                //     h5,
                //     h6 {
                //         margin: 20px 0 10px;
                //         padding: 0;
                //         font-weight: bold;
                //         -webkit-font-smoothing: antialiased;
                //         cursor: text;
                //         position: relative;
                //     }

                //     h1:hover a.anchor,
                //     h2:hover a.anchor,
                //     h3:hover a.anchor,
                //     h4:hover a.anchor,
                //     h5:hover a.anchor,
                //     h6:hover a.anchor {
                //         background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA09pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM2NjlDQjI4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM2NjlDQjM4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzY2OUNCMDg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzY2OUNCMTg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsQhXeAAAABfSURBVHjaYvz//z8DJYCRUgMYQAbAMBQIAvEqkBQWXI6sHqwHiwG70TTBxGaiWwjCTGgOUgJiF1J8wMRAIUA34B4Q76HUBelAfJYSA0CuMIEaRP8wGIkGMA54bgQIMACAmkXJi0hKJQAAAABJRU5ErkJggg==) no-repeat 10px center;
                //         text-decoration: none;
                //     }

                //     h1 tt,
                //     h1 code {
                //         font-size: inherit;
                //     }

                //     h2 tt,
                //     h2 code {
                //         font-size: inherit;
                //     }

                //     h3 tt,
                //     h3 code {
                //         font-size: inherit;
                //     }

                //     h4 tt,
                //     h4 code {
                //         font-size: inherit;
                //     }

                //     h5 tt,
                //     h5 code {
                //         font-size: inherit;
                //     }

                //     h6 tt,
                //     h6 code {
                //         font-size: inherit;
                //     }

                //     h1 {
                //         font-size: 32px;
                //         color: #2B3F52;
                //     }

                //     h2 {
                //         font-size: 28px;
                //         padding-bottom: 1rem;
                //         border-bottom: 1px solid #DDE4E9;
                //         color: #2B3F52;
                //     }

                //     h3 {
                //         font-size: 18px;
                //         color: #2B3F52;
                //     }

                //     h4 {
                //         font-size: 16px;
                //         color: #2B3F52;
                //     }

                //     h5 {
                //         font-size: 14px;
                //         color: #2B3F52;
                //     }

                //     h6 {
                //         color: #2B3F52;
                //         font-size: 14px;
                //     }

                //     p,
                //     blockquote,
                //     ul,
                //     ol,
                //     dl,
                //     li,
                //     table,
                //     pre {
                //         margin: 15px 0;
                //         color: #516272;
                //     }

                //     ul {
                //         list-style: disc;
                //     }

                //     hr {
                //         margin: 20px 0;
                //         border: 0;
                //         border-top: 1px solid #eee;
                //         border-bottom: 1px solid #fff;

                //     }

                //     body>h2:first-child {
                //         margin-top: 0;
                //         padding-top: 0;
                //     }

                //     body>h1:first-child {
                //         margin-top: 0;
                //         padding-top: 0;
                //     }

                //     body>h1:first-child+h2 {
                //         margin-top: 0;
                //         padding-top: 0;
                //     }

                //     body>h3:first-child,
                //     body>h4:first-child,
                //     body>h5:first-child,
                //     body>h6:first-child {
                //         margin-top: 0;
                //         padding-top: 0;
                //     }

                //     a:first-child h1,
                //     a:first-child h2,
                //     a:first-child h3,
                //     a:first-child h4,
                //     a:first-child h5,
                //     a:first-child h6 {
                //         margin-top: 0;
                //         padding-top: 0;
                //     }

                //     h1 p,
                //     h2 p,
                //     h3 p,
                //     h4 p,
                //     h5 p,
                //     h6 p {
                //         margin-top: 0;
                //     }

                //     li p.first {
                //         display: inline-block;
                //     }

                //     li {
                //         margin: 0;
                //     }

                //     ul,
                //     ol {
                //         padding-left: 30px;
                //     }

                //     ul :first-child,
                //     ol :first-child {
                //         margin-top: 0;
                //     }

                //     dl {
                //         padding: 0;
                //     }

                //     dl dt {
                //         font-size: 14px;
                //         font-weight: bold;
                //         font-style: italic;
                //         padding: 0;
                //         margin: 15px 0 5px;
                //     }

                //     dl dt:first-child {
                //         padding: 0;
                //     }

                //     dl dt> :first-child {
                //         margin-top: 0;
                //     }

                //     dl dt> :last-child {
                //         margin-bottom: 0;
                //     }

                //     dl dd {
                //         margin: 0 0 15px;
                //         padding: 0 15px;
                //     }

                //     dl dd> :first-child {
                //         margin-top: 0;
                //     }

                //     dl dd> :last-child {
                //         margin-bottom: 0;
                //     }

                //     blockquote {
                //         border-left: 4px solid #d2d8dd;
                //         /*padding: 0 15px;*/
                //         padding: 15px;
                //         background-color: #F7F9FA;
                //         color: #2B3F52;
                //     }

                //     blockquote> :first-child {
                //         margin-top: 0;
                //     }

                //     blockquote> :last-child {
                //         margin-bottom: 0;
                //     }

                //     table {
                //         padding: 0;
                //         border-collapse: collapse;
                //     }

                //     table tr {
                //         border-top: 1px solid #cccccc;
                //         background-color: white;
                //         margin: 0;
                //         padding: 0;
                //     }

                //     table tr:nth-child(2n) {
                //         background-color: #f8f8f8;
                //     }

                //     table tr th {
                //         font-weight: bold;
                //         border: 1px solid #cccccc;
                //         margin: 0;
                //         padding: 6px 13px;
                //     }

                //     table tr td {
                //         border: 1px solid #cccccc;
                //         margin: 0;
                //         padding: 6px 13px;
                //     }

                //     table tr th :first-child,
                //     table tr td :first-child {
                //         margin-top: 0;
                //     }

                //     table tr th :last-child,
                //     table tr td :last-child {
                //         margin-bottom: 0;
                //     }

                //     img {
                //         max-width: 100%;
                //     }

                //     span.frame {
                //         display: block;
                //         overflow: hidden;
                //     }

                //     span.frame>span {
                //         border: 1px solid #dddddd;
                //         display: block;
                //         float: left;
                //         overflow: hidden;
                //         margin: 13px 0 0;
                //         padding: 7px;
                //         width: auto;
                //     }

                //     span.frame span img {
                //         display: block;
                //         float: left;
                //     }

                //     span.frame span span {
                //         clear: both;
                //         color: #333333;
                //         display: block;
                //         padding: 5px 0 0;
                //     }

                //     span.align-center {
                //         display: block;
                //         overflow: hidden;
                //         clear: both;
                //     }

                //     span.align-center>span {
                //         display: block;
                //         overflow: hidden;
                //         margin: 13px auto 0;
                //         text-align: center;
                //     }

                //     span.align-center span img {
                //         margin: 0 auto;
                //         text-align: center;
                //     }

                //     span.align-right {
                //         display: block;
                //         overflow: hidden;
                //         clear: both;
                //     }

                //     span.align-right>span {
                //         display: block;
                //         overflow: hidden;
                //         margin: 13px 0 0;
                //         text-align: right;
                //     }

                //     span.align-right span img {
                //         margin: 0;
                //         text-align: right;
                //     }

                //     span.float-left {
                //         display: block;
                //         margin-right: 13px;
                //         overflow: hidden;
                //         float: left;
                //     }

                //     span.float-left span {
                //         margin: 13px 0 0;
                //     }

                //     span.float-right {
                //         display: block;
                //         margin-left: 13px;
                //         overflow: hidden;
                //         float: right;
                //     }

                //     span.float-right>span {
                //         display: block;
                //         overflow: hidden;
                //         margin: 13px auto 0;
                //         text-align: right;
                //     }

                //     code,
                //     tt {
                //         margin: 0 2px;
                //         padding: 0 5px;
                //         white-space: nowrap;
                //         border: 1px solid #eaeaea;
                //         background-color: #f8f8f8;
                //         border-radius: 3px;
                //     }

                //     pre code {
                //         margin: 0;
                //         padding: 0;
                //         white-space: pre;
                //         border: none;
                //         background: transparent;
                //     }

                //     .highlight pre {
                //         background-color: #f8f8f8;
                //         // border: 1px solid #cccccc;
                //         font-size: 13px;
                //         line-height: 19px;
                //         overflow: auto;
                //         padding: 6px 10px;
                //         border-radius: 3px;
                //     }

                //     pre {
                //         background-color: #f8f8f8;
                //         // border: 1px solid #cccccc;
                //         font-size: 13px;
                //         line-height: 19px;
                //         overflow: auto;
                //         padding: 6px 10px;
                //         border-radius: 3px;
                //     }

                //     pre code,
                //     pre tt {
                //         background-color: transparent;
                //         border: none;
                //     }

                //     sup {
                //         font-size: 0.83em;
                //         vertical-align: super;
                //         line-height: 0;
                //     }

                //     code {
                //         white-space: pre-wrap;
                //         word-break: break-all;
                //         display: inline-block;

                //     }

                //     * {
                //         -webkit-print-color-adjust: exact;
                //     }

                //     @media screen and (min-width: 914px) {
                //         body {
                //             width: 960px;
                //             margin: 0 auto;
                //         }
                //     }

                //     @media print {

                //         table,
                //         pre {
                //             page-break-inside: avoid;
                //         }

                //         pre {
                //             word-wrap: break-word;
                //         }
                //     }
                // }
            }
        }

        .aside {
            width: 30vw;
            max-width: 30rem;
            min-width: 25rem;

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
        }
    }
}
</style>
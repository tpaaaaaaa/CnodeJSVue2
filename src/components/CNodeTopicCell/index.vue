<template>
    <!-- 带有详细信息的话题列表 --需要传话题数组和显示阅读回复数的参数进来 -->
    <div>
        <div class="cell" v-for="topic of topics" :key="topic.id">
            <!-- 头像 -->
            <a :href="`#/user/${topic.author.loginname}`" class="user_avatar">
                <img
                     :src="topic.author.avatar_url"
                     :title="topic.author.loginname">
            </a>
            <!-- 回复 -->
            <span class="reply_count" v-if="!noNum">
                <span class="count_of_replies" title="回复数">{{ topic.reply_count }}</span>
                <span class="count_seperator">/</span>
                <span class="count_of_visits" title="点击数">{{ topic.visit_count }}</span>
            </span>

            <!-- 标题内容 -->
            <div class="topic_title_wrapper">
                <span v-if="topic.tab"
                      :class="{ 'put_top': topic.top, 'topiclist-tab': !topic.top, 'category_tab': 1 }">
                    {{ topic.top ? '置顶' : translaTabs[topic.tab] || '分享' }}
                </span>
                <span v-if="!topic.tab"
                      :class="{ 'put_top': topic.author?.loginname === $route.params.loginname, 'topiclist-tab': !(topic.author?.loginname === $route.params.loginname), 'category_tab': 1 }">
                    {{ topic.author?.loginname === $route.params.loginname ? '创建' : '参与'
                    }}
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
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'TopicCell',
    props: ['topics', 'noNum'],
    computed: {
        ...mapState(['translaTabs']),
    },
};
</script>

<style lang="less" scoped>
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
            color: #fff;
        }

        .topiclist-tab {
            background-color: #e5e5e5;
            color: #999;
        }

        .category_tab {
            width: 3.6rem;
            border-radius: 3px;
            padding: 2px 4px;
            font-size: 1.2rem;
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

@media (max-width:900px) {
    .topic_title_wrapper {
        width: 60%;
    }
}
</style>
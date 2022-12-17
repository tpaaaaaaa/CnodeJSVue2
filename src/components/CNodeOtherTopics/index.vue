<template>
    <!-- 只显示话题标题的列表 -->
    <ul class="unstyled" @click.prevent=goTopicById($event)>
        <li v-for="topic of replies" :key="topic.id">
            <div>
                <a :href="`#/topic/${topic.id}`" class="topic_title" :data-id="topic.id"
                   :title="topic.title">{{
                           topic.title
                   }}</a>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'OtherTopics',
    props: ['replies'],
    methods: {
        goTopicById(e) {
            this.$emit('goTopic', e);
        }
    }
};
</script>

<style lang="less" scoped>
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
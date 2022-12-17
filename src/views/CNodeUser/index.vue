<!-- 用户个人信息 -->
<template>
    <div>
        <MainConponent>
            <template #contentPanel>
                <UserCard :userInfo="userInfo" />

                <CNodeAside>
                    <!-- v-slot缩写： #  -->
                    <template #header>
                        最近参与话题
                    </template>
                    <template #inner>
                        <TopicCell :topics="userInfo.recent_replies" :noNum="true" />
                    </template>
                </CNodeAside>
                <CNodeAside>
                    <!-- v-slot缩写： #  -->
                    <template #header>
                        最近创建的话题
                    </template>
                    <template #inner>
                        <TopicCell :topics="userInfo.recent_topics" :noNum="true" />
                    </template>
                </CNodeAside>

            </template>
            <template #sideBar>
                <CNodeAssets />
            </template>
        </MainConponent>
    </div>
</template>

<script>
import CNodeAssets from '@/components/CNodeAssets';
import UserCard from '@/components/CNodeUserCard';
import TopicCell from '@/components/CNodeTopicCell';
import { mapState } from 'vuex';
export default {
    name: 'CNodeUser',
    props: ['loginname'],
    components: { CNodeAssets, UserCard, TopicCell },
    computed: { ...mapState(['userInfo']) },
    mounted() {
        console.log(this.loginname);
        this.getData();
    },
    methods: {
        getData() {
            this.$store.dispatch('getUserByName', this.loginname);
        }
    }
};
</script>

<style lang="less" scoped>
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
        margin: 1rem 0;
        font-size: 13px;
        color: #80bd01;
        font-weight: 600;
    }

    .create_time {
        font-size: 13px;
        color: #777;
    }
}
</style>
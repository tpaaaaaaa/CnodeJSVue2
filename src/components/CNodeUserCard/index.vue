<template>
    <!-- 个人信息卡组件--需要传userInfo{对象}进来 -->
    <Aside>
        <template #header>
            个人信息
        </template>
        <template #inner>
            <div class="user_card">
                <router-link class="user_avatar" :to="`/user/${userInfo.loginname}`">
                    <img :src="userInfo.avatar_url" :alt="userInfo.loginname">
                </router-link>

                <span class="user_name">
                    <router-link :to="`/user/${userInfo.loginname}`">{{ userInfo.loginname }}</router-link>
                </span>

                <div class="board" title="积分">积分：{{ userInfo.score }}
                </div>
                <span class="create_time">
                    {{ distanceLastTime(userInfo.create_at) }}前创建
                </span>
            </div>
        </template>
    </Aside>
</template>

<script>
import Aside from '@/components/CNodeAside';
export default {
    name: 'UserCard',
    props: ['userInfo'],
    components: { Aside }
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
</style>
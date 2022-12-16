<template>
    <div class="navbar" ref="top">

        <div class="fixed">

            <div class="navbar-inner">
                <router-link class="brand" :to="{ name: 'home' }" @click.prevent="">
                    <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
                </router-link>
                <div class="navbar-search">
                    <form>
                        <input type="text" name="q" id="q" class="search-query span3">
                    </form>
                </div>
                <ul class="nav">
                    <li><router-link to="/home">首页</router-link> </li>
                    <li><a href="#">新手入门</a></li>
                    <li><a href="#">API</a></li>
                    <li><router-link to="/testhome">测试</router-link></li>
                    <li><a href="#">注册</a></li>
                    <li><a href="#">登录</a></li>
                </ul>
            </div>
            <div class="backtotop" @click="goTop"><span>回到顶部</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CnodeHeader',
    methods: {
        goTop() {
            this.$refs.top.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
</script>

<style lang="less" scoped>
.navbar {
    // background-color: #444;
    min-height: 5rem;

    &::after {
        content: '';
        clear: both;
    }

    .fixed {
        position: fixed;
        background-color: #444;
        min-height: 5rem;
        width: 100%;
        overflow-wrap: break-word;
    }

    .navbar-inner {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 2vw;
        // height: 5rem;
        padding: 0.5rem 1rem;

        // logo
        .brand {
            min-width: 16rem;
            height: 4rem;
            padding: 4px 20px;
            white-space: nowrap;

        }

        // 搜索
        .navbar-search {
            // 搜索框靠左对齐
            margin-right: auto;
            width: 23rem;


            .search-query {
                border: 0;
                width: 100%;
                height: 2.6rem;
                padding: 3px 5px 3px 24px;
                border-radius: 10px;
                background: #888 url('https://static2.cnodejs.org/public/images/search.e53b380a.hashed.png') 4px 4px no-repeat;
                transition: all 0.5s;

                &:focus {
                    outline: 0;
                }

                &:hover,
                &:focus {
                    background-color: #fff;
                }


            }
        }

        // 导航
        .nav {
            display: flex;
            padding: 1rem;

            li {
                a {
                    text-shadow: none;
                    color: #ccc;
                    padding: 1rem 1.5rem;
                    white-space: nowrap;

                    &:hover {
                        color: #fff;
                    }
                }
            }
        }

    }

    // 返回顶部按钮
    .backtotop {
        position: fixed;
        top: 85vh;
        right: 3vw;
        width: 4rem;
        // height: auto;
        font-size: 1.4rem;
        text-align: center;
        background-color: #eee;
        box-shadow: 1px 1px 1px rgba(128, 128, 128, 0.411);
        cursor: pointer;
    }
}
</style>
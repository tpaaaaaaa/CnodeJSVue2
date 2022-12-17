<template>
    <div class="navbar">

        <div class="fixed">
            <!-- 导航内容 -->
            <div class="navbar-inner">
                <!-- logo -->
                <router-link class="brand" :to="{ name: 'home' }" @click.prevent="">
                    <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
                </router-link>
                <!-- 搜索 -->
                <div class="navbar-search">
                    <form>
                        <input type="text" name="q" id="q" class="search-query span3">
                    </form>
                </div>
                <!-- 菜单列表（图标） -->
                <div class="nav-more" @click="showNav">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <!-- 菜单列表 -->
                <ul class="nav" v-show="isShowNav">
                    <li><router-link to="/home">首页</router-link> </li>
                    <li><a href="https://cnodejs.org/getstart">新手入门</a></li>
                    <li><a href="https://cnodejs.org/api">API</a></li>
                    <li><router-link to="/testtopic/6262718079f90d94a6a0d2f5">测试</router-link></li>
                    <li><a href="https://cnodejs.org/signup">注册(X)</a></li>
                    <li><a href="https://cnodejs.org/signin">登录(X)</a></li>
                </ul>
            </div>
            <!-- 返回置顶 -->
            <transition name="fade">
                <div class="backtotop" @click="goTop" v-show="showBackTop"><span>回到顶部</span></div>
            </transition>
        </div>
        <!-- 定位显示返回置顶 -->
        <div class="empty" ref="absolute"></div>
    </div>
</template>

<script>
export default {
    name: 'CnodeHeader',
    data() {
        return {
            observe: null,
            showBackTop: false,
            isShowNav: false
        };
    },
    mounted() {
        console.log(window.outerHeight);
        this.backTopObserve();
        this.observe.observe(this.$refs.absolute);

    },
    beforeDestory() {
        this.observe.unobserve(this.$refs.absolute);
    },
    methods: {
        goTop() {
            this.$refs.top.scrollIntoView({ behavior: 'smooth' });
        },
        // 监听属性
        backTopObserve() {
            this.observe = new IntersectionObserver((entries) => {
                const [entry] = entries;
                this.showBackTop = !entry.isIntersecting;
            }, { root: null, threshold: 0.15 });

        },
        // 切换菜单显示状态
        showNav() {
            this.isShowNav = !this.isShowNav;
        }
    },

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

    .empty {
        position: absolute;
        top: 100px;
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
            min-width: 10rem;


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
        top: 60vh;
        right: 0;

        background-color: rgb(255, 255, 255);
        border: 1px solid rgba(128, 128, 128, 0.2);
        border-radius: 1rem 0 0 1rem;
        writing-mode: vertical-rl;
        cursor: pointer;

        span {
            display: inline-block;
            padding: 5px 0 0px 5px;
            height: 10rem;
            font-size: 1.3rem;
            text-align: center;
            letter-spacing: 8px;
            color: #666;
        }

        &.hidden {
            display: none;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
}

.nav-more {
    display: none;
    margin-right: 1rem;
    min-width: 3.5rem;
    min-height: 3.5rem;
    cursor: pointer;
}

@media (min-width:700px) {
    .navbar {
        .navbar-inner {
            .nav {
                display: flex !important;
            }
        }
    }
}

@media (max-width:700px) {
    .navbar {
        .navbar-inner {
            .nav-more {
                display: inline-block;

            }

            .navbar-search {
                width: 10rem;
            }

            .nav {
                // display: none;
                position: absolute;
                background-color: #666;
                top: 5rem;
                right: 0;

                // display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>
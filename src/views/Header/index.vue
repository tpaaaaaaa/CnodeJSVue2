<template>
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#" @click.prevent="">
                <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
            </a>
            <div class="navbar-search">
                <form>
                    <input type="text" name="q" id="q" class="search-query span3">
                </form>
            </div>
            <ul class="nav">
                <li><a href="#">首页</a></li>
                <li><a href="#">新手入门</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">关于</a></li>
                <li><a href="#">注册</a></li>
                <li><a href="#">登录</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CnodeHeader',
};
</script>

<style lang="less" scoped>
.navbar {

    background-color: #444;

    .navbar-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 2vw;
        // height: 5rem;
        padding: 0.5rem 1rem;

        // logo
        .brand {
            width: 16rem;
            height: 4rem;
            padding: 4px 20px;

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

                    &:hover {
                        color: #fff;
                    }
                }
            }
        }

    }
}
</style>
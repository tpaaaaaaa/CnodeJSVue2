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
            <div class="nav">导航页</div>
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
        align-items: center;
        justify-content: space-between;
        margin: 0 2vw;
        height: 5rem;

        .brand {
            width: 16rem;
            height: 4rem;
            padding: 4px 20px;

        }

        .navbar-search {
            // 搜索框靠左对齐
            margin-right: auto;

            .search-query {}
        }

    }
}
</style>
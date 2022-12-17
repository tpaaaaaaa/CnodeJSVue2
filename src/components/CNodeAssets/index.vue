<template>
    <!-- 静态组件--没有值传进来 -->
    <div>
        <!-- 友情链接 -->
        <CNodeAside>
            <template #header>
                友情社区
            </template>
            <template #inner>
                <ol class="friendship-community">
                    <li><a href="https://ruby-china.org/">
                            <img src="https://static2.cnodejs.org/public/images/ruby-china-20150529.png"
                                 alt=""></a>
                    </li>
                    <li><a href="http://golangtc.com/"><img
                                 src="https://static2.cnodejs.org/public/images/golangtc-logo.png"
                                 alt=""></a>
                    </li>
                    <li><a href="http://phphub.org/"><img
                                 src="https://static2.cnodejs.org/public/images/phphub-logo.png" alt=""></a>
                    </li>
                </ol>
            </template>
        </CNodeAside>
        <!-- 客户端二维码 -->
        <CNodeAside>
            <template #header>
                客户端二维码
            </template>
            <template #inner>
                <div class="cnode-app-download">
                    <img width="200" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU">
                    <a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
                </div>
            </template>
        </CNodeAside>
    </div>
</template>

<script>
export default {
    name: 'CNodeAssets',
};
</script>

<style lang="less" scoped>
.friendship-community {
    list-style: none;

    li {
        margin-bottom: 1rem;

        a {
            img {
                width: 15rem;
            }
        }
    }
}

.cnode-app-download {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    a {
        color: #666;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
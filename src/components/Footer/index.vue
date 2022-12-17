<template>
    <div class="footer">
        <div class="footer_main">
            <div class="links">
                <a href="#" class="dark">RSS</a>
                <span></span>
                <a href="#" class="dark">源码地址</a>
            </div>
            <div class="col_fade">
                <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                <p>
                    服务器搭建在
                    <a href="https://www.digitalocean.com/?refcode=eba02656eeb3">
                        <img src="https://static2.cnodejs.org/public/images/digitalocean.png" alt="">
                    </a>
                    ，存储赞助商为
                    <a href="http://www.qiniu.com/?ref=cnode">
                        <img src="https://static2.cnodejs.org/public/images/qiniu.png" alt="">
                    </a>
                </p>
                <p>新手搭建 Node.js 服务器，推荐使用无需备案的
                    <a href="https://www.digitalocean.com/">DigitalOcean(https://www.digitalocean.com/)</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CnodeFooter',
};
</script>

<style lang="less" scoped>
.footer {
    background-color: #fff;
    color: #e2e2e2;
    box-shadow: 0px -1px 6px 3px rgb(0 0 0 / 10%);

    .footer_main {
        padding: 2rem;

        .links {
            a {
                color: #666;
            }

            span {
                margin: 0 5px;
                border-right: 1px solid #666;
            }
        }

        .col_fade {
            color: #ababab;

            p {
                line-height: 2rem;
                font-size: 14px;
                margin-bottom: 1rem;

                a {
                    color: #08c;

                    img {
                        height: auto;
                        max-width: 100%;
                        border: 0;
                        width: 9.2rem;
                    }

                    &:hover {
                        color: #005580;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
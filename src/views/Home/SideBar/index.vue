<template>
    <div class="sidebar">
        <div class="panel">
            <div class="inner">
                <p>标题</p>
                <div>
                    您可以<a href="#">登录</a>或<a href="#">注册</a>，也可以
                    <a href="#"><span class="span-info">通过GitHub登录</span></a>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">无人回复话题</span>
            </div>
            <div class="inner">
                <ul class="unstyled">
                    <li>
                        <div><a href="#" class="topic_title">标题</a></div>
                    </li>
                    <li>
                        <div><a href="#" class="topic_title">标题</a></div>
                    </li>
                    <li>
                        <div><a href="#" class="topic_title">标题</a></div>
                    </li>
                    <li>
                        <div><a href="#" class="topic_title">标题</a></div>
                    </li>
                    <li>
                        <div><a href="#" class="topic_title">标题</a></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
};
</script>

<style lang="less" scoped>
.sidebar {
    .panel {
        margin-top: 1rem;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;

        &:first-child {
            margin-top: 0;
        }

        .header {
            padding: 1rem;
            color: #51585c;
            background-color: #f6f6f6;
            border-radius: 3px 3px 0 0;
        }

        .inner {
            padding: 1rem;

            a {
                color: #778087;
            }

            .unstyled {
                .topic_title {
                    font-size: 14px;
                    max-width: 27rem;
                }
            }

        }
    }
}
</style>
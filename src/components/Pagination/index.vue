<template>
    <div class="pagination">
        {{ pageInfo }}
        <ul>
            <li><a href="#" class="prev_page"> &lt;&lt;</a> </li>
            <li><a href="#" class="active">1</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#" class="next_page">&gt;&gt;</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CnodePagination',
    props: ['pageInfo'],
    methods: {

    }
};
</script>

<style lang="less" scoped>
// 分页
.pagination {
    padding: 1rem;

    ul {
        display: flex;
        justify-content: center;
        gap: 1px;

        li {
            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.2rem;
                height: 3rem;
                border: 1px solid rgba(128, 128, 128, 0.2);
                border-radius: 3px;

                &:hover {
                    background-color: #f6f6f6;
                }

                &.active {
                    color: #9ad813;
                }
            }
        }

        .prev_page,
        .next_page {
            letter-spacing: -4px;
        }
    }
}
</style>
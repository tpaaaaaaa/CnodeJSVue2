<template>
    <div>
        <MainConponent>
            <template #contentPanel>
                <Panel>
                    <template #panelHeader>
                        11
                    </template>

                    <template #panelInner>
                        22
                    </template>
                </Panel>
            </template>
            <template #sideBar>
                <Aside>

                    <template #header>
                        CNode：Node.js专业中文社区
                    </template>
                    <template #inner>22</template>
                </Aside>
            </template>
        </MainConponent>
    </div>
</template>

<script>
import MainConponent from '@/components/CNodeMain';
import Panel from '@/components/CNodePanel';
import Aside from '@/components/CNodeAside';
export default {
    name: 'CNodeUser',
    props: ['loginname'],
    components: { Panel, MainConponent, Aside, },
    mounted() {
        console.log(this.loginname);
    }
};
</script>

<style lang="less" scoped>

</style>
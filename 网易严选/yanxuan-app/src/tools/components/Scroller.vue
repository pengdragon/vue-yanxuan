<template>
<div class="scroller-wrap" ref="wrap">
    <div class="scroller">
        <slot/>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'scroller',
    methods: {
        // 滚动视图执行滚动的方法
        scrollTo(y, duration){
            this.scroll && this.scroll.scrollTo(0, y, duration);
        }
    },
    mounted(){
        // 组件的dom结构挂载完成
        // 创建滚动视图
        // 识别容器的大小，计算滚动视图可滚动的范围
        let scroll = new BScroll(this.$refs.wrap, {
            click: true,
            tap: true
        });
        this.scroll = scroll;

        // 在用户每一次需要滚动前，刷新滚动视图，识别滚动视图的高度
        scroll.on('beforeScrollStart', ()=>{
            // console.log('刷新滚动视图');
            // 刷新滚动视图，会重新计算滚动视图可滚动的范围
            scroll.refresh();
        })
    }
}
</script>

<style>

</style>

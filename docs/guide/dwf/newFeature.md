# 部分高级特性
## 超级控件-轮播图
```javascript
<template>
	<div>
		<Button @click="getwidth">Hello World</Button>
		<Carousel v-model="value1" ref="carouselvue" loop>
        <CarouselItem>
            <div class="demo-carousel">1</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
    </Carousel>
	</div>
</template>
<script>
 import { Button,Carousel } from 'iview';
export default {
	components: { Button, Carousel },
	data() {
		return {
			value1:0,
		}
	},
    mounted: function() {
        console.log('mounted')
        console.log(this.$refs.carouselvue)
    },
    created: function() {
        console.log('created')
        console.log(this.$refs.carouselvue)
    },
    methods: {
        getwidth: function(){
            console.log('click')
            console.log(this.$refs.carouselvue)
        }
    }
}
</script>
<style>

@import "../../node_modules/iview/dist/styles/iview.css";
.demo-carousel {
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
}
</style>
```
## 超级控件-星级选择器
```javascript
<template>
	<Rate allow-half v-model="value" />
</template>
<script>
import { Rate } from 'iview';
export default {
	components: { Rate },
	data() {
		return {
			value: 2.5
		}
	},
}
</script>
<style>

@import "../../node_modules/iview/dist/styles/iview.css";

</style>
```
## 动态参数控件

## 订阅控件

## 移动端开发
 

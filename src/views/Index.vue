<template>
	<transition name="rotate-fall">
		<div>
			<IndexHeader></IndexHeader>
			<div class="content">
				 <LeftNav></LeftNav>
				 <div class="container">
					 <router-view/>
				 </div>
			</div>
		</div>
	</transition>	
</template>
<script type="text/babel">
  import LeftNav from "@/components/LeftNav";
  import IndexHeader from "@/components/Header";
	import 'vue-transition.css'
    export default {
        data(){
            return {}

        },
        mounted(){

        },
        methods: {},
        components: {
          LeftNav,
          IndexHeader
        }
    }

</script>

<style lang="scss">
	.content{background:rgb(228, 230, 233);width: 100%;display: flex}
	.container{flex: 1;padding: 15px;background:rgb(228, 230, 233)}
	.el-menu{border-right: 0;}
	.panel{
		margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
		overflow: hidden;
	}
	.panel-heading{		
		border-bottom: 1px solid transparent;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
		border-color: #eff2f7;
		font-size: 16px;
		font-weight: 300;
		padding: 10px 15px;
	}
</style>

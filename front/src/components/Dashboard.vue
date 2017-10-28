<template>
<div class="dashboard">
<!-- <div id="myChart"></div> -->
<el-select v-model="value" placeholder="请选择">
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</div>
</template>

<style>
#myChart {
  width: 300px;
  height: 300px;
}
</style>

<script>
import CONSTANT from '../store/constants'

export default {
  name: 'hello',
  data () {
    return {
      value: '',
      CONSTANT,
      options: this.getOptions()
    }
  },
  mounted(){
    this.getOptions();
    // this.drawLine();
  },
  methods: {
    getOptions() {
      // const CONSTANT = this.$refs.CONSTANT
      console.log('CONSTTANT');
      console.dir(CONSTANT);
      const district_names = CONSTANT.DISTRICT_NAMES;
      console.dir(district_names);
      let options = [];
      district_names.forEach((district) => {
        let ele = {};
        ele.value = district;
        ele.label = district;
        options.push(ele);
      })
      console.dir(options);
      return options;
    },
    // drawLine() {
    //     // 基于准备好的dom，初始化echarts实例
    //     let myChart = this.$echarts.init(document.getElementById('myChart'))
    //     // 绘制图表
    //     myChart.setOption({
    //         title: { text: '在Vue中使用echarts' },
    //         tooltip: {},
    //         xAxis: {
    //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }]
    //     });
    // }
  }
}
</script>
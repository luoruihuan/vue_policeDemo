<template>
	<div class="charts_box">
        <p class="titlestyle">任务完成率</p>
        <div id="msg_type" class="charttype"></div>
        <p class="titlestyle">信息类别</p>
        <div id="msg_status" class="charttype">信息类别</div>
        <p class="titlestyle">完成任务</p>
        <div id="has_finish" class="charttype">完成任务</div>
        <p class="titlestyle">任务来源</p>
        <div id="work_from" class="charttype">任务来源</div>
        <ul class="title_box clearfic">
            <li class="dislockline float_left titlestyle">当前完成率</li>
            <li class="dislockline float_left titlestyle">完成任务给分率</li>
        </ul>
        <section class="title_content">
            <div class="dislockline float_left" id="info_report"></div>
            <div class="dislockline float_left" id="caifen_staus"></div>
        </section>
        <p class="titlestyle">任务源排行TOP10</p>
        <div id="week_address" class="charttype"></div>



        <p class="titlestyle">完成率排行TOP10</p>
        <section class="title_content">
          <div class="dislockline float_left" id="haschange_a"></div>
          <div class="dislockline float_left" id="haschange_b"></div>
        </section>
        <p class="titlestyle">完成量TOP10</p>
        <section class="title_content">
          <div class="dislockline float_left" id="haschange_c"></div>
          <div class="dislockline float_left" id="haschange_d"></div>
        </section>
        <p class="titlestyle">得分TOP10</p>
        <section class="title_content">
          <div class="dislockline float_left" id="haschange_e"></div>
          <div class="dislockline float_left" id="haschange_f"></div>
        </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default {
      props:{},
      data(){
          return{
            great:0,
          }
      },
      created(){

      },
      mounted(){
          this.echartInit()
      },
      methods:{
          echartInit(){
            let myChart1 = echarts.init(document.getElementById('msg_type'));
            myChart1.setOption({
              tooltip: {trigger: 'axis'},
              legend: {
                top: 10,
                right: 30,
                data: [{name: '上报率', icon: 'bar'}, {name: '采用率', icon: 'bar'}],
                textStyle: {fontSize: 14, color: '#666',fontFamily:'MicrosoftYaHei'}
              },
              grid:{x:50,y:8,x2:50,y2:25},
              xAxis: [{
                type: 'category', boundaryGap: false, splitLine: {show: false}, axisTick: {show: false},
                axisTick: {show: false},
                axisLine: {show: false,color:'red'},
                axisLabel:{textStyle:{color: '#50697a',fontSize: 14,fontFamily:'Microsoft-Regular'}},
                data: ['2017-01-30', '2017-02-30', '2017-03-30', '2017-04-30', '2017-05-30', '2017-06-30', '2017-07-30', '2017-08-30', '2017-09-30', '2017-10-30', '2017-11-30', '2017-12-30']
              }],
              yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel:{textStyle:{color: '#50697a',fontSize: 14,fontFamily:'Microsoft-Regular'}},
              }],
              series: [{
                name: '上报率', type: 'line', symbol: 'none', smooth: true, itemStyle: {normal: {color: '#72e9c8'}},
                areaStyle: {normal: {color: 'rgba(114, 233, 200, 0.1)'}},
                data: [120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210, 245]
              },
                {
                  name: '采用率', type: 'line', symbol: 'none', smooth: true, itemStyle: {normal: {color: '#dfc50b'}},
                  data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 180]
                }]
            });
            let myChart2 = echarts.init(document.getElementById('msg_status'));
            myChart2.setOption({
              grid:{x:50,y:8,x2:50,y2:25},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['政治治安','维权群体','涉警信息','涉恐涉少数民族','其他舆情类信息'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'信息状态',
                  type:'bar',
                  data:[52,38,38,38,25],
                  itemStyle: {
                    normal: {
                      barBorderRadius:10,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3cb2e6','#66cad5','#9fcf83','#56c4ab',
                          '#74c1dc','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                          '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart3 = echarts.init(document.getElementById('has_finish'));
            myChart3.setOption({
              grid:{x:50,y:8,x2:50,y2:25},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['编报','落地调查','编报','信息处理','线索核查','其他'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'信息状态',
                  type:'bar',
                  data:[52,38,38,38,25,25],
                  itemStyle: {
                    normal: {
                      barBorderRadius:10,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3cb2e6','#66cad5','#9fcf83','#56c4ab',
                          '#74c1dc','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                          '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart4 = echarts.init(document.getElementById('work_from'));
            myChart4.setOption({
              grid:{x:50,y:8,x2:50,y2:25},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['深圳','广州','东莞','其他'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'信息状态',
                  type:'bar',
                  data:[52,38,38,38],
                  itemStyle: {
                    normal: {
                      barBorderRadius:10,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3cb2e6','#66cad5','#9fcf83','#56c4ab',
                          '#74c1dc','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                          '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart5 = echarts.init(document.getElementById('info_report'));
            myChart5.setOption({
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series : [
                {
                  name: '当前能完成率',
                  type: 'pie',
                  radius : '70%',
                  center: ['50%', '50%'],
                  data:[
                    {value:100, name:'已完成'},
                    {value:120, name:'未完成'},
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ],
              color:['#5cc1ae','#3c77b2']
            });
            let myChart6 = echarts.init(document.getElementById('caifen_staus'));
            myChart6.setOption({
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series : [
                {
                  name: '任务完成给分率',
                  type: 'pie',
                  radius : '70%',
                  center: ['50%', '50%'],
                  data:[
                    {value:352, name:'处置给分'},
                    {value:632, name:'未完成'},
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ],
              color:['#5cc1ae','#3c77b2',]
            });
            let myChart7 = echarts.init(document.getElementById('week_address'));
            myChart7.setOption({
              grid:{x:15,y:35,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'任务源排行TOP10',
                  type:'bar',
                  data:[15,13,12,10,9,8,7,6,5,2],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });

            let myChart8 = echarts.init(document.getElementById('haschange_a'));
            myChart8.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '单位',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'单位',
                  type:'bar',
                  data:[15,13,12,10,9,8,7,5,3,1],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart9 = echarts.init(document.getElementById('haschange_b'));
            myChart9.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '人员',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}条"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['张三','张三','张三','张三','张三','张三','张三','张三','张三','张三'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'人员',
                  type:'bar',
                  data:[15,13,12,10,9,8,7,5,3,1],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}条',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart10 = echarts.init(document.getElementById('haschange_c'));
            myChart10.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '单位',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}分"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'单位',
                  type:'bar',
                  data:[200,180,150,120,100,80,60,40,30,20],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}分',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart11 = echarts.init(document.getElementById('haschange_d'));
            myChart11.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '人员',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}分"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['张三','张三','张三','张三','张三','张三','张三','张三','张三','张三'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'人员',
                  type:'bar',
                  data:[200,180,150,120,100,80,60,40,30,20],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}分',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart12 = echarts.init(document.getElementById('haschange_e'));
            myChart12.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '单位',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}分"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'单位',
                  type:'bar',
                  data:[200,180,150,120,100,80,60,40,30,20],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}分',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            let myChart13 = echarts.init(document.getElementById('haschange_f'));
            myChart13.setOption({
              backgroundColor:'#faf9f9',
              title: {text: '人员',textStyle: {fontFamily:'MicrosoftYaHei',fontSize: 18,color: '#3b3b3b'},left:15,top:5,},
              grid:{x:15,y:70,x2:15,y2:35},
              tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{c}分"
              },
              calculable :false,
              xAxis : [
                {
                  type : 'category',
                  data :['张三','张三','张三','张三','张三','张三','张三','张三','张三','张三'],
                  axisTick: {show: false},
                  axisLine: {show: false,color:'red'},
                  axisLabel:{textStyle:{color: '#3b3b3b',fontSize: 14,fontFamily:'MicrosoftYaHei'}},
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  axisLine: {show:false},
                  axisTick: {show: false},
                  axisLabel:{show: false,textStyle:{color: '#50697a',fontSize: 14,fontFamily:'MyriadPro-Regular'}},
                  splitLine:{show: true,lineStyle:{color:'#ececec'}}
                }
              ],
              series : [
                {
                  name:'人员',
                  type:'bar',
                  data:[200,180,150,120,100,80,60,40,30,20],
                  itemStyle: {
                    normal: {
                      barBorderRadius:5,
                      color: function(params) {
                        var colorList = [
                          '#3c77b2','#3c77b2','#3cb2e6','#66cad5','#5cc1ae',
                          '#5bbec2','#76bd65','#9fcf83','#56c4ab','#75c2dd',
                        ];
                        return colorList[params.dataIndex]
                      },
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}分',
                        textStyle:{color: '#000',fontSize: 16,fontFamily:'MicrosoftYaHei'}
                      }
                    }
                  }
                },
              ]
            });
            window.onresize = function(){
               myChart1.resize();
               myChart2.resize();
               myChart3.resize();
               myChart4.resize();
               myChart5.resize();
               myChart6.resize();
//               myChart7.resize();
//               myChart8.resize();
//               myChart9.resize();
//               myChart10.resize();
//               myChart11.resize();
//               myChart12.resize();
            }
          }
      },
      watch:{
          great(a,b){
            console.dir(this.great)
          }
      }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
    .charts_box
     width 100%
     height auto
    .titlestyle
      color #5587d7
      font-weight 600
      font-family 'MicrosoftYaHei-Bold'
      font-size 20px
      line-height 40px
      margin 30px 0 0 0

  #msg_type
    height 350px
    width 100%
    margin 20px 0
  .title_box
    height 44px
    li
      width 50%
      text-indent 20px
  .title_content
    height 380px
    padding-bottom 20px
    border-bottom 2px solid #e6ecf3
    div
      height 100%
      width 49%
      &:nth-child(2)
        margin-left 2%
  .charttype
    height 380px
    width 100%
    padding-bottom 20px
    border-bottom 2px solid #e6ecf3
    margin 10px 0 0 0
</style>

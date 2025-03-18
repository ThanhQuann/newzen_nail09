<!-- eslint-disable vue/html-self-closing -->
<template>
    <section
      class=""
      v-if="block.status"
      :data-cms-bind="dataBinding"
      :style="{backgroundImage: `url(${block.background_image})`}"
    >
<div class="total my__container">
      <div class="head">
         <div style="padding-bottom:20px"  class="heading fs-1 fw-bold fontMontserrat " v-html="block.title"></div>
         <div style="padding-bottom:14px" class="desc fontMontserrat" v-html="block.desc"></div>
         <div style="padding-bottom:34px"  class="desc fontMontserrat" v-html="block.desc2"></div>
      </div>
      <table class="table"> 
        <thead>
          <tr >
            <th class="fontMontserrat f-5 fw-semibold thead" >{{  block.service }}</th>
            <th class="fontMontserrat f-5 fw-semibold thead" style="color:#fff;background:#FCC5C0"> {{ block.regular }}</th>
            <th class="fontMontserrat f-5 fw-semibold thead" >{{ block.member }}</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(item, index) in block.list_item" :key="index" :style="{ backgroundColor: index % 2 !== 0 ? 'hsla(0, 0%, 50.2%, .1019607843)' : '' }">
            <td class="fontMontserrat" >{{ item.title  }}</td>
            <td class="fontMontserrat" >{{ item.price  }}</td>
            <td class="fontMontserrat" >{{ item.member  }}</td>
          </tr>
        </tbody>
      </table>
</div>

   
    </section>
  </template>
  <!-- </div>     
  </div> -->
  <script lang="ts" setup>
  
  interface Props {
    dataBinding: any;
    block: any;
  }
  const props = defineProps<Props>();
  console.log(props)
  </script>
  
<style lang="scss" scoped>
.head{
  text-align: center;
  box-shadow: 0px 0px 15px 0px rgba(188.24999999999997, 188.24999999999997, 188.24999999999997, 0.11);
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    margin: 0px 0px 0px 0px;
    --e-column-margin-right: 0px;
    --e-column-margin-left: 0px;
    padding: 70px 0px 0px 0px;
    background-color: #fff;
}  

td{
  border-style: none;
}
.desc{
  font-size: 18px;
}
.thead{
  background-color:#FCC5C0 !important;
  color:#fff;
}
th,td{
  padding: 20px 15px;
  background-color: transparent !important;
}
.tbody {
  &tr {
    &td{
      background-color: transparent !important;
    }
  }
}
tr:nth-child(odd){
  background-color: hsla(0, 0%, 50.2%, .0705882353) !important;
}
 tr:nth-child(odd):hover {
    background-color: hsla(0, 0%, 50.2%, .1019607843) !important;
}
tr:nth-child(odd):hover{
  background-color: red;
}


</style>
  
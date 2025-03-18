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
      </div>
      <table class="table"> 
        <thead>
          <tr >
            <th class="fontMontserrat fw-normal thead" >{{block.service  }}</th>
            <th class="fontMontserrat fw-normal thead"  >{{block.regular  }}</th>
            <th class="fontMontserrat fw-normal thead"  >{{ block.member }}</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(item, index) in block.list_item" :key="index" :style="{ backgroundColor: index % 2 !== 0 ? 'hsla(0, 0%, 50.2%, .0705882353)' : '' }">
            <td class="fontMontserrat f-14" >{{ item.title }}</td>
            <td class="fontMontserrat f-14" >{{ item.price }}</td>
            <td class="fontMontserrat f-14" >{{ item.member }}</td>
          </tr>
        </tbody>
      </table>
</div>

<!-- <div class="total my__container">
      <div class="head">
         <h2 style="padding-bottom:20px"  class="heading fs-1 fw-bold fontMontserrat " v-html="block.title_body"></h2>
      </div>
      <table class="table"> 
        <thead>
          <tr >
            <th class="fontMontserrat fw-normal thead"  v-html="block.service_body"></th>
            <th class="fontMontserrat fw-normal thead"  v-html="block.regular_body"></th>
            <th class="fontMontserrat fw-normal thead"  v-html="block.member_body"></th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(item, index) in block.list_item_body" :key="index" :style="{ backgroundColor: index % 2 !== 0 ? 'hsla(0, 0%, 50.2%, .0705882353)' : '' }">
            <td class="fontMontserrat f-14" v-html="item.title"></td>
            <td class="fontMontserrat f-14" v-html="item.price"></td>
            <td class="fontMontserrat f-14" v-html="item.member"></td>
          </tr>
        </tbody>
      </table>
</div>

<div class="total my__container">
      <div class="head">
         <h2 style="padding-bottom:20px"  class="heading fs-1 fw-bold fontMontserrat " v-html="block.title_waxing_men"></h2>
      </div>
      <table class="table"> 
        <thead>
          <tr >
            <th class="fontMontserrat fw-normal thead"  v-html="block.service_waxing_men"></th>
            <th class="fontMontserrat fw-normal thead"  v-html="block.regular_waxing_men"></th>
            <th class="fontMontserrat fw-normal thead"  v-html="block.member_waxing_men"></th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(item, index) in block.list_item_waxing_men" :key="index" :style="{ backgroundColor: index % 2 !== 0 ? 'hsla(0, 0%, 50.2%, .0705882353)' : '' }">
            <td class="fontMontserrat f-14" v-html="item.title"></td>
            <td class="fontMontserrat f-14" v-html="item.price"></td>
            <td class="fontMontserrat f-14" v-html="item.member"></td>
          </tr>
        </tbody>
      </table>
</div>
    -->
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


.desc{
  font-size: 18px;
}
.f-14{
    font-size: 14px;
    font-weight: 300;
    color:#333;
}
.thead{
    font-size: 14px;
    color:#333;
}
th,td{
  padding: 20px 15px;
  background-color: transparent !important;
  border: 1px solid hsla(0, 0%, 50.2%, .5019607843);
}  

th:first-child, td:first-child {
    border: 1px solid hsla(0, 0%, 50.2%, .5019607843);
}

.tbody {
  &tr {
    &td{
      background-color: transparent !important;
    }
  }
}
th{
    background-color: hsla(0, 0%, 50.2%, .0705882353) !important;
}
th:hover{
    background-color: hsla(0, 0%, 50.2%, .1019607843) !important;

}
 tr:nth-child(odd):hover {
    background-color: hsla(0, 0%, 50.2%, .1019607843) !important;
}



</style>
  
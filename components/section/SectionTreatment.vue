<!-- eslint-disable vue/html-self-closing -->
<template>
  <section class="bg-img py-5" v-if="block.status" :data-cms-bind="dataBinding"  >
    <div
      class="section_hero container-xl "  
    >
      <div class="row my__container" style="padding-left: 10px;">
            <div class="col-12 col-sm-4 col-lg-4 col-4 " v-for="item,index in block.list_treatment" :key="index">

                    <div class="service_item" :class="{item: index === 1 || hoverIndex === index }" @mouseover = "hoverIndex = index" @mouseleave="hoverIndex = -1">
                    <div class="d-flex flex-column mb-3 pd">
                      <div  class="text-center d-flex flex-column justify-content-center align-items-center pt-3">
                            <img class="img-cus" :src="item.image" alt="service">
                            <h3 class="fs-4 p-3">{{ item.title.toUpperCase() }}</h3>
                            <p class="p-2">{{ item.desc }}</p>
                    </div>
                </div>
          </div>
  
            </div>
        </div>
      </div>
     
    

  </section>
</template>

<script lang="ts" setup>

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
  import { ref } from "vue";

const hoverIndex = ref(-1);


</script>


<style lang="scss" scoped>
.item{
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  box-shadow: 0px 0px 25px 0px rgba(245, 243, 243, 0.62);
  border-radius: 30px 30px 30px 30px;

}
.row > * {
    padding-left: 10px;
    padding-right: 10px;
}
.pd{
  padding: 40px 20px 40px 20px;
}
.img-cus{
  height: 120px;
  object-fit: contain;
}
.section_hero{
  padding: 80px 0 80px 0;
}
@media (max-width: 1024px){
  .section_hero{
    padding: 0 ;
  }
  .bg-img{
    padding-bottom: 0 !important;
  }
 
}
@media (max-width:768px){
  .section_hero{
    padding: 0;
  }
  .bg-img{
    padding-bottom: 0 !important;
  }
}
@media (max-width:576px){
  .section_hero{
    padding: 0;
  }
  .p-2{
    padding: 0 !important;
  }
 
}
</style>
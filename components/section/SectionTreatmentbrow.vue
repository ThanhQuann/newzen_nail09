<!-- eslint-disable vue/html-self-closing -->
<template>
    <section class="bg-img" v-if="block.status" :data-cms-bind="dataBinding" style="padding-top:15px" >
      <div
        class="section_hero container-xl"  
      >
        <div class="row my__container position-relative" style="padding-left: 10px;">
              <div class="col-12 col-sm-4 col-lg-4 col-4 text-center z-2 col-md-4 " v-for="item,index in block.list_item" :key="index">
  
                      <div class="service_item" :class="{'hovered': hoverIndex === index}" @mouseover = "hoverIndex = index" @mouseleave="hoverIndex = -1">
                      <div class="d-flex flex-column mb-3 pd  ">
                        <div lass="text-center d-flex flex-column justify-content-center align-items-center pt-3 ">
                              <img class="img-cus" :src="item.image" :alt="block.image_alt">
                              <h3 class="fz-22 fontMontserrat p-3">{{ item.title.toUpperCase() }}</h3>
                              <div class="p-2">{{ item.desc }}</div>
                      </div>
                  </div>
            </div>
        
              </div>
            <img class="cus-dot" v-if="block.image_dot1" :src="block.image_dot1"  :alt="block.image_alt"/>
            <img class="cus-dot cus-dot-two" v-if="block.image_dot2" :src="block.image_dot2" :alt="block.image_alt"/>
              
       
          </div>
        </div>
       
      
  
    </section>
  </template>
  
  <script lang="ts" setup>
    import { ref } from "vue";

const hoverIndex = ref(-1);

  interface Props {
    dataBinding: any;
    block: any;
  }
 defineProps<Props>();
  </script>
  
  
  <style lang="scss" scoped>
.item{
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    box-shadow: 0px 0px 25px 0px rgba(245, 243, 243, 0.62);
    border-radius: 30px 30px 30px 30px;

}

.cus-dot{
  position: absolute;
  width: 175px ; /* Đảm bảo đúng kích thước */
  height: 138px !important;
  height: auto;
  display: block;
  top: -12%;
  right: -5%;
   
}
.cus-dot-two{
    right: 20%;
}
.row > * {
   padding: 10px;
}
.fz-22{
    font-size: 22px;
}
.pd{
    padding: 40px 20px 40px 20px;
 
}
.service_item{
    border: 2px solid #fff;
    border-radius: 30px 30px 30px 30px;
    border-width: 5px 5px 5px 5px;
    background-color: #fff;
}
.img-cus{
    height: 200px;
    object-fit: cover;
    object-position: center center;
    transition-duration: 0.3s;
    border-style: none;
    border-radius: 50% 50% 50% 50%;
    box-shadow: 0px 0px 10px 0px #000000;
}
.service_item.hovered{
    border:solid #FCC5C0;
    box-shadow: 4px 4px 16px 0px rgba(245, 243, 243, 0.62);
    border-width: 5px 5px 5px 5px;
}
@media (max-width: 1024px){
  .img-cus{
    width: 246px;
    height: 100px;
  }
}

@media (max-width: 768px){
  .img-cus{
    width: 166px;
    height: 100px;
  }
}
@media (max-width: 568px){
  .cus-dot{
    display: none;
  }
  .img-cus{
    width: 100px;
  }
}


  </style>
<template>
    <section 
        v-if="block.status" 
        :data-cms-bind="dataBinding" 
        style="margin-top: 6em;margin-bottom:6em"
    >
      <div class="my__container text-center">
          <div class="" style="padding:10px">
           <div>
              <div class="title mb-20" v-html="block.title" :style="{color: block.color}" style="font-size:20px"></div>
              <h2 style="line-height: 60px;" class="heading fs-1 fw-bold fontMontserrat mb-20"v-html="block.heading"></h2>
              <p class="desc mb-20" v-html="block.desc"></p>
           </div>
            <div class="text-center content">
              <div class="" v-for="item, index in block.list_item" :key="index">
              <NuxtLink class="text-center text-reset cus-hover" v-if="item.link" :to="item.link"
                :target="item?.open_new_tab ? '_blank' : ''">
                <img  class="" :src="item.image" :alt="item.label" >
                {{ item.label }}
              </NuxtLink>
              </div>
            </div>
      <!-- <div class="col-6" >
      <div style="padding-left:12px">
           <div class="row pb-18 " >
                <div class="col-6 pl-16" >
                  <label class="pd-9" for="form-field-name " >Name</label>
                  <input type="text" class="form-control" id="form-field-name" >
                </div>
                <div class="col-6 pl-16">
                  <label class="pd-9  required-asterisk" for="form-field-email required ">Email</label>
                  <input type="text" class="form-control" id="form-field-email">
                </div>
           </div>
           <div class="row pb-18">
                <div class="col-6 pl-16">
                        <label class="pd-9" for="form-field-phone ">Phone</label>
                        <input type="tel" pattern="[0-9()#&+*-=.]+" class="form-control" id="form-field-phone" title="Only numbers and phone characters (#, -, *, etc) are accepted.">
                </div>
                <div class="col-6 pl-16">
                        <label class="pd-9 required-asterisk" for="form-field-subject required ">Subject</label>
                        <input type="text" class="form-control" id="form-field-subject">
                </div>
           </div>
           <div class="row pb-18 pl-16">
                <div class="col-12" style="padding-bottom:18px">
                        <label class="pd-9 required-asterisk" for="form-field-message required ">Message</label>
                        <textarea style="min-height:200px" type="text" class="form-control" id="form-field-message" ></textarea>
                </div>
           </div>
      </div>
              <NuxtLink style="margin-left:12px" class="btn-book" >
                {{ block.button.text }}
                <img  :src="block.button.img" />
              </NuxtLink>
          </div> -->

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
  console.log(props.block)
  </script>
  
  <style lang="scss" scoped>
input,textarea{
  border-radius:none;
  border-radius: 0 !important;
  min-height: 47px;
}
img{
  width: 26px;
  height: 21px;
  object-fit: contain;
}
.required-asterisk::after{
   content: "*";
    color: red;
    padding-inline-start: .2em;
}
.pd-9{
   padding-bottom:  9px; 
}
.pb-18{
  padding-bottom: 18px;
}
.pd-10{
  padding-right: 10px;
  padding-left: 10px;
}
.pl-16{
  padding: 2px 12px
}
.btn-book{
  padding: 15px 30px;
  display: inline-flex;
  gap: 8px;
  line-height: 16px;
}
.mb-20{
  margin-bottom: 20px !important;
}
.pr-18{
 padding-right: 18px;
 margin-top: calc(15px / 2);
 padding-bottom: calc(15px / 2);
}
.text-item {
  display: flex;
  justify-content: center;
}

.text-reset {
  display: flex;
  align-items: center;
  gap: 8px; /* Tạo khoảng cách giữa icon và text */
  text-decoration: none;
}
.form-control:focus {
  border-color:#F8F8F8;
  outline: none;
  box-shadow: 0 0 0 2px #fcc5c0;
} 
.content{
  max-width: 70%;
  margin: 0 auto;
}
@media (max-width: 768px) {

}
  </style>
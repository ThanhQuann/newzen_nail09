<!-- eslint-disable vue/html-self-closing -->
<template>
  <footer >
    <!-- Footer -->
     
    <div :style="{backgroundColor: footerData.background}" class="text-center text-lg-start text-muted">
       <!-- Section: Links  -->
      <section class="animation_up">
          <!-- Form -->
          <div :style="{backgroundColor: footerData.background}"style="margin-bottom: -70px;" class="my__container position-relative form text-center">
           <div class="Experience d-flex flex-column justify-content-center align-items-center">
              <h2 class="fs-1 fw-bold p-2" v-html="footerData.title"></h2>
              <div class="fz18 p-3" v-html="footerData.para"></div>
              <NuxtLink 
                v-if="footerData.button.is_show" 
                :to="footerData.button.link" :target="footerData.button.open_new_tab? '_blank' : '' "
                :style="{backgroundColor: footerData.button.background_color,color: footerData.button.color}"
                class="text-decoration-underline btn-book fz18 p-3"
              > 
                {{ footerData.button.text }}
              </NuxtLink>    
           </div>         
        </div>
      </section>
      <!-- Section: Links  -->
      <div class="text-start pd":style="{backgroundColor: footerData.background_copyright}">
        <div class="my__container">
          <!-- Grid row -->
          <div class="row" style="padding-top:144px;padding-bottom:32px;padding-left:10px">
          <!-- Group 1 -->
          <div class="col-12 col-sm-6 col-lg-6  col-6">
            <div class="row">
              <!-- Logo Column (7) -->
              <div class="col-12 col-sm-7 col-lg-7 col-7 col">
                <div class="mb-4">
                  <img class="" style="min-width: 120px; max-height: 120px;" :src="footerData.logo" :alt="footerData.logo_alt">
                </div>
                <div class="mb-4 ckeditor-custom desc-mb" style="width:332px" v-html="footerData.description"></div>
              </div>
              <!-- Business Column (5) -->
              <div class="col-12 col-sm-5 col-lg-5 col-5 col">
                <h6 :style="{color: footerData.color_header}" class="fw-semibold mb-4 fz18 label-mb">
                  {{ footerData.bussiness.label }}
                </h6>
                <div class="mb-2" v-for="item, index in footerData.bussiness.list_bussiness" :key="index">
                  <NuxtLink class="text-reset" v-if="item.link" :to="item.link"
                    :target="item?.open_new_tab ? '_blank' : ''">
                    {{ item.label }}
                  </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Group 2 -->
  <div class="col-12 col-md-6 col-lg-6 col-6">
    <div class="row">
      <!-- Company Column (5) -->
      <div class="col-12 col-md-4 col-lg-5 col-5 col">
        <h6 :style="{color: footerData.color_header}" class="fw-semibold mb-4 fz18">
          {{ footerData.company.label }}
        </h6>
        <div class="mb-2" v-for="item, index in footerData.company.list_company" :key="index">
          <NuxtLink class="text-reset cus-hover" v-if="item.link" :to="item.link"
            :target="item?.open_new_tab ? '_blank' : ''">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
      <!-- Info Column (7) -->
      <div class="col-12 col-sm-8 col-lg-7 col-7 col">
        <h6  :style="{color: footerData.color_header}" class="fw-semibold mb-4 fz18">
          {{footerData.info.label }}
        </h6>
        <div   style="max-width:285px" class="mb-2 desc-info_mb" v-for="item, index in footerData.info.list_info" :key="index">
          <NuxtLink class="text-reset cus-hover" v-if="item.link" :to="item.link"
            :target="item?.open_new_tab ? '_blank' : ''" >
            <img class="me-1" style="height: 14px" :src="item.image" :alt="item.label">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</div>

          <div  class="my__container footer-end d-flex justify-content-between" style="padding:10px 0 20px 0">
            <div class="copyright fw-light" v-html="footerData.text_bottom_footer" ></div>
            <div @click="scrollToTop" class="back-to-top justify-content-end " v-html="footerData.back_top_botom_footer"></div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
   
      <!-- Copyright -->
     
    </div>
  
    <!-- Footer -->
  </footer>
</template>

<script setup lang="ts">
import footer from "@/data/footer.json";
import langSetting from "@/data/lang-setting.json";

const route = useRoute();
let langDefault: any = langSetting.find((lang: any) => lang.isDefault === true);
let footerData: any = ref(footer.en);

const handleRenderAttribute = computed(() => {
  return {
    itemprop: 'address',
    itemscope: true,
    itemtype: 'http://schema.org/PostalAddress'
  };
});

watch(
  () => route.path,
  () => {
    for (const key of Object.keys(footer)) {
      if (route.path.includes(key)) {
        footerData.value = (footer as any)[key];
        break;
      } else {
        footerData.value = (footer as any)[langDefault.value];
      }
    }
  },
  { immediate: true }
);

const isShowButtonToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      isShowButtonToTop.value = true;
    } else {
      isShowButtonToTop.value = false;
    }
  });
});

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } 
    });
  }, { threshold: 0, rootMargin: '0px 0px 300px 0px' });

  const items = document.querySelectorAll('.animation_up, .animation_in');

  items.forEach(item => {
    observer.observe(item);
  });
});

</script>

<style lang="scss" scoped>


.form{
  padding:70px 0px 70px 0px;
  box-shadow: 0px 0px 15px 0px rgba(188.24999999999997, 188.24999999999997, 188.24999999999997, 0.11);
  border-radius: 15px 15px 15px 15px;
}


.col{
  padding: 10px;
}

.btn-book{
  width: 175px;
  height: 58px;
  display: block;
}
.back-to-top{

  &:hover{
    cursor: pointer !important;
  }
}
.cus-hover{
  &:hover{
    color:#fcc5c0 !important;
    
  }
}
@media (max-width:1024px){
 .desc-mb{
  width:292px !important;
 }
 .footer-end{
  padding-left: 10px !important;
 }
 .back-to-top{
  padding-right: 10px !important;
 }
 .desc-info_mb{
  width: 230px !important;
 }
}
@media (max-width: 1024px){
  .form{
    margin-top: 60px;
    margin-left: 15px;
    margin-right: 15px;
  }
}

@media (max-width: 768px){
 .sc-ip{
  max-width: 237px;
 }

 .footer-end{
  padding-left: 10px !important;
 }
 .back-to-top{
  padding-right: 10px !important;
 }
 .desc-mb{
  width: 217px !important; 
 }
}
@media (max-width: 568px){
  .sc-ip{
    max-width: 100%;
  }
  .mb-2{
    margin-bottom: 14px !important;
  }
  .label-mb{
    margin-top: 20px;
  }
  .back-to-top{
    position: absolute;
    right: 0;
    padding-right: 10px !important;
    padding-top: 30px;   
     padding-right: 10px;
  }
  .copyright{
    line-height: 16px;
  }
  .form{
    padding: 60px 15px 60px 15px;
    margin: 0 15px 0 15px ;
  }
  .desc-mb{
    width: 370px !important;
  }


}
</style>

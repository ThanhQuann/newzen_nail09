<!-- eslint-disable vue/html-self-closing -->
<template>
  <header class="position-relative w-100">
    <div class="position-absolute header" style="height: 100px">
      <nav
        class="row align-items-center justify-content-between mx-auto container-xl h-100"
      >
        <div class="col-lg-3 d-lg-block d-none">
          <!-- Logo Desktop -->
          <NuxtLink :to="`${homeUrl}`" class="d-block">
            <img
              :src="headerData.logo"
              :alt="headerData.alt_image"
              class=" "
              style="max-height: 70px"
            />
          </NuxtLink>
        </div>
        <div
          class="col-lg-8 col-12 px-0 d-flex justify-content-lg-end justify-content-between align-items-center h-100"
        >
          <NuxtLink
            :to="`${homeUrl}`"
            class="d-lg-none d-block col-6"
            style="max-width: 140px"
          >
            <img
              :src="headerData.logo"
              :alt="headerData.alt_image"
              class="w-100 h-100 object-fit-contain"
              style="max-width: 260px"
            />
          </NuxtLink>

          <!-- Button menu mobile -->
          <div
            style="color: rgb(252, 197, 192)"
            class="d-lg-block d-xxl-none d-block button-menu"
            @click="handleMenu()"
          >
             <i
              v-if="!isOpen"
              class="bi bi-list text-black"
              style="
                font-size: 30px;
                cursor: pointer;
                color: rgb(252, 197, 192) !important;
                margin-right:10px;
              "
            ></i> 
            <img v-if="isOpen" class="img-close" style="width: 30px;height:30px;margin-right:10px" :src="headerData.logo_close" alt="">
          </div>
          <div v-show="checkMobile" :class="['nav-mobile', { active: isOpen }]">
      <div class="nav-mobile-left flex-1">
        <nav>
      <ul class="d-flex flex-column justify-content-center list-unstyled pt-4 u" >
        <li v-for="(header, index) in headerData.items" 
            :key="index" 
            class="menu-mobile-item position-relative "
            @click="toggleSubMenu(index)"
            :class="{ active: isActiveMenuItem(header.link) }"

            
            >
          <NuxtLink
            class="text-black d-block font__size__base text-decoration-none h-100"
            style="line-height: 40px;padding-left:20px;"
            :title="header.text"
            :target="header?.open_new_tab ? '_blank' : ''"
            :to="header.link"
          >
            {{ header.text }}
            <img
                  :class="{ active: isActiveMenuItem(header.link) }"
                  style="padding-left: 10px"
                  v-if="header?.item_child && header.item_child.length > 0"
                  src="/images/caret-down-solid.png"
                  alt="Dropdown"
                  class="nav-icon"
                />
          </NuxtLink>

          <!-- Submenu Mobile -->
          <div v-if="openSubmenus[index]" class="submenu-mobile">
            <ul>
              <li v-for="(child, index) in header.item_child" :key="index">
                <NuxtLink
                  :to="child.link"
                  :title="child.text"
                  :target="child?.open_new_tab ? '_blank' : ''"
                  class="submenu-mobile-item "
                >
                  {{ child.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
      </div>
      <div class="background-nav-mobile" @click="handleMenu()"></div>
         </div>
          <!-- Nav Desktop -->
          <ul
            class="d-xl-flex d-none flex-wrap align-items-center justify-content-center list-unstyled h-100 mb-0"
          >
            <li
              v-for="(header, index) in headerData.items"
              :key="index"
              class="custom_menu font__size__base px-2 pl position-relative"
              :class="{
                active: isActiveMenuItem(header.link),
              }"
            >
              <NuxtLink
                :to="header.link"
                :title="header.text"
                :target="header?.open_new_tab ? '_blank' : ''"
                class="h-100 text-decoration-none d-block fw-medium"
              >
                {{ header.text }}
                <img
                  :class="{ active: isActiveMenuItem(header.link) }"
                  style="padding-left: 10px"
                  v-if="header?.item_child && header.item_child.length > 0"
                  src="/images/caret-down-solid.png"
                  alt="Dropdown"
                  class="nav-icon"
                />
                <div
                  class="submenu"
                  v-if="header?.item_child && header.item_child.length > 0"
                >
                  <ul>
                    <li
                      v-for="(child, index) in header.item_child"
                      :key="index"
                    >
                      <NuxtLink
                        :to="child.link"
                        :title="child.text"
                        :target="child?.open_new_tab ? '_blank' : ''"
                        class="item-child"
                      >
                        {{ child.text }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink
            :to="headerData.button.link"
            :target="headerData.button.open_new_tab ? '_blank' : ''"
            class="btn-book hidden-nav"
            ><span class="book">{{ headerData.button.text }}</span></NuxtLink
          >
          <!-- Logo Mobile -->

          <!-- Search desktop -->
          <!-- <div v-if="headerData.search.is_show" class="d-lg-none d-block position-relative">
              <i @click="isSearchMobile = !isSearchMobile" class="bi bi-search " style="cursor: pointer;"></i>
            </div> -->
        </div>
      </nav>
    </div>
 
  </header>
</template>

<script setup lang="ts">
import header from '@/data/header.json'
import LANGUAGES from '@/data/lang-setting.json'

const isOpen = ref(false)
const route = useRoute()
const router = useRouter()
const checkMobile = ref(false)
const blogStore = useCounterStore()
const search = ref(blogStore.title)

const countries = LANGUAGES.map((lang: any) => {
  return {
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault,
  }
})
const langDefault: any = countries.find((lang: any) => lang.enable)

const updateCountry = (newValue: string) => {
  country.value = newValue
}
const langCurrent = ref(langDefault.value)

const homeUrl = ref('/')
const headerData: any = ref(header.en)
console.log(headerData.value)

function renderHeader() {
  for (const key of Object.keys(header)) {
    if (country.value.includes(key)) {
      langCurrent.value = key
      headerData.value = (header as any)[key]
      break
    } else {
      headerData.value = (header as any)[langDefault.value]
    }
  }
}

for (const key of Object.keys(header)) {
  if (route.path.includes(key) || route.path.includes(`${key}/`)) {
    langCurrent.value = key
    headerData.value = (header as any)[key]
    break
  } else {
    headerData.value = (header as any)[langDefault.value]
  }
}

const country = ref(langCurrent.value)

const isSearchMobile = ref(false)

const handleSubmit = () => {
  if (search.value === '') {
    return
  }

  if (isSearchMobile) {
    isSearchMobile.value = false
  }

  blogStore.searchActions(search.value)
  navigateTo({
    path: `${blogStore.lang}blog`,
    query: { search: search.value },
  })
}

watch(
  () => [country, langCurrent],
  () => {
    renderHeader()
    const params = route.query

    if (country.value) {
      if (country.value === langDefault.value) {
        router.push({ path: '/', query: params })
        homeUrl.value = '/'
      } else {
        router.push({ path: `/${country.value}`, query: params })
        homeUrl.value = `/${country.value}`
      }
    } else {
      homeUrl.value = '/'
      router.push({ path: '/' })
    }
  },
  { deep: true }
)

watch(
  () => [country, langCurrent],
  () => {
    renderHeader()
    if (country.value) {
      if (country.value === langDefault.value) {
        blogStore.setLang(`/`)
      } else {
        blogStore.setLang(`/${country.value}/`)
      }
    }
  },
  { deep: true, immediate: true }
)

const isActiveMenuItem = (link: any) => {
  return route.path === link
}
const handleMenu = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    Object.keys(openSubmenus).forEach((key) => {
      openSubmenus[Number(key)] = false;
    });
  }
}

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
    Object.keys(openSubmenus).forEach((key) => {
      openSubmenus[Number(key)] = false;
    });
  }
);
const checkScreenSize = () => {
  checkMobile.value = window.innerWidth <= 1024
}
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

const openSubmenus = reactive<{ [key: number]: boolean }>({})

const toggleSubMenu = (index: number) => {
  openSubmenus[index] = !openSubmenus[index] || false
}

</script>

<style lang="scss" scoped>
.nav-icon {
  transition: filter 0.3s ease-in-out;
}

.nav-icon.active {
  filter: brightness(0) invert(1); // Chuyển thành màu trắng
}
.nav-icon {
  filter: grayscale(100%) brightness(0) invert(40%);
  transition: filter 0.3s ease;
}

.custom_menu.active .nav-icon {
  filter: invert(72%) sepia(47%) saturate(675%) hue-rotate(315deg);
}
.custom_menu {
  display: grid;
  place-content: center;
  position: relative;
  margin-top: 11px;
  padding-bottom: 11px;
  & a {
    transition: 0.25s;
    color: #54595f;
  }
  &::after{
    content: '';
    position: absolute;
    top: 25px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #ff9f97;
    transition: width 0.3s ease-in-out;
   
  }
    &:hover::after,
    &.active::after {
      width: 100%;
    }
  
}

.custom_menu.active {
  & > a {
    color: #ff9f97;
  }
   
}
.submenu-mobile-item{
  text-transform: uppercase;
  color:#33373d;

}

.pl {
  padding-right: 50px;
}
.btn-book {
  background-color: #fcc5c0;
  border: none;
  border-radius: 40px 40px 40px 40px;
  width: 126px;
  height: 39px;
  margin-left: 40px;
  display: flex; /* Kích hoạt flexbox */
  align-items: center; /* Căn giữa theo chiều dọc */
  justify-content: center; /* Căn giữa theo chiều ngang */
  text-decoration: none; /* Xóa gạch chân mặc định */
}
.book {
  color: #fff;
}
.width {
  width: 1140px;
}
.menu-mobile-item.active > a {
  background-color: #FCC5C0 !important; /* Màu giống desktop */
  width: 100%;
  font-weight: 500;
  color:#fff !important;
}
.active_mobile {
  & a {
    color: #54595f !important;
  }
}
.px-2 {
  padding-right: 1.5rem !important;
  padding-left: 0.5rem !important;
}
.font__size__base {
  font-size: 14px !important; /* !important để đảm bảo ưu tiên cao nhất */
  text-transform: uppercase;
  line-height: 1.2em;
  letter-spacing: 0.5px;
}
.icon_menu {
  cursor: pointer;
}

.nav {
  position: relative;
}
.nav::after {
  content: '▼';
  display: inline-block;
  position: absolute;
  width: 3px;
  height: 3px;
}
.submenu {
  margin-left: -10px;
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  // border: 1px solid #ddd; /* Thêm border để dễ thấy */
  z-index: 1000;
}
ul {
  padding-left: 0;
}
.submenu ul {
  list-style: none;
  margin: 0;
}
.submenu li {
  padding: 9px 12px;
  white-space: nowrap;
  background-color: #fff;
  color: var(--color-text2);
  background: transparent; /* Đảm bảo nền mặc định */
  transition: background 0.3s;
}
.submenu-mobile{
  // display: none;
  padding-left: 30px;
}
.submenu-mobile ul {
  list-style: none;
}
.submenu-mobile li {
  padding-top: 15px;
}
.submenu li:hover {
  background: #fcc5c0;
  color: #fff;
}
.custom_menu:hover .submenu {
  display: block;
}
.submenu li a {
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 15px; /* Đảm bảo phần link cũng có padding */
  color: inherit;
}

@media only screen and (max-width: 1024px) {
  .form-search {
    width: 100% !important;
    opacity: 100 !important;
    position: relative !important;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border: none;
    border-bottom: 1px solid var(--color-primary);
    transition: border-color 400ms ease-in-out, width 200ms ease-in-out,
      opacity 400ms ease-in-out;
  }
  .form-search:focus {
    cursor: text;
    left: 0 !important;
    top: 0 !important;
    transform: translateX(0) translateY(0) !important;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 99999 !important;
    position: absolute; /* Không dùng fixed nhưng vẫn nằm trên cùng */
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    background: transparent; /* Xóa nền mờ */
    overflow: hidden;
    transition: height 0.5s ease-in-out;
    pointer-events: none;
    &.active {
    opacity: 1;
    pointer-events: auto; /* Khi menu mở, cho phép click */
  }
}

/* Khi menu mở */
.nav-mobile.active {
  height: 100vh;
}

/* Nội dung menu */
.nav-mobile-left {
  width: 100%;
  background: #fff;
  transition: transform 0.5s ease-in-out;
  transform: translateY(-100%);
  margin-top: 90px; /* Giữ khoảng cách với top */

}
.button-menu {
  // position: absolute;
  z-index: 100000; /* Cao hơn cả .nav-mobile */
}
/* Khi menu mở -> trượt xuống */
.nav-mobile.active .nav-mobile-left {
  transform: translateY(0);
}

// .background-nav-mobile {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   cursor: pointer;
//   background: rgba(0, 0, 0, 0.5);
//   pointer-events: none;
//   z-index: 9998; /* Đảm bảo nhỏ hơn nav-mobile-left */
// }


}
@media (max-width: 1024px) {
}
@media only screen and (max-width: 1024px) {
  .hidden-nav {
    display: none !important;
  }
}
@media only screen and (max-width: 768px) {
  // .nav-mobile {
  //   .nav-mobile-left {
  //     width: 75%;
  //   }
  // }

  .hidden-nav {
    display: none !important;
  }
}
@media (max-width: 568px) {
}

.header {
  z-index: 20;
  left: 0;
  width: 100%;
}
.container-xl {
  max-width: 1140px;
}
</style>

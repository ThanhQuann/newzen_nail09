import LANGUAGES from "@/data/lang-setting.json";

export default defineNuxtPlugin( async (nuxtApp) => {
  const router = useRouter();

  const route = useRoute();

  const blogStore = useCounterStore()

  let listCategory: any[] = [];
  
  let listTag: any[] = [];

  let language

  const countries = LANGUAGES.map((lang: any) => ({
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault,
  }));

  const getData = async (lang:string) =>{
    const { data : blog } = await useAsyncData(`blog-${lang}`, () => 
      queryContent(`${lang}blog`).where({ _path: { $ne: `${lang}blog` }, publish : {$ne : false} })
      .only(['title', 'thumbImg', 'date_published', 'date', '_path','tags', 'desc', 'category'])
      .sort({ createdAt: -1, date: -1 })
      .find())
    blogStore.setPost(blog.value)
    return blog.value
  }
  const routeName = route.name.split('-');

  if (countries.some((item: any) => item.value === routeName[0])){
    await getData(`/${routeName[0]}/`);
    language =`/${routeName[0]}/`
  }
  else if (
    route.params.slug &&
    countries.some((item: any) => item.value === route.params.slug[0])
  ) {
    await getData(`/${route.params.slug[0]}/`);
    language =`/${route.params.slug[0]}/`
  } else {
    await getData('/');
    language = '/'
  }

  let posts = blogStore.posts;

  blogStore.blockActions(posts);

  function convertToCapitalized(str:string) {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const generateData = (data,list,key) =>{
    data.map((post:any) => {
      if(key in post && Array.isArray(post[key]) && post[key].length > 0) {
        post[key].forEach(category => {
          if (typeof category?.text === 'string') {
            let existCategory = list.find(elm =>         
              elm.text.toLowerCase().trimEnd() === category?.text.toLowerCase().trimEnd() || 
              elm._path.toLowerCase().trimEnd() === category?.text.toLowerCase().trimEnd()
            )
            if (!existCategory) {
              list.push({
                text: convertToCapitalized(category?.text),
                name:`${category?.text.toLowerCase().trimEnd().replace(/\s+/g, '-')}`,
                open_new_tab: category?.open_new_tab,
                _path: `/${category?.text.toLowerCase().trimEnd().replace(/\s+/g, '-')}`,
              });
            }
          }   
        })
      }
    })
  }
  generateData(posts,listCategory,'category')

  generateData(posts,listTag,'tags')

  blogStore.categoryAction(listCategory);
  blogStore.tagAction(listTag);

  const addRoutes = (list, basePath) => {
    if (list.length < 0) return

    list.forEach(route => {
      router.addRoute(basePath,{
        name: route.name,
        path: `${route._path}`,
        component: [],
      });
    });
  };

  addRoutes(listCategory, `${language}blog/category`);
  addRoutes(listTag, `${language}blog/tags`);

  watch(
    () => blogStore.lang,
    async (lang) => {
      listCategory = [];
      listTag = [];
      const res = await getData(lang)
      posts = blogStore.posts;
      blogStore.blockActions(posts);
      generateData(posts,listCategory,'category')

      generateData(posts,listTag,'tags')

      blogStore.categoryAction(listCategory);
      blogStore.tagAction(listTag);

      addRoutes(listCategory, `${lang}blog/category`);
      addRoutes(listTag, `${lang}blog/tags`);
    }
  );

});
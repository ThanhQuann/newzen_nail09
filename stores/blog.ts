import { defineStore } from 'pinia'

export const useCounterStore = defineStore('search', {
  state: () => {
    return { 
      title: '', 
      block:null, 
      blockRecent:null,
      category: null ,
      tags:null,
      posts: [] as any[],
      pagination:{
        total: 1,
      },
      lang: '/'
    }
  },
  actions: {
    // async fetchPosts() {
    //   if (this.posts.length === 0) {
    //     const { data : blog } = await useAsyncData('blog', () => 
    //       queryContent('blog').where({ _path: { $ne: '/blog' }, publish : {$ne : false} })
    //       .only(['title', 'thumbImg', 'date_published', 'date', '_path','tags', 'desc', 'category'])
    //       .sort({ createdAt: -1, date: -1 })
    //       .find())
    //     this.posts = blog.value;
    //   }
    // },
    searchActions(value:string) {
      this.title = value
    },
    blockActions(value:any){
      this.block = value
    },
    blockRecentAction(value:any){
      this.blockRecent = value
    },
    totalPaginationAction(lengthPosts:any,itemsPerPage:number){
      this.pagination.total = Math.ceil((lengthPosts / itemsPerPage))
    },
    categoryAction(value:any){
      this.category = value
    },
    tagAction(value:any){
      this.tags = value
    },
    setLang(value:any){
      this.lang = value
    },
    setPost(value:any){
      this.posts = value;
    }
  },
})
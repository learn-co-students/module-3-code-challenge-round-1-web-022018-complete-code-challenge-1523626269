class Image {
    constructor(comments,id,like_count,name,url){
      this.comments=[]
      this.id=id
      this.like_count=like_count
      this.name=name
      this.url=url
      for (let i=0;i<comments.length;i++){
        this.comments.push(new Comment(comments[i].content,comments[i].id,comments[i].image_id))
      }
    }

}

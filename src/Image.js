class Image {
  constructor(id,url,name,like_count,comments){
    this.id=id;
    this.url=url;
    this.name=name;
    this.like_count=like_count
    this.comments=comments
    ImageAll.push(this)
  }

}//image

const ImageAll = []

// GET 'https://randopic.herokuapp.com/images/:image_id'
//
// Example Response:
// {
//   "id": 1,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2017/06/IMAG2936-352x200.jpg",
//   "name": "Science Fair",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 1,
//       "content": "first comment!",
//       "created_at": "2017-09-27T18:18:05.623Z",
//       "updated_at": "2017-09-27T18:18:05.623Z"
//     }
//   ]
// }

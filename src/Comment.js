class Comment {
  constructor(comment) {
  this.comment = comment;
  this.id = comment.id;

  Comment.all.push(this);
}
}

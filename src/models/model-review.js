class ModelReview {
  constructor(data) {
    this.text = data[`comment`];
    this.date = new Date(data[`date`]);
    this.id = data[`id`];
    this.rating = data[`rating`];
    this.user = {
      avatar: data.user[`avatar_url`],
      id: data.user[`id`],
      name: data.user[`name`],
      superStar: data.user[`is_pro`]
    };
  }

  static parseReview(data) {
    return new ModelReview(data);
  }

  static parseReviews(data) {
    return data.map(ModelReview.parseReview);
  }
}

export default ModelReview;

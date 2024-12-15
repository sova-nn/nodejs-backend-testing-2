import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      result.forEach((it, key) => expect(it).toHaveProperty('text', posts[key].text));
      expect(result).toHaveLength(posts.length);

      expect(result).not.toHaveLength(0);
    });

    it('should return correct posts for skip and limit options', () => {
      const skip = 1;
      const limit = 2;

      const result = postsService.findMany({ skip, limit });
      const postsSliced = posts.slice(skip, skip + limit);

      result.forEach((it, key) => expect(it).toHaveProperty('text', postsSliced[key].text))
      expect(result).toHaveLength(limit);
    });

    it('should return correct posts for only skip option', () => {
      const skip = 1;

      const result = postsService.findMany({ skip });
      const expectedResult = posts.slice(skip);

      expect(result[0]).toHaveProperty('text', expectedResult[0].text);
      expect(result).toHaveLength(expectedResult.length);
    });

    it('should return correct posts for only limit option', () => {
      const limit = 2;

      const result = postsService.findMany({ limit });

      expect(result).toHaveLength(limit);
    });
  });
});
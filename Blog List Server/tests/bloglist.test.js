const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const multipleBlogs = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5asdas34d17f8',
        title: 'someo ther',
        author: 'Edsger W. Disdasjkstra',
        url: 'http://www.u.aasdasrizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 11,
        __v: 0
      }]

      test('Total number of likes with list of multiple blogs', () => {
        const result = listHelper.totalLikes(multipleBlogs)
        expect(result).toBe(16)
    })
})



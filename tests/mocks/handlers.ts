import { http, HttpResponse } from 'msw'

export const handler = [
  http.get('/fetchPost', () => {
    return HttpResponse.json([
      { id: 1, name: 'Electronic' },
      { id: 2, name: 'Phone' },
    ])
  }),

  http.get('/fetchFilteredPosts', () => {
    return HttpResponse.json([
      {
        id: '1',
        user_id: 'user123',
        title: 'Test Post',
        image: '/test-image.jpg',
        header: 'Test header',
        created_at: '2024-12-01T00:00:00Z',
      },
    ])
  }),
  http.get('/fetchDescendingPosts', () => {
    return HttpResponse.json([
      {
        id: '2',
        user_id: 'user123',
        title: 'Test Post',
        image: '/test-image.jpg',
        header: 'Test header',
        created_at: '2024-12-01T00:00:00Z',
      },
    ])
  }),
]

import { describe, test, expect } from 'vitest'
import { fetchPost } from '../lib/data'

// describe('fetchPost', () => {
//   test('fetches a post', async () => {
//     const post = await fetchPost('45883d64-3861-43ba-a3dd-523ba2b511a2')
    
//     expect(post).toEqual(undefined)
//     console.log('Fetched data:', post);

//   })
// })

describe('fetchPost', () => {
  test('fetches a post', async () => {
    const post = await fetchPost('45883d64-3861-43ba-a3dd-523ba2b511a2')
    
    expect(post).toEqual(undefined)
    console.log('Fetched data:', post);
  })

  // test('returns the correct post', async () => {
  //   const postId = '45883d64-3861-43ba-a3dd-523ba2b511a2'
  //   const expectedPost = {
  //     id: postId,
  //     title: '1234',
  //     content: '1234',
  //   }

  //   const post = await fetchPost(postId)

  //   expect(post).toEqual(expectedPost)
  // })

  // test('handles error when post is not found', async () => {
  //   const postId = 'non-existent-post-id'

  //   const post = await fetchPost(postId)

  //   expect(post).toEqual(null)
  // })
})

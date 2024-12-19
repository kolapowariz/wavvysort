import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import { Post } from '@/types/custom';
import { DesendingPosts } from '@/app/dashboard/(overview)/page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue([{  }]),
    }),
  }),
}));


describe('filteredPost', () => {
  it('should render the list of posts', async () => {
    const response = await fetch('/fetchDescendingPosts')
    const data: Post[] = await response.json() as Post[]
    console.log(data)

  })
})






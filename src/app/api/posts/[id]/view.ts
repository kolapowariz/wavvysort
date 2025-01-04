import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ views: supabase.rpc('increment_views', { id }) })
        .eq('id', id)
        .select('views') // Retrieve the updated view count

      if (error) {
        throw error
      }

      res
        .status(200)
        .json({ message: 'View count updated', views: data[0].views })
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

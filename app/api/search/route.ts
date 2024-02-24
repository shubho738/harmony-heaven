
import {type NextRequest, NextResponse} from 'next/server'

import type { SearchResults } from '@/libs/types'
import {performSearch} from '@/libs/helpers/search'

export const GET = async (req: NextRequest)  => {

  const searchParams = req.nextUrl.searchParams
  const keyword = searchParams.get('keyword')

  if (!keyword) return NextResponse.json({error: "missing keyword parameter."}, {status: 400})


  try {

    const results: SearchResults = await performSearch(keyword || "")

    return NextResponse.json(results)

  } 

  catch (error) {

    return NextResponse.json({ error: 'an error occurred while searching' }, {status: 500})
  }
}
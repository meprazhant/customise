import EditorMain from '@/components/Editor/EditorMain'
import React from 'react'

async function page({params}) {
    const {id} = await params
  return (
    <div>
        <EditorMain id={id}/>
    </div>
  )
}

export default page
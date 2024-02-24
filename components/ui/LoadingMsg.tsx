
'use client'

import {BeatLoader} from 'react-spinners'

interface LoadingMsgProps {
  msg: string;
}

const LoadingMsg = ({msg = "Hold on, loading content"}: LoadingMsgProps) => {

  return (
    <div
      className="text-center flex flex-col sm:flex-row gap-2 justify-center"
    >
      <span
        className="text-lg"
      >
        {msg}
      </span>

      <div
        className="sm:self-end"
      >
        <BeatLoader
          color="hsl(var(--clr-loader))"
          size ={6}
        />
      </div>
    </div>
  )
}

export default LoadingMsg
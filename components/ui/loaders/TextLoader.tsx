
import {BeatLoader} from 'react-spinners'

interface TextLoaderProps {
  color?: string;
  size?: number;
}

const TextLoader = ({color = "hsl(var(--clr-loader))", size = 8}: TextLoaderProps) => {

  return (

      <div
        className="inline"
      >
        <BeatLoader
          color={color}
          size ={size}
        />
      </div>
  )
}

export default TextLoader
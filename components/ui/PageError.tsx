
interface PageErrorProps {
  msg?: string;
}

const PageError = ({msg = "There was an error."}: PageErrorProps) => {

  return (
    <div
      className="min-h-[50vh] flex items-center justify-center"
    >
      <span
        className="text-xl"
      >
        {msg}
      </span>
    </div>
  )
}


export default PageError
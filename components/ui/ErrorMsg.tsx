
interface ErrorMsgProps {
  msg?: string;
}

const ErrorMsg = ({msg = "Sorry, Something went wrong."}: ErrorMsgProps) => {

  return (
    <div
      className="text-center"
    >
      <span
        className="text-xl"
      >
        {msg}
      </span>
    </div>
  )
}

export default ErrorMsg

import LoadingMsg from '@/components/ui/LoadingMsg'

interface PageLoadingProps {
  msg?: string;
}

const PageLoading = ({msg = "Loading. Please wait"}: PageLoadingProps) => {

  return (
    <div
      className="min-h-[50vh] flex items-center justify-center"
    >
      
      <LoadingMsg
        msg={msg}
      />
    </div>
  )
}


export default PageLoading
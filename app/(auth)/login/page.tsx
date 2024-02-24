
import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {

  return (
    <main
      className="min-h-[80vh] grid place-items-center"
    >
     <div className="container">
       <div>
         <LoginForm />
       </div>
     </div>
    </main>
  )
}

export default LoginPage
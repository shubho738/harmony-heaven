
import RegisterForm from '@/components/auth/RegisterForm'

const RegisterPage = () => {

  return (
    <main
      className="min-h-[80vh] grid place-items-center"
    >
     <div className="container">
       <div>
         <RegisterForm />
       </div>
     </div>
    </main>
  )
}

export default RegisterPage
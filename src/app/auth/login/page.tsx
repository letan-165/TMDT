import { LoginForm } from "@/components/login-form"
import { GoogleOAuthProvider } from "@react-oauth/google"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_I!}>
          <LoginForm />
        </GoogleOAuthProvider>

      </div>
    </div>
  )
}

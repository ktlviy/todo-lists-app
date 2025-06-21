import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/forms/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { loading } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(135deg,#ffe6e6_0%,#e6e6ff_100%)] font-poppins">
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] p-8 border border-[#F79489]">
        <h1 className="text-2xl font-bold text-center text-[#F79489] text-shadow mb-6">
          Sign in to your account
        </h1>
        {loading ? (
          <div className="text-center py-8 text-[#F79489] text-shadow">
            Loading ...
          </div>
        ) : (
          <LoginForm />
        )}
        <div className="mt-6 text-center text-sm text-[#F79489] text-shadow">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#ff6666] hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

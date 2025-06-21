import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth";
import { validationSchemaLogin } from "@/constants/validationSchema";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await loginUser(values);
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md p-6 space-y-3 font-poppins"
      >
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full mt-4 bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] active:scale-98"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && (
        <Dialog open={!!error} onOpenChange={() => setError("")}>
          <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
            <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
              Error
            </DialogTitle>
            <p className="text-sm text-red-500">{error}</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

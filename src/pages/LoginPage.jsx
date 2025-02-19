import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, HelpCircle, LogIn } from "lucide-react";
import { login } from "../services/AuthService";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("password"); // "password" or "eSignature"
  const [step, setStep] = useState("login"); // "login", "selectAccount", "otpVerification"
  const [form, setForm] = useState({ id: "", password: "", email: "", otp: "" });
  const [errors, setErrors] = useState({ id: "", password: "", email: "", otp: "" });

  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  const handleRedirection = () => {
    if (step === 'otpVerification') {
      if (form.otp.trim()) {
        // Set 'auth' to true on successful login
        localStorage.setItem('auth', 'true');

        navigate("/users");
      }
    } else if (loginMethod === 'eSignature') {
      if (form.email.trim()) {
        // Set 'auth' to true on successful login
        localStorage.setItem('auth', 'true');

        navigate("/inbox");
      }
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (loginMethod === "password") {
      if (step === "login") {
        if (!form.id.trim() || !form.password.trim()) {
          if (!form.id.trim()) newErrors.id = "TR ID Number/Passport Number is required";
          if (!form.password.trim()) newErrors.password = "Password required";
        }
        else {
          const response = await login(form)
          setAccounts(response.accounts);
          console.log(response)
        }
      }
    } else {
      if (!form.email.trim()) newErrors.email = "Email is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep("selectAccount"); // Move to account selection
  };

  const handleAccountSelection = () => {
    setStep("otpVerification"); // Move to OTP verification step
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!form.otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    console.log("OTP Verified. Proceed to dashboard...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl"> {/* Increased max width */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="KEPKUR" className="h-12" />
        </div>

        {/* Toggle Between Login Methods */}
        <div className="flex mb-4">
          <button
            className={`flex-2 pb-2 mr-5 ${loginMethod === "password" ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => {
              setLoginMethod("password");
              setStep("login");
            }}
          >
            Login with Password
          </button>
          <button
            className={`flex-2 pb-2 ml-5 ${loginMethod === "eSignature" ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => {
              setLoginMethod("eSignature");
              setStep("login");
            }}
          >
            Login with E-Signature
          </button>
        </div>

        {step === "login" && loginMethod === "password" && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-[1fr_2fr] gap-20 mb-2  mr-40">
              <label htmlFor="id" className="font-medium self-center">TR ID Number / Passport Number</label>
              <div>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
                {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_2fr] gap-20 mb-2 mr-40">
              <label htmlFor="password" className="font-medium self-center">Password</label>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm flex items-center ml-40 mr-5">
                <HelpCircle className="w-4 h-4 mr-2" /> I forgot my password
              </button>
              <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-md flex items-center ml-5 mr-40">
                <LogIn className="w-4 h-4 mr-2" /> Login
              </button>
            </div>
          </form>
        )}

        {step === "login" && loginMethod === "eSignature" && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-[4fr_1fr] gap-4 mb-4">
              <div className="mr-20">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
                {errors.email && <p className="text-red-500 text-sm col-span-2">{errors.email}</p>}
              </div>
              <button type="submit" onClick={handleRedirection} className="bg-green-700 text-white px-6 py-2 rounded-md mx-10 max-w-20">
                Login
              </button>
            </div>

            <div className="flex justify-end">

            </div>
          </form>
        )}

        {step === "selectAccount" && (
          <div>
            <h2 className="text-lg font-medium mb-3">Select Account</h2>
            <div className="flex items-center">
              <select
                className="w-full border rounded-md p-2"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              >
                {accounts.length > 0 ? (
                  accounts.map((account, index) => (
                    <option key={index} value={account.email}>
                      {account.email}
                    </option>
                  ))
                ) : (
                  <option>No accounts available</option>
                )}
              </select>
              <div className="mx-10">
                <button
                  onClick={handleAccountSelection}
                  className="bg-green-700 text-white px-6 py-2 rounded-md whitespace-nowrap flex items-center"
                >
                  <CircleUserRound className="w-4 h-4 mr-2" /> Select Account
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "otpVerification" && (
          <form onSubmit={handleOtpSubmit}>
            <p className="text-gray-600 text-sm mb-2">An SMS with a one-time password has been sent to your phone.</p>
            <div className="grid grid-cols-[3fr_2fr] gap-4 mb-4">
              <div>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  maxLength={6}
                  placeholder="SMS Home"
                />
                {errors.otp && <p className="text-red-500 text-sm col-span-2">{errors.otp}</p>}
              </div>
              <div className="">
                <button type="submit" onClick={handleRedirection} className="bg-green-700 text-white mx-10 px-6 py-2 rounded-md">
                  Entrance
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

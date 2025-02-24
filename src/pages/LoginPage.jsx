import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, HelpCircle, LogIn } from "lucide-react";
import { login, loginEsign, selectAccount, smsOtp } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { initUser } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("password"); // "password" or "eSignature"
  const [step, setStep] = useState("login"); // "login", "selectAccount", "otpVerification"
  const [form, setForm] = useState({ id: "", password: "", email: "", otp: "" });
  const [errors, setErrors] = useState({ id: "", password: "", email: "", otp: "" });
  const [accounts, setAccounts] = useState([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleRedirection = () => {
    if (step === 'otpVerification') {
      if (form.otp.trim()) {
        navigate("/inbox");
      }
    } else if (loginMethod === 'eSignature') {
      if (form.email.trim()) {
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
          if (!form.id.trim()) newErrors.id = t("tr-id-number/passport-number-required");
          if (!form.password.trim()) newErrors.password = t("password-required");
        }
        else {
          const response = await login(form);
          if (!response) {
            newErrors.invalid = "Invalid Credentials";
          }
          setAccounts(response.accounts);
          console.log(response)
        }
      }
    } else {
      if (!form.email.trim()) {
        newErrors.email = t("email-required");
        return;
      }
      const response = await loginEsign();
      if (response) {
        const user = {
          id: 1,
          email: "test@dictalabs.com",
          name: "Test Account 1",
          kep_address: "test@dictalabs.kep.tr"
        }
        initUser(user);
        handleRedirection()
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep("selectAccount"); // Move to account selection
  };

  const handleAccountSelection = async () => {
    if (!form.account_id) {
      setErrors({ account: t("please-select-account") });
      return;
    }

    const response = await selectAccount({ account_id: form.account_id });

    if (response) {
      setStep("otpVerification"); // Move to OTP verification step
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp.trim()) {
      setErrors({ otp: t("otp-is-required") });
      return;
    }

    const response = await smsOtp(form);

    if (response) {
      console.log("OTP Verified. Proceed to dashboard...");
      initUser(response.user);
      handleRedirection();
    } else {
      setErrors({ otp: t("otp-is-invalid") });
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl"> {/* Increased max width */}
        <div className="flex justify-center mb-6">
          <img src="src\assets\KepKur_Logo-small.png" alt="KEPKUR" className="h-28" />
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
            {t("login-with-password")}
          </button>
          <button
            className={`flex-2 pb-2 ml-5 ${loginMethod === "eSignature" ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => {
              setLoginMethod("eSignature");
              setStep("login");
            }}
          >
            {t("login-with-esignature")}
          </button>
        </div>

        {step === "login" && loginMethod === "password" && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-[1fr_2fr] gap-20 mb-2  mr-40">
              <label htmlFor="id" className="font-medium self-center">{t("tr-id-number/passport-number")}</label>
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
              <label htmlFor="password" className="font-medium self-center">{t("password")}</label>
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
              {/* Language Dropdown */}
              <div className="relative">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm cursor-pointer"
                >
                  <option value="en">en</option>
                  <option value="tr">tr</option>
                </select>
              </div>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm flex items-center ml-40 mr-5">
                <HelpCircle className="w-4 h-4 mr-2" /> {t("i-forgot-my-password")}
              </button>
              <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-md flex items-center ml-5 mr-40">
                <LogIn className="w-4 h-4 mr-2" /> {t("login")}
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
              <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-md mx-10 max-w-20">
                {t("login")}
              </button>
              {/* Language Dropdown */}
              <div className="relative">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm cursor-pointer"
                >
                  <option value="en">en</option>
                  <option value="tr">tr</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">

            </div>
          </form>
        )}

        {step === "selectAccount" && (
          <div>
            <h2 className="text-lg font-medium mb-3">{t("select-account")}</h2>
            <div className="flex items-center">
              <select
                className="w-full border rounded-md p-2"
                value={form.account_id || ""}
                onChange={(e) => {
                  console.log("Selected Account ID:", e.target.value); // Debugging
                  setForm({ ...form, account_id: e.target.value });
                }}
              >
                <option value="">{t("select-an-account")}</option>
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <option key={account.account_id} value={account.account_id}>
                      {account.kep_address} ({account.account_name})
                    </option>
                  ))
                ) : (
                  <option>{t("no-accounts-available")}</option>
                )}
              </select>
              <div className="mx-10">
                <button
                  onClick={handleAccountSelection}
                  className="bg-green-700 text-white px-6 py-2 rounded-md whitespace-nowrap flex items-center"
                >
                  <CircleUserRound className="w-4 h-4 mr-2" /> {t("select-account")}
                </button>
              </div>
            </div>
            {/* Language Dropdown */}
            <div className="relative mt-4">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm cursor-pointer"
              >
                <option value="en">en</option>
                <option value="tr">tr</option>
              </select>
            </div>
            {errors.account && <p className="text-red-500 text-sm">{errors.account}</p>}
          </div>
        )}


        {step === "otpVerification" && (
          <form onSubmit={handleOtpSubmit}>
            <p className="text-gray-600 text-sm mb-2">{t("sms-otp-sent-to-phone")}</p>
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
                  placeholder={t("sms-home")}
                />
                {errors.otp && <p className="text-red-500 text-sm col-span-2">{errors.otp}</p>}
              </div>
              <div className="">
                <button type="submit" className="bg-green-700 text-white mx-10 px-6 py-2 rounded-md">
                  {t("entrance")}
                </button>
              </div>
            </div>
            {/* Language Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm cursor-pointer"
              >
                <option value="en">en</option>
                <option value="tr">tr</option>
              </select>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

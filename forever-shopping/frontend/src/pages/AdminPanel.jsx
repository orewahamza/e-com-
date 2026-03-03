import { useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const AdminPanel = () => {
  const { token, backendUrl, userType } = useContext(ShopContext);
  const adminUrl =
    import.meta.env.VITE_ADMIN_URL ||
    (typeof window !== "undefined" && window.location?.hostname === "localhost"
      ? "http://localhost:5174/"
      : "https://forever-admin-omega-liard.vercel.app/");

  if (userType !== 'host') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 Forbidden</h1>
        <p className="text-lg text-brand-blue-300">Host privileges required.</p>
        <a href="/" className="mt-6 px-6 py-2 bg-black text-white rounded">
          Go Home
        </a>
      </div>
    );
  }

  useEffect(() => {
    const go = async () => {
      try {
        if (token) {
          const resp = await axios.post(
            `${backendUrl}/api/user/admin-bridge`,
            {},
            { headers: { token } }
          );
          if (resp.data?.success && resp.data?.token) {
            const userId = resp.data.userId;
            window.location.assign(`${adminUrl}?token=${encodeURIComponent(resp.data.token)}&hostId=${userId}`);
            return;
          }
        }
      } catch (_) {
        // ignore and fallback
      }
      window.location.assign(adminUrl);
    };
    go();
  }, [adminUrl, backendUrl, token]);

  return (
    <div className="py-10 text-center">
      <Helmet>
        <title>Redirecting... | Forever Shopping</title>
      </Helmet>
      <Loading />
      <p className="mt-4 text-brand-blue-300">Redirecting to Host Panel…</p>
    </div>
  );
};      <a className="underline" href={adminUrl}>
        Click here if you are not redirected
      </a>
    </div>
  );
};

export default AdminPanel;

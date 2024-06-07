'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  });
  const [signUpValue, setSignUpValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginChange = (e) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUpChange = (e) => {
    setSignUpValue({
      ...signUpValue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const response = await fetch('http://192.168.18.103:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpValue),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Pendaftaran gagal');
        }

        const data = await response.json();
        console.log('Pendaftaran berhasil', data);
        setIsSignUp(false);
      } else {
        const res = await signIn('credentials', {
          redirect: false,
          email: loginValue.email,
          password: loginValue.password,
          callbackUrl: "/"
        });

        if (!res.ok) {
          throw new Error(res.error || 'Login gagal');
        }

        console.log(res);
      }
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsSignUp(false)}
            className={`py-2 px-4 focus:outline-none border-b-4 ${
              !isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`py-2 px-4 focus:outline-none border-b-4 ${
              isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'
            }`}
          >
            Daftar
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={signUpValue.name}
                  onChange={handleSignUpChange}
                  autoComplete="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={signUpValue.email}
                  onChange={handleSignUpChange}
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={signUpValue.password}
                    onChange={handleSignUpChange}
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginValue.email}
                  onChange={handleLoginChange}
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginValue.password}
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </>
          )}
          {errors.message && (
            <div className="text-red-500 text-sm">
              {errors.message}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Memproses...' : isSignUp ? 'Daftar' : 'Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

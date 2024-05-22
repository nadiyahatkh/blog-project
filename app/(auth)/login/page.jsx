// LoginPage.js
'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import {  useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
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
        const response = await axios.post('http://192.168.18.103:8000/api/register', signUpValue);
        console.log('Pendaftaran berhasil', response.data);
        setIsSignUp(false);
      } else {
        const res= await signIn('credentials', {
          redirect: false,
          email: loginValue.email,
          password: loginValue.password,
          callbackUrl: "/"
        });
console.log(res)

        if (!res?.error) {
        router.push("/");
      } else {
        console.log(res.error);
      }
    }
   }catch (error) {
      setErrors({ message: error.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={signUpValue.password}
                  onChange={handleSignUpChange}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginValue.password}
                  onChange={handleLoginChange}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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

// 'use client';

// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import axios from 'axios';

// export default function LoginPage() {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [loginValue, setLoginValue] = useState({
//     email: '',
//     password: ''
//   });
//   const [signUpValue, setSignUpValue] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleLoginChange = (e) => {
//     setLoginValue({
//       ...loginValue,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSignUpChange = (e) => {
//     setSignUpValue({
//       ...signUpValue,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     try {
//       if (isSignUp) {
//         const response = await axios.post('http://192.168.18.103:8000/api/register', signUpValue);
//         console.log('Pendaftaran berhasil', response.data);
//         setIsSignUp(false); // Alihkan ke mode login setelah signup berhasil
//       } else {
//         const result = await signIn('credentials', {
//           redirect: false,
//           email: loginValue.email,
//           password: loginValue.password,
//           callbackUrl: "/",
//         });
//         if (result.error) throw new Error(result.error);
//         console.log('Masuk berhasil', result);
//       }
//     } catch (error) {
//       setErrors({ message: error.response?.data?.message || error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
//         <div className="flex justify-between items-center mb-8">
//           <button
//             onClick={() => setIsSignUp(false)}
//             className={`py-2 px-4 focus:outline-none border-b-4 ${
//               !isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'
//             }`}
//           >
//             Masuk
//           </button>
//           <button
//             onClick={() => setIsSignUp(true)}
//             className={`py-2 px-4 focus:outline-none border-b-4 ${
//               isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'
//             }`}
//           >
//             Daftar
//           </button>
//         </div>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {isSignUp ? (
//             <>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Nama
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={signUpValue.name}
//                   onChange={handleSignUpChange}
//                   autoComplete="name"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={signUpValue.email}
//                   onChange={handleSignUpChange}
//                   autoComplete="email"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Kata Sandi
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={signUpValue.password}
//                   onChange={handleSignUpChange}
//                   autoComplete="current-password"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </>
//           ) : (
//             <>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={loginValue.email}
//                   onChange={handleLoginChange}
//                   autoComplete="email"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Kata Sandi
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={loginValue.password}
//                   onChange={handleLoginChange}
//                   autoComplete="current-password"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </>
//           )}
//           {errors.message && (
//             <div className="text-red-500 text-sm">
//               {errors.message}
//             </div>
//           )}
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               disabled={loading}
//             >
//               {loading ? 'Memproses...' : isSignUp ? 'Daftar' : 'Masuk'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import useAuthStore from '../store/userAuthStore';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isSigningup } = useAuthStore();

  console.log(formData);

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) login(formData);
  };

  return (
    <div className="min-h-screen grid">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login Account</h1>
              <p className="text-base-content/60">Login and get started</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/50" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pl-10"
                  name="Password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="size-5 text-base-content/50" /> : <EyeOff className="size-5 text-base-content/50" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningup}>
              {isSigningup ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Sign-up Link */}
          <div className="text-center">
            <p className="text-base-content/70">
              Don't have an account?{" "}
              <Link to="/sign" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;








// import { useState } from 'react';
// import useAuthStore from '../store/userAuthStore';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import { Eye, EyeOff, Loader2, Mail, MessageSquare, User } from 'lucide-react';

// const LoginPage = () => {

//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFoemdata] = useState({
//     email: "",
//     password: "",
//   })

//   const { login, isSigningup } = useAuthStore()

//   console.log(formData)
//   const validataForm = () => {
//     if (!formData.email.trim()) return toast.error("Email is require")
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email")
//     if (!formData.password.trim()) return toast.error("Password is require")
//     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")

//     return true
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const success = validataForm();

//     if (success === true) login(formData)

//   }


//   return (
//     <>
//       <div className="min-h-screen grid ">
//         <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//           <div className="w-full max-w-md space-y-8">
//             <div className="text-center mb-8">
//               <div className="flex flex-col items-center gap-2 group">
//                 <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                   <MessageSquare className="size-6 text-primary" />
//                 </div>
//                 <h1 className="text-2xl font-bold mt-2">Login Account</h1>
//                 <p className="text-base-content/60">Login and Get started</p>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Email</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="size-5 text-base-content/50" />
//                   </div>
//                   <input
//                     type="text"
//                     className={`input input-bordered w-full pl-10`}
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={(e) => { setFoemdata({ ...formData, email: e.target.value }) }} />
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Password</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="size-5 text-base-content/50" />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     className={`input input-bordered w-full pl-10`}
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={(e) => { setFoemdata({ ...formData, password: e.target.value }) }}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}>
//                     {!showPassword ? (
//                       <EyeOff className="size-5 text-base-content/50" />
//                     ) : (
//                       <Eye className="size-5 text-base-content/50" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary w-full"
//                 disabled={isSigningup}>
//                 {isSigningup ? (<>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>) : (
//                   "Login"
//                 )}
//               </button>
//             </form>
//             <div className="text-center">
//               <p className="text-base-content/70">
//                 don't have an account?{" "}
//                 <Link to="/sign"
//                   className="link link-primary">
//                   Sign
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default LoginPage
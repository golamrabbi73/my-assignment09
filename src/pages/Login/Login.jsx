import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { MdDirectionsCar } from "react-icons/md";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axiosSecure from "../../api/axiosInstance";

const Login = () => {
    const {loginUser, googleLogin, loading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const result = await loginUser(email, password);

            await axiosSecure.post(
                "http://localhost:5000/jwt",
                {
                    email: result.user.email,
                },
                {
                    withCredentials: true,
                }
            );
            
            toast.success("Welcome back!");
            navigate(from, {replace: true});

        } catch (err){
            setError("Invalid email or password. Please try again.");
            toast.error("Login failed");
        }
    };

    const handleGoogle = async () => {
        try{
            const result = await googleLogin(email, password);

            await axiosSecure.post(
                "http://localhost:5000/jwt",
                {
                    email: result.user.email,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success("Logged in with Google!");
            navigate(from, {replace:true});

        } catch {
            toast.error("Google login failed");
        }
    };
    
  return (
    <div className="min-h-screen flex">
        {/* left part */}
        <div
            className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
            style={{ background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)'}}
        >
            <Link to="/" 
                className="flex items-center gap-2 font-heading font-bold text-xl text-primary"
            >
                <MdDirectionsCar className="text-2xl" />
                <span>
                    Drive
                    <span className="text-white">
                        Fleet
                    </span>
                </span>
            </Link>

            <div>
                <h2 className="font-heading text-4xl font-bold text-white leading-tight mb-4">
                    Your Next Adventure<br />
                    <span className="text-primary">Starts Here.</span>
                </h2>
                <p className="text-white/50 text-lg">
                    Sign in to access bookings, manage your listings, and explore cars.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {["500+ Cars", "10K+ Users", "50+ Cities"].map((s) => (
                    <div
                        key={s}
                        className="bg-white/5 border border-white/40 rounded-xl text-center"
                    >
                        <div className="text-white font-heading font-bold">
                            {s.split('+')[0]}+
                        </div>
                        <div className="text-white/40 text-xs">
                            {s.split(' ').slice(1).join(' ')}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* right part */}
        <div className="flex-1 flex items-center justify-center p-6 bg-base-100">
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <h1 className="font-heading text-3xl font-bold text-base-content">
                        Sign In
                    </h1>
                    <p className="text-base-content/60 mt-1">
                        Welcome back to DriveFleet
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error mb-4 text-sm">
                        <span>{error}</span>
                    </div>
                )}
                    
                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                        
                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 translate-y-1/2 text-base-content/40" />
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="input input-bordered w-full pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
        
                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 translate-y-1/2 text-base-content/40" />
                            <input
                                type={showPass ? 'text' : 'password'}
                                placeholder="Yout password"
                                value={password}
                                required
                                className="input input-bordered w-full pl-10"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 translate-y-1/2 text-base-content/40"
                            >
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        // disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        Sign in
                        {/* {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>) : ("Create Account")} */}
                    </button>
                </form>
        
                <div className="divider">or continue with</div>
        
                <button
                    onClick={handleGoogle}
                    // disabled={loading}
                    className="btn btn-outline w-full gap-3 font-heading border-base-300"
                >
                    <FcGoogle className="text-xl" /> Sign in with Google
                </button>
        
                <p className="text-center text-base-content/60 text-sm mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-primary font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>     
            </div>
        </div>
    </div>
  );
};

export default Login

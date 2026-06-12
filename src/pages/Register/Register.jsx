import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDirectionsCar } from "react-icons/md";
import { FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUsers } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, updateUser, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });

    const [showPass, setShowPass] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (pass) => {
        const errs = {};

        if (!/[A-Z]/.test(pass)) {
            errs.uppercase = 'Must contain at least one uppercase letter';
        }

        if (!/[a-z]/.test(pass)) {
            errs.lowercase = 'Must contain at least one lowercase letter';
        }

        if (pass.length < 6) {
            errs.length = 'Must be at least 6 characters';
        }

        return errs;
    };
    
    // input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ 
            ...prev,
            [name]: value
        }));

        if (name === "password") {
            setErrors(validatePassword(value));
        }
    };

    // save user
    const saveUser = async (user) => {
        const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return res.json();
    };

    // submit
    const handleRegister = async (e) => {
        e.preventDefault();

        const passErr = validatePassword(form.password);

        if (Object.keys(passErr).length > 0){
            setErrors(passErr);
            toast.error('Please fix password errors');
            return;
        }

        // setLoading(true);

        try{
            await createUser(form.email, form.password);

            await updateUser(form.name, form.photoURL);

            await saveUser({
                name: form.name,
                email: form.email,
                photoURL: form.photoURL,
            });

            toast.success('Registration Successful! Please sign in.');
            navigate('/login');

        } catch (err) {
            toast.error(
                err.code === 'auth/email-already-in-use'
                ? "Email already in use. Try logging in."
                : "Registration failed. Please try again."
            );
        } finally {
            // setLoading(false);
        }
    };

    // google login
    const handleGoogle = async () => {
        try{
            const result = await googleLogin();

            await saveUser({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            });
            
            toast.success('Registered with Google!');
            navigate('/');
        }catch{
            toast.error('Google sign-in failed');
        }
    };

    const passwordChecks = [
        { key: 'uppercase', label: 'Uppercase letter' },
        { key: 'lowercase', label: 'Lowercase letter' },
        { key: 'length', label: 'At least 6 characters' },
    ];

  return (
    <>
        <div className="min-h-screen flex">
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
                        Join Thousands of<br />
                        <span className="text-primary">Happy Drivers.</span>
                    </h2>
                    <p className="text-white/50 text-lg">
                        Create a free account to start exploring, booking, and listing cars on DriveFleet.
                    </p>
                </div>
                <div>
                    {['No booking fees ever', 'Free car listing', '24/7 customer support'].map((s) => (
                        <div
                            key={s}
                            className="flex items-center gap-3 text-white/60 text-sm"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs">
                                ✓
                            </div>
                            {s}
                        </div>
                    ))}
                </div>
            </div>

            {/* form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-base-100">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <h1 className="font-heading text-3xl font-bold text-base-content">
                            Create Account
                        </h1>
                        <p className="text-base-content/60 mt-1">
                            Join DriveFleet for free
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="space-y-4"
                    >
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <FiImage className="absolute left-3 top-1/2 translate-y-1/2 text-base-content/40" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Type your name"
                                    className="input input-bordered w-full pl-10"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 translate-y-1/2 text-base-content/40" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full pl-10"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* photo url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Photo URL</span>
                            </label>
                            <div className="relative">
                                <FiUsers className="absolute left-3 top-1/2 translate-y-1/2 text-base-content/40" />
                                <input
                                    type="url"
                                    name="photoURL"
                                    placeholder="https://example.com/photo.jpg"
                                    className="input input-bordered w-full pl-10"
                                    value={form.photoURL}
                                    onChange={handleChange}
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
                                    name="password"
                                    required
                                    placeholder="Create a strong password"
                                    className="input input-bordered w-full pl-10"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 translate-y-1/2 text-base-content/40"
                                >
                                    {showPass ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* pass validation indicatiors */}
                            {form.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordChecks.map((c) => (
                                        <div
                                            key={c.key}
                                            className={`flex items-center gap-2 text-xs ${errors[c.key] ? 'text-error' : 'text-success'}`}
                                        >
                                            <span>{!errors[c.key] ? '✗' : '✓'}</span>
                                            <span>{c.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            // disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            Create Account
                            {/* {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>) : ("Create Account")} */}
                        </button>

                        <div className="divider">or</div>

                        <button
                            type="button"
                            onClick={handleGoogle}
                            // disabled={loading}
                            className="btn btn-outline w-full gap-3 font-heading border-base-300"
                        >
                            <FcGoogle className="text-xl" /> Sign up with Google
                        </button>

                        <p className="text-center text-base-content/60 text-sm mt-6">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    </>
  )
}

export default Register

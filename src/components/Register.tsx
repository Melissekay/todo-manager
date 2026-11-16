import React, { useState } from 'react';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
  };

  return (
    <div className="min-h-screen w-full bg-[#22eb10] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-95 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8">
        <h1 className="text-[22px] font-bold text-gray-900 mb-6 tracking-tight">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E664]/40 focus:border-[#00E664] transition"
            />
          </div>

          
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E664]/40 focus:border-[#00E664] transition"
            />
          </div>

         
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E664]/40 focus:border-[#00E664] transition"
            />
          </div>

          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#00E664] hover:bg-[#00d15a] active:scale-[0.99] text-gray-900 font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </form>

       
        <p className="mt-5 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-[#00B850] hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

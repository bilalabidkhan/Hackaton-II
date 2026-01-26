'use client';
import Link from "next/link"
import { motion } from "framer-motion";

const HomePage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
     <div className="min-h-screen flex flex-col items-cente justify-center px-" >
      {/* Hero Section */}
       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-32 flex flex-col items-center relative overflow-hidden">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-2xl md:text-6xl font-bold mb-6 text-center"
        >
          A Todo Experience <br />
         <span className="text-yellow-300">
          Like You’ve Never Seen
         </span>
          {/* Stay Organized with <span className="text-yellow-300">TodoPro</span> */}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base md:text-xl px-2 max-w-2xl text-center mb-6 text-black font-normal"
        >
          Manage your tasks effortlessly. Add, update, and complete todos with a professional and secure multi-user app.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link
           href="/todos"
           className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-3 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg"
          >
           Get Started
          </Link>

          <button
           onClick={() => {
           document
            .getElementById("how-it-works")
            ?.scrollIntoView({ behavior: "smooth" });
           }}
           className="px-2 py-3 font-semibold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-800">
           See How It Works
          </button>
        </motion.div>
        
        {/* Animated circles in background */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute w-40 h-40 bg-yellow-200 rounded-full opacity-20 top-10 left-10"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute w-60 h-60 bg-white rounded-full opacity-10 bottom-0 right-10"
          />
         </div>
       </section>

      {/* FEATURES */}
       <section className="py-10 bg-slate-1">
        <div className="flex justify-center text-center py-6">
         <h2 className="text-2xl md:text-4xl font-bold text-center border-2 border-blue-800 text-blue-700 rounded-full p-2">
          ** Powerful Features **
         </h2>
        </div>
        
        {/* Features */}
        <div className="px-6 py-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {[
          {
           title: "Bank-Level Security",
           desc: "Your data is protected with end-to-end encryption and enterprise-grade security standards.",
           icon: "🛡️",
          },
          {
           title: "Task Management",
           desc: "Create, organize, and prioritize tasks with intelligent categorization and automated workflows.",
           icon: "✅",
          },
          {
           title: "Secure by Design",
           desc: "JWT-based authentication keeps your account safe.\nProtected routes ensure data privacy.",
           icon: "📱"
          },
          {
           title: "Premium UI",
           desc: "Experience a modern, clean, and elegant interface.\nIntuitive design makes task management a joy.",
           icon: "🎨"
          }
        ].map((item, i) => ( 
         <div key={i} className="rounded-2xl p-8 shadow-lg hover:scale-[1.02] transition">  
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary-600/10 text-primary-600 mb-4 text-3xl group-hover:scale-110 transition-transform">
           {item.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-300">
           {item.desc}
          </p>
         </div>
         ))}
        </div> 
       </section>

      {/* HOW IT WORKS */}
       <section id="how-it-works" className="px-6 py-20 bg-slate-100">
        <div className="flex justify-center text-center">
         <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 border-2 border-blue-800 text-blue-700 rounded-full p-2">
          ** How It Works **
         </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
         {[
           {
            title: "Sign Up",
            desc: "Create your account securely in seconds.",
            icon: (
             <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M12 11c2.761 0 5-2.239 5-5S14.761 1 12 1 7 3.239 7 6s2.239 5 5 5z" />
              <path strokeWidth="2" d="M3 23c0-4.418 3.582-8 8-8h2c4.418 0 8 3.582 8 8" />
             </svg>
            ),
           },
           {
            title: "Create Tasks",
            desc: "Add tasks with clarity and intent.",
            icon: (
             <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M12 4v16m8-8H4" />
             </svg>
            ),
           },
           {
            title: "Track Progress",
            desc: "Monitor completion in real time.",
            icon: (
             <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M3 12h4l3 8 4-16 3 8h4" />
             </svg>
            ),
           },
           {
            title: "Stay Productive",
            desc: "Focus better and achieve more daily.",
            icon: (
             <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M9 12l2 2 4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
             </svg>
            ),
           },
          ].map((item, i) => (
           <div key={i}
            className="group p-10 rounded-2xl border bg-white shadow-md">
            {/* Step Number */}
             <div className="mx-auto mb-5 h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold group-hover:scale-110 transition">
              {i + 1}
             </div>

            {/* Icon */}
             <div className="mx-auto mb-4 text-primary-600 dark:text-primary-400 group-hover:rotate-6 transition">
              {item.icon}
             </div>

            {/* Title */}
             <p className="font-semibold text-lg group-hover:text-primary-600 transition">
              {item.title}
             </p>
            
            {/* Discription */}
             <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {item.desc}
             </p>
           </div>
          ))}
        </div>
       </section>

      {/* CTA */}    
       <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center relative overflow-hidden">
        {/* Background animated circles */}
         <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute w-40 h-40 bg-yellow-300 rounded-full opacity-20 top-10 left-10 pointer-events-none"
         />
         <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute w-60 h-60 bg-white rounded-full opacity-10 bottom-0 right-10 pointer-events-none"
         />

         <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4"
         >
          Boost Your Productivity Today
         </motion.h2>

         <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base px-2 md:text-lg mb-8"
         >
          Start managing your tasks efficiently across all devices. Add, update, and complete todos effortlessly!
         </motion.p>

         <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
         >
         <Link
          href="/todos"
          className="inline-block bg-yellow-300 text-blue-800 font-semibold px-8 py-4 rounded-xl hover:scale-105 hover:shadow-2xl transition-transform shadow-lg">
          Start Your Free Trial
         </Link>
        </motion.div>
       </section>
     </div>
  )
}

export default HomePage;
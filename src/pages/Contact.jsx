const Contact = () => {
  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2.5rem] bg-[linear-gradient(150deg,#171312_0%,#4a3425_100%)] p-10 text-white shadow-[0_25px_90px_rgba(23,19,18,0.15)]">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-200">Contact</p>
          <h1 className="mt-4 font-['Sora'] text-4xl font-semibold">Let’s shape the next premium customer moment.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">
            For order help, collaborations, or support, the J&K Luxe team is ready with a cleaner and more production-ready contact experience.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-stone-300">Email</p>
              <p className="mt-2 font-semibold text-white">support@jkluxe.com</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-stone-300">Phone</p>
              <p className="mt-2 font-semibold text-white">+91 98000 00000</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-stone-300">Studio</p>
              <p className="mt-2 font-semibold text-white">Punjab, India</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Send Message</p>
          <h2 className="mt-3 font-['Sora'] text-3xl font-semibold text-stone-950">We’d love to hear from you.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input placeholder="Full Name" className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none" />
            <input placeholder="Email Address" className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none" />
            <input placeholder="Subject" className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none md:col-span-2" />
            <textarea rows="6" placeholder="Your message" className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none md:col-span-2" />
          </div>
          <button type="button" className="mt-5 rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800">
            Send Message
          </button>
        </section>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, CheckCircle2, Send, Clock, AlertCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Us | GadgetPicksPK',
    description: 'Get in touch with the tech expert team at GadgetPicksPK. Send us feedback, inquiries, or merchant partnership proposals.',
    canonical: '/contact'
  });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  // Client-side simple validation
  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email (e.g. asim@gmail.com).';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Please type your message.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user typist
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject);
      form.append('message', formData.message);

      const response = await fetch('https://formsubmit.co/ajax/infome.daraz@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: form
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        const errData = await response.json().catch(() => ({}));
        setSubmitError(errData.message || 'An error occurred while sending your message. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">Reach Out</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">Get in Touch</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Have questions regarding verified seller recommendations, technical specs, or partnership inquiries? Drop us a line.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-5 transition-colors">

            {/* Box 1: Email channel */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Address</h4>
                <a href="mailto:support@gadgetpickspk.com" className="text-sm font-bold text-slate-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  support@gadgetpickspk.com
                </a>
              </div>
            </div>

            {/* Box 2: Location info */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Headquarters</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Karachi, Sindh, Pakistan
                </p>
              </div>
            </div>

            {/* Box 3: Reply SLA */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Standard Response SLA</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Within 24 business hours
                </p>
              </div>
            </div>

          </div>

          {/* Sincere Trust Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-5 rounded-2xl text-white space-y-2.5 transition-colors border border-transparent dark:border-slate-800">
            <h4 className="font-extrabold text-sm flex items-center gap-1.5 text-orange-400">
              <MessageSquare size={16} /> Technical Consultations
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              We offer free assistance to help you pick the right accessories for your computer or mobile hardware layout. Let us know your model specs!
            </p>
          </div>
        </div>

        {/* Right Side: High-UX Validation Contact Form */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-md transition-colors text-slate-900 dark:text-white">

          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                action="https://formsubmit.co/infome.daraz@gmail.com"
                method="POST"
                className="space-y-5"
                noValidate
              >
                {/* Subject Selector drop */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Inquiry Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl text-xs font-semibold p-3 outline-none transition-colors dark:text-white"
                  >
                    <option value="General Inquiry">General Inquiry / Question</option>
                    <option value="Technical Question">Technical Accessory Query</option>
                    <option value="Seller Recommendation">Recommend a Daraz Seller</option>
                    <option value="Partnership">Merchant Partnership / Feedback</option>
                  </select>
                </div>

                {/* Name Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name (e.g. Asim Khan)"
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white ${
                      errors.name ? 'border-red-400 focus:ring-1 focus:ring-red-200' : 'border-slate-200 dark:border-slate-750 focus:border-orange-500 dark:focus:border-orange-500'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[10px] font-bold text-red-500 block">{errors.name}</span>
                  )}
                </div>

                {/* Email Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email (e.g. asim@gmail.com)"
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white ${
                      errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-200' : 'border-slate-200 dark:border-slate-750 focus:border-orange-500 dark:focus:border-orange-500'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] font-bold text-red-500 block">{errors.email}</span>
                  )}
                </div>

                {/* Message block */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe how we can help you..."
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white ${
                      errors.message ? 'border-red-400 focus:ring-1 focus:ring-red-200' : 'border-slate-200 dark:border-slate-750 focus:border-orange-500 dark:focus:border-orange-500'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[10px] font-bold text-red-500 block">{errors.message}</span>
                  )}
                </div>

                {submitError && (
                  <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 rounded-xl text-red-600 dark:text-red-400 flex items-start gap-2.5 text-xs font-semibold leading-relaxed">
                    <AlertCircle className="flex-shrink-0 text-red-500 mt-0.5" size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-orange-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Clock className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>

              </motion.form>
            ) : (
              /* High-UX Form Success State */
              <motion.div
                key="success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-900/50">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A tech specialist has received your inquiry and will revert within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}

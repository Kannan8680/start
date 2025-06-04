import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917305762612", "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to build your dream PC? Contact us today for a consultation.
          </p>
        </div>

        {/* Contact Info Only */}
        <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>

          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-300">
                <a href="tel:+917305762612" className="hover:underline">
                  +91 7305762612
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-300">
                <a href="mailto:info@pcbuilderpro.com" className="hover:underline">
                  info@pcbuilderpro.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-300">Serving nationwide</p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { Cpu, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const LogoAbout = () => (
  <div>
    <div className="flex items-center space-x-2 mb-4">
      <Cpu className="h-8 w-8 text-blue-500" />
      <span className="text-2xl font-bold">ITB</span>
    </div>
    <p className="text-gray-400 mb-4">
      Building exceptional PCs tailored to your needs. Quality, performance,
      and reliability guaranteed.
    </p>
  </div>
);

const SocialLinks = () => (
  <div className="flex space-x-4">
    <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
      <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
    </a>
    <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
      <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
    </a>
    <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
      <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
    </a>
    <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
      <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
    </a>
  </div>
);

const SupportLinks = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Support</h3>
    <ul className="space-y-2 text-gray-400">
      <li><a href="#" className="hover:text-white">Technical Support</a></li>
      <li><a href="#" className="hover:text-white">Warranty</a></li>
      <li><a href="#" className="hover:text-white">Maintenance</a></li>
      <li><a href="#" className="hover:text-white">Upgrades</a></li>
    </ul>
  </div>
);

const ContactInfo = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917305762612", "_blank");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact</h3>
      <div className="space-y-2 text-gray-400">
        <p>Phone: +91 7305762612</p>
        <p>Email: indias.tech.builders@gmail.com</p>
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2 transition-colors"
        >
          WhatsApp Us
        </button>
      </div>
    </div>
  );
};

const FooterBottom = () => (
  <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
    <p>&copy; 2025 INDIA'S Tech Builders. All rights reserved.</p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <LogoAbout />
            <SocialLinks />
          </div>
          {/* Empty column - you can add content here or remove */}
          <div></div>
          <SupportLinks />
          <ContactInfo />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;

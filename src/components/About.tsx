import { Award, Users, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import ReactTooltip from "react-tooltip";

const stats = [
  { icon: Users, number: "0", label: "Happy Customers", tooltip: "Customers satisfied with our builds" },
  { icon: CheckCircle, number: "1", label: "PCs Built", tooltip: "Completed custom PC builds" },
  { icon: Award, number: "0", label: "Years Experience", tooltip: "Years in the industry" },
  { icon: Clock, number: "24/7", label: "Support", tooltip: "Around the clock support" }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const About = () => {
  const [text] = useTypewriter({
    words: ["Why Choose Us?"],
    loop: false,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {text}
            <span className="blinking-cursor">|</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about technology and committed to delivering the perfect PC for your needs
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map(({ icon: Icon, number, label, tooltip }, index) => (
            <motion.div
              key={index}
              className="text-center cursor-pointer bg-blue-50 rounded-lg p-6 hover:scale-105 hover:shadow-lg transition-transform"
              data-tip={tooltip}
              variants={fadeUp}
              transition={{ delay: index * 0.15 }}
            >
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
              <div className="text-gray-600">{label}</div>

              {/* Optional progress bar */}
              <div className="h-1 bg-blue-300 rounded-full mt-3">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(parseInt(number) * 10, 100)}%` }}
                  transition={{ duration: 1.2, delay: index * 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
            hidden: {}
          }}
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Expert PC Building Services</h3>
            <p className="text-gray-600 mb-6">
              With years of experience in custom PC building, we understand that every user has unique requirements. 
              Whether you're a hardcore gamer, creative professional, or need a reliable office computer, we have the expertise to build the perfect system.
            </p>
            <div className="space-y-4">
              {[
                "Quality components from trusted brands",
                "Professional assembly and testing",
                "Warranty on all builds",
                "Post-build support and maintenance"
              ].map((text, i) => (
                <motion.div key={i} className="flex items-center" variants={fadeUp}>
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Ready to Build?</h4>
            <p className="mb-6">Get started with your custom PC build today. Our experts are ready to help you create the perfect system.</p>
            <button 
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdsIHL0t6ncDmUvefH5kcwqXrl8KLVsMzZPkRoVg2EnptfLqg/viewform?usp=sharing&ouid=116212659458202049109", "_blank")}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Build
            </button>
          </motion.div>
        </motion.div>

        <ReactTooltip place="top" effect="solid" />
      </div>
    </section>
  );
};

export default About;

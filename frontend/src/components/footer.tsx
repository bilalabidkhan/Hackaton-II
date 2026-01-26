const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center py-8">
        
        {/* Branding */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold">TodoPro</h2>
          <p className="text-sm text-gray-400">Stay organized, stay productive.</p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-yellow-300 transition">Home</a>
          <a href="" className="hover:text-yellow-300 transition">Features</a>
          <a href="/todos" className="hover:text-yellow-300 transition">Todos</a>
          <a href="/" className="hover:text-yellow-300 transition">Privacy</a>
        </div>

        {/* Contact */}
        <div className="text-sm text-gray-400">
          Support: support@todopro.com
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 text-sm py-">
        © 2026 TodoPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
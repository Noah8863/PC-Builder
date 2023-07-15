import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 h-contain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 item-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Resources */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul>
              <li>
                <a href="https://openai.com/blog/chatgpt" target="_blank" rel="noopener noreferrer">ChatGPT</a>
              </li>
              <li>
                <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase</a>
              </li>
              <li>
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4" >Company</h3>
            <ul>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">Link 1</a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">Link 2</a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">Link 3</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul>
              <li>
                <a href="https://github.com/Noah8863" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/noah-hoffman-9975a7121" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/Noah8863/PC-Builder" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

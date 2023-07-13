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
                <a href="https://openai.com/blog/chatgpt">ChatGPT</a>
              </li>
              <li>
                <a href="https://firebase.google.com/">Firebase</a>
              </li>
              <li>
                <a href="https://react.dev/">React</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul>
              <li>
                <a href="https://github.com/Noah8863">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/noah-hoffman-9975a7121">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/Noah8863/PC-Builder">GitHub Repo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

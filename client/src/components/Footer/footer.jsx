import React from "react";
import Icon from "../../images/pc-builder-icon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-4 h-contain text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 item-center">
        <div className="grid grid-cols-3 gap-4 text-center m-auto justify-center items-center">
          {/* Resources */}
          <div className="lg:col-span-1 sm:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul>
              <li>
                <a
                  href="https://openai.com/blog/chatgpt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ChatGPT
                </a>
              </li>
              <li>
                <a
                  href="https://firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul>
              <li>
                <a
                  href="https://github.com/Noah8863"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/noah-hoffman-9975a7121"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Noah8863/PC-Builder"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Help and Support
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Image */}
          <div className="relative items-center m-auto mt-10 col-span-3 w-2/3">
            <img src={Icon} className="lg:w-1/5 sm:w-1/3 m-auto"></img>
            <p className=" text-left pt-4">
              PC-Builder is a platform dedicated to educational purposes,
              providing resources and information about PC building. We do not
              engage in the sale of any user information.
            </p>
            <br></br>
            <p className=" text-left pt-4">®2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import "./style.css";
import Icon from "../../images/pc-builder-icon.png";

const dropIn = {
    hidden: {
        y:"-100vh", 
        opcaity: 0,
    },
    visible: { 
        y: "0",
        opacity: 1, 
        transition: {
            duration: 0.1, 
            type: "spring", 
            damping: 5, 
            stiffness: 15, 
        }
    },
    exit: {
        y: "100vh", 
        opacity: 0,
    },
};

const Modal = ({ handleClose, text }) => {

    return (
        <Backdrop onClick={handleClose}>
            <motion.div onClick={(e) => e.stopPropagation()}
            className="modal bg-primary-600"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <img src={Icon} className="w-80 mt-4"></img>
            <p className="p-4 top-5 relative text-xl text-center text-white">{text}</p>
            <button className="p-4 top-10 relative text-xl text-center text-white" onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;
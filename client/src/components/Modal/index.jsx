import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import "./style.css";

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
            damping: 100, 
            stiffness: 50, 
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
            className="modal bg-orange-400"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <p>{text}</p>
            <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;
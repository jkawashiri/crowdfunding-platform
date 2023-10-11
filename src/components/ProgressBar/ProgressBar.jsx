import { motion } from "framer-motion"
import './ProgressBar.css'

export default function ProgressBar({bgcolor, progress, height}) {
    const Parentdiv = { 
        height: height, 
        width: '100%', 
        backgroundColor: 'whitesmoke', 
        borderRadius: 40
      } 
      
      const Childdiv = { 
        height: '100%',  
        backgroundColor: bgcolor, 
        borderRadius: 40, 
        textAlign: 'right'
      } 
    return ( 
    <div className="progress-bar" style={Parentdiv}> 
        <motion.div 
            style={Childdiv} 
            initial={{width: 0}}
            animate={{width: `${progress}%`}}
            transition={{duration: 1, ease: 'easeOut'}}
        />
    </div> 
    ) 
}
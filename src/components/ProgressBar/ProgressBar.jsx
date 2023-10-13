import { motion } from "framer-motion"
import './ProgressBar.css'

export default function ProgressBar({bgcolor, progress, height, percentageToGoal}) {
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
        <div className="progress-bar-container" >
            <div className="progress-bar-percent">{percentageToGoal}% funded</div>
            <div style={Parentdiv}> 
                <motion.div 
                    style={Childdiv} 
                    initial={{width: 0}}
                    animate={{width: `${progress}%`}}
                    transition={{duration: 1, ease: 'easeOut'}}
                />
            </div> 
        </div>
    ) 
}
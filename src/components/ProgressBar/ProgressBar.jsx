export default function ProgressBar({bgcolor, progress, height}) {
    const Parentdiv = { 
        height: height, 
        width: '100%', 
        backgroundColor: 'whitesmoke', 
        borderRadius: 40, 
        margin: 50 
      } 
      
      const Childdiv = { 
        height: '100%', 
        width: `${progress}%`, 
        backgroundColor: bgcolor, 
       borderRadius:40, 
        textAlign: 'right'
      } 
    return ( 
    <div style={Parentdiv}> 
      <div style={Childdiv} />
    </div> 
    ) 
}
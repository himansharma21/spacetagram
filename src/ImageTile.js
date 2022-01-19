import {useState} from 'react';
import {Collapse, Fade} from 'react-bootstrap'


function ImageTile(props){

    const [isExpanded, expand] = useState(false);
    const [isLiked, like] = useState(false);

    var isDoubleClick = false;
    var timer = 0
    const DELAY = 200
    const handleClick = async (e) => {
        if(e.detail === 1){
            timer = setTimeout(()=>{
                if(!isDoubleClick){
                    expand(!isExpanded)
                }
            }, DELAY)
        }else if(e.detail >= 2){
            isDoubleClick = true;
            clearTimeout(timer);
            like(!isLiked);
            setTimeout(() => {
                isDoubleClick = false;
            }, DELAY);
        }
    }

    return(
    <div className = 'image-tile'>
        <h3 className ='card-title'>{props.title}</h3>
        <div className ="card">
            <div>
                <img src= {props.url} className ='card-img-top' alt='...' onClick={(e)=>handleClick(e)}/>
            </div>
            <div className='card-body'>
                <div className = 'card-body'>
                    <div className='bottom-bar d-flex'>
                        <Fade in={isLiked}>
                            <div>
                                <i className='bi bi-heart-fill'></i>
                            </div>
                        </Fade>
                        <div className='date'>
                            <mark>{props.time}</mark>
                        </div>
                    </div>
                    <Collapse in={isExpanded}>
                        <div className='explanation-div'>
                           <p>{props.explanation}</p>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>

    </div>
    );
}

export default ImageTile;
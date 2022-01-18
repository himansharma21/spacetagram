import react from 'react';
import {useState} from 'react';
import {Collapse, Fade} from 'react-bootstrap'


function ImageTile(props){

    const [isExpanded, expand] = useState(false);
    const [isLiked, like] = useState(false);

    var imageTitle; 
    const MAX_LENGTH = 30;
    const adjustName = () =>{
        if(props.title && props.title.length > MAX_LENGTH){
            imageTitle = props.title.substring(0,45)+'...';
        }else{
            imageTitle = props.title;
        }
    }

    var isDoubleClick = false;
    var timer = 0
    const DELAY = 200
    const handleClick = (e) => {
        console.log(e.detail)
        if(e.detail == 1){
            timer = setTimeout(()=>{
                if(!isDoubleClick){
                    expand(~isExpanded)
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

    adjustName();
    return(
    <div>
        <h3 class='card-title'>{imageTitle}</h3>
        <div class="card">
            <div>
                <img src= {props.url} class="card-img-top" alt="..." onClick={(e)=>handleClick(e)}/>
            </div>
            <div className='card-body' id={props.title}>
                <div className = 'card-body'>
                    <div className='bottom-bar d-flex'>
                        <Fade in={isLiked}>
                            <div>
                                <i class="bi bi-heart"></i>
                            </div>
                        </Fade>
                        <div className='date'>
                            <mark>{props.time}</mark>
                        </div>
                    </div>
                    <Collapse in={isExpanded}>
                        <div className="explanation-div">
                           {props.explanation}
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>

    </div>
    );
}

export default ImageTile;
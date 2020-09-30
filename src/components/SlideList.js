import React from 'react';

const SlideList = (props) => {
    let list = Array.from(Array(props.slideCount).keys())
                    .map(el => (
                        (props.curr === el)
                        ?
                        (<div    
                            className="slide-point no-select slide-point-active" 
                            key={"slide"+el} 
                            onClick={() => props.goto(el)}>
                            &bull;
                        </div>)
                        :
                        (<div    
                            className="slide-point no-select" 
                            key={"slide"+el} 
                            onClick={() => props.goto(el)}>
                            &bull;
                        </div>)
                    ));           
    return (
        <div className="slide-list">{list}</div>
    );
};

export default SlideList;
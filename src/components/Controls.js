import React from 'react';

const Controls = (props) => {
    return (
        <div className="container controls-container">
            <div className="slide-control-button no-select" onClick={props.prevSlide}>
                <img 
                    className="no-select no-eve" 
                    src={require('../assets/svg/left-arrow.svg')} alt="Left Arrow">
                </img>
            </div>
            <div className="slide-control-button no-select" onClick={props.nextSlide}>
                <img 
                    className="no-select no-eve" 
                    src={require('../assets/svg/right-arrow.svg')} alt="Right Arrow">
                </img>
            </div>
        </div>
    );
}

export default Controls;
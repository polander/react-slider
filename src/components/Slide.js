import React from 'react';

class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.prevPos = [];
    }
    render() {
        let list = <div className="slide-content no-select">Error loading content</div>;

        switch(this.props.status) {
            case this.props.LOAD_STATE.LOADING: 
                list = <div className="slide-content no-select">Loading content...</div>;
                break;
            case this.props.LOAD_STATE.LOADED: 
                // False = Left, True = Right, Undef = First render
                let direction = this.prevPos[this.props.curr] ?  
                                (this.prevPos[this.props.curr] < 0) : undefined;

                list = this.props.content.map((el, i) => {

                    /* Counts distance from slide A to slide B in that way:
                        [->, B, x, x, A, ->, ->] */
                    let distance =  (this.props.curr > i) ? 
                                    (this.props.slideCount - this.props.curr + i) : 
                                    -(this.props.slideCount - i + this.props.curr);
        
                    /* Counts slide position relatively from current slide */
                    let position =  (Math.abs(i - this.props.curr) < Math.abs(distance)) ?
                                    (i - this.props.curr) : distance;
        
                    let transition = ((position - this.prevPos[i] > 0) === direction 
                                        && !this.props.offset && direction !== undefined);
                    this.prevPos[i] = position;
        
                    return (
                        <div 
                            className="slide-content no-select no-eve"
                            key={"slide"+i} 
                            style={{
                                minWidth: `${this.props.multi ? 33.3 : 100}%`,
                                maxWidth: `${this.props.multi ? 33.3 : 100}%`,
                                transition: 
                                    `${transition ? 0.5 : 0}s`,
                                transform: 
                                    `translateX(calc(
                                        ${position * 100 + (this.props.multi ? 100 : 0)}% + 
                                        ${this.props.offset + 
                                        (position > 0 ? 10 : (position < 0 ? -10 : 0))}px))`
                        }}>{el}</div>
                    );
                });
                break;
            default:
                break;
        }
        return (
            <div className="container no-select no-eve">
                {list}
            </div>
        );
    }
}

export default Slide;
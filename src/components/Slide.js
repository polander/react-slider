import React from 'react';


class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.prevPos = [];
    }
    render() {
        // False = Left, True = Right, Undef = First render
        let direction = this.prevPos[this.props.curr] ?  
                        (this.prevPos[this.props.curr] < 0) : undefined;

        let list = this.props.content.map((el, i) => {

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
                    className="slide-content no-select"
                    key={"slide"+i} 
                    style={{
                        transition: 
                            `${transition ? 0.5 : 0}s`,
                        transform: 
                            `translateX(calc(${position * 100}% + ${this.props.offset}px))`
                }}>{el}</div>
            );
        });
        return (
            <div className="container">
                {list}
            </div>
        );
    }
}

export default Slide;
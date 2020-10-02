import React from "react";

import Slide from './Slide';
import Controls from './Controls';
import SlideList from './SlideList';
import Settings from './Settings';

import '../styles/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.LOAD_STATE = {
            LOADING: 0,
            LOADED: 1,
            ERROR: 2
        };
        this.CONTENT_TYPE = {
            CUSTOM: -1,
            IMAGES: 0,
            TEXT: 1
        };

        this.state = {
            currentSlide: 0,
            offsetX: 0,
            content: [],
            contentType: this.CONTENT_TYPE.CUSTOM,
            loadState: this.LOAD_STATE.LOADING,
            multiMode: false
        };

        this.mouseDown = false;
        this.swipeX = 0;

        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleMouseDown = this.hadleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.swipeDirection = this.swipeDirection.bind(this);
        this.goToSlide = this.goToSlide.bind(this);
        this.fetchContent = this.fetchContent.bind(this);
        this.setContentType = this.setContentType.bind(this);
        this.toggleMultiMode = this.toggleMultiMode.bind(this);

        this.slideCount = 6;
    }
    componentDidMount() {
        this.fetchContent(this.state.contentType);
    }
    fetchContent(type) {
        this.setState({loadState: this.LOAD_STATE.LOADING});

        let self = this;

        switch(type) {
            case this.CONTENT_TYPE.IMAGES:
                fetch("https://api.unsplash.com/photos/random/?count="
                        +self.slideCount+
                        "&client_id=wVTdRoReBseX_BHaV8X2LQzoNDDlhzxnFKWem52g_JY")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    self.setState({
                        content: data.map(el => (
                                <img 
                                    className="no-select no-eve"
                                    src={el.urls.regular} 
                                    alt={el.alt_description}></img>)),
                        loadState: self.LOAD_STATE.LOADED
                    });
                })
                .catch(() => {
                    self.setState({loadState: self.LOAD_STATE.ERROR});
                });
                break;
            case this.CONTENT_TYPE.TEXT:
                fetch("https://type.fit/api/quotes")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    self.setState({
                        content: data.slice(0, self.slideCount).map(el => (
                                <p className="no-select no-eve">{el.text}</p>)),
                        loadState: self.LOAD_STATE.LOADED
                    });
                })
                .catch(() => {
                    self.setState({loadState: self.LOAD_STATE.ERROR});
                });
                break;
            default:
                let customContent = [
                    <h1 className="no-select no-eve">First Slide</h1>,
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.
                    </p>,
                    <img 
                        className="no-select no-eve"
                        src="https://cache.desktopnexus.com/thumbseg/919/919386-bigthumbnail.jpg"
                        alt="Nature">
                    </img>,
                    <img 
                        className="no-select no-eve"
                        src='https://static.scientificamerican.com/sciam/cache/file/4E0744CD-793A-4EF8-B550B54F7F2C4406_source.jpg'
                        alt="Nature">
                    </img>,
                    <img 
                        className="no-select no-eve"
                        src='https://www.sampleposts.com/wp-content/uploads/2020/04/Nature-climate.jpg'
                        alt="Nature">
                    </img>,
                    <video className="no-select no-eve" width='640' height='480' controls>
                        <source src='https://www.videvo.net/videvo_files/converted/2013_07/videos/hd0079.mov26726.mp4'
                                type='video/mp4'/>
                        Your browser does not support the video.
                    </video>
                ];
                if(customContent.length < this.slideCount) {
                    customContent = customContent
                                    .concat(Array(this.slideCount-customContent.length)
                                    .fill(<h2>No content</h2>));
                }
                this.setState({
                    content: customContent.slice(0, this.slideCount),
                    loadState: self.LOAD_STATE.LOADED
                });
                break;
        }
    }
    setContentType(type) {
        this.setState({contentType: type});
        this.fetchContent(type);
        this.goToSlide(0);
    }
    toggleMultiMode() {
        this.setState({multiMode: !this.state.multiMode})
    }
    prevSlide() {
        if(this.state.currentSlide <= 0) {
            this.setState({currentSlide: this.slideCount-1, offsetX: 0});
        } else {
            this.setState({currentSlide: this.state.currentSlide-1, offsetX: 0});
        } 
    }
    nextSlide() {
        if(this.state.currentSlide >= this.slideCount-1) {
            this.setState({currentSlide: 0, offsetX: 0});
        } else {
            this.setState({currentSlide: this.state.currentSlide+1, offsetX: 0});
        }
    }
    handleTouchStart(e) {
        this.swipeX = e.touches[0].clientX;
    }
    handleTouchMove(e) {
        if (e.changedTouches && e.changedTouches.length) {
            const touch = e.changedTouches[0];
            this.setState({offsetX: touch.clientX - this.swipeX});
        }
    }
    handleTouchEnd(e) {
        const touch = e.changedTouches[0];
        this.swipeDirection(this.swipeX - touch.clientX);
    }
    hadleMouseDown(e) {
        this.swipeX = e.clientX;
        this.mouseDown = true;
    }
    handleMouseMove(e) {
        if(this.mouseDown) {
            this.setState({offsetX: e.clientX - this.swipeX});
        } 
    }
    handleMouseUp(e) {
        this.swipeDirection(this.swipeX - e.clientX);
        this.mouseDown = false;
    }
    swipeDirection(diff) {
        if(diff > 50) {
            this.nextSlide();
        } else if(diff < -50) {
            this.prevSlide();
        } else {
            this.setState({offsetX: 0});
        }
    }
    goToSlide(x) {
        this.setState({currentSlide: x});
    }
    render() {
        return (
            <div 
                className="container" 
                onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)} 
                onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
                onTouchEnd={touchEndEvent => this.handleTouchEnd(touchEndEvent)} 
                onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
                onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}  
                onMouseUp={mouseUpEvent => this.handleMouseUp(mouseUpEvent)}>

                <Slide
                    content={this.state.content} 
                    curr={this.state.currentSlide}
                    offset={this.state.offsetX}
                    slideCount={this.slideCount}
                    multi={this.state.multiMode}
                    status={this.state.loadState}
                    LOAD_STATE={this.LOAD_STATE}/>
                <Controls 
                    prevSlide={this.prevSlide} 
                    nextSlide={this.nextSlide}/>
                <SlideList 
                    goto={this.goToSlide} 
                    curr={this.state.currentSlide}
                    slideCount={this.slideCount}
                    multi={this.state.multiMode}/>
                <Settings
                    multi={this.state.multiMode}
                    toggleMulti={this.toggleMultiMode}
                    setType={this.setContentType}
                    contentType={this.state.contentType}
                    CONTENT_TYPE={this.CONTENT_TYPE}/>    
            </div>
        );
    }
}

export default App;

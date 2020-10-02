import React from 'react';

const Settings = (props) => {
    const buttons = [{
        click: () => props.setType(props.CONTENT_TYPE.CUSTOM),
        activeCheck: props.contentType === props.CONTENT_TYPE.CUSTOM,
        iconPath: require('../assets/svg/edit.svg'),
        alt: "Pencil Icon",
        text: "Custom"
    }, {
        click: () => props.setType(props.CONTENT_TYPE.IMAGES),
        activeCheck: props.contentType === props.CONTENT_TYPE.IMAGES,
        iconPath: require('../assets/svg/photo-camera.svg'),
        alt: "Camera Icon",
        text: "Images"
    }, {
        click: () => props.setType(props.CONTENT_TYPE.TEXT),
        activeCheck: props.contentType === props.CONTENT_TYPE.TEXT,
        iconPath: require('../assets/svg/book.svg'),
        alt: "Book Icon",
        text: "Quotes"
    }, {
        click: props.toggleMulti,
        activeCheck: props.multi,
        iconPath: require('../assets/svg/monitor.svg'),
        alt: "Monitor Icon",
        text: "Multi"
    }];

    let list = buttons.map(el => (
        <div onClick={el.click} className={el.activeCheck ?
        "settings-button no-select settings-button-active" : "settings-button no-select"}>
            <img className="no-select no-eve" src={el.iconPath} alt={el.elt}></img>
            <br/><span>{el.text}</span>
        </div>
    ));

    return (
        <div className="settings-container">
            {list}
        </div>
    );
}

export default Settings;
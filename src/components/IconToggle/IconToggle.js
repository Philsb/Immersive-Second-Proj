const IconToggle = (props) => {
    const block = "icon-toggle";
    const {isActive} = props;
    
    const activeCircleClass = isActive ? ` ${block}__circle--toggled` : "";
    const activeRootClass = isActive ? ` ${block}__root--toggled` : "";

    return (
        <div className={`${block}__root` + activeRootClass}>
            <div className={`${block}__circle`+ activeCircleClass}></div>
        </div>
        );
}

export default IconToggle;
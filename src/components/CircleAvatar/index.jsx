/* eslint-disable react/prop-types */


// eslint-disable-next-line no-unused-vars
export default function CircleAvatar({url,height,width}) {
    return <img style={{
        width : width ? width : "40px",
        height : height ? height : "40px",
        borderRadius : "50%"
    }} src={url} alt="avatar"/>
}
